/**
 * Data Service
 * Fetches data from Gateway API and maps to UI format
 * Falls back to mock data when Gateway is unavailable
 */

import { gatewayClient } from './gatewayClient';
import * as mockData from './mockData';

const USE_MOCK_FALLBACK = import.meta.env.VITE_USE_MOCK_FALLBACK === 'true';

// Cache for connection status
let gatewayAvailable = null;
let lastCheck = 0;
const CHECK_INTERVAL = 30000; // 30 seconds

async function isGatewayAvailable() {
  const now = Date.now();
  if (gatewayAvailable !== null && now - lastCheck < CHECK_INTERVAL) {
    return gatewayAvailable;
  }
  
  try {
    gatewayAvailable = await gatewayClient.ping();
  } catch {
    gatewayAvailable = false;
  }
  lastCheck = now;
  return gatewayAvailable;
}

function withFallback(liveDataFn, mockDataFn) {
  return async (...args) => {
    if (!USE_MOCK_FALLBACK) {
      return liveDataFn(...args);
    }
    
    const available = await isGatewayAvailable();
    if (available) {
      try {
        return await liveDataFn(...args);
      } catch (error) {
        console.warn('Gateway request failed, using mock data:', error);
        return mockDataFn(...args);
      }
    }
    return mockDataFn(...args);
  };
}

// Agent color palette
const AGENT_COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#f97316', // orange
  '#10b981', // green
  '#06b6d4', // cyan
  '#f59e0b', // amber
  '#ef4444', // red
];

function getAgentColor(index) {
  return AGENT_COLORS[index % AGENT_COLORS.length];
}

// ============================================
// Sessions → Tasks Mapping
// ============================================

function mapSessionToTask(session, index) {
  const isSpawned = session.kind === 'spawn';
  const isActive = session.status === 'active' || session.status === 'running';
  
  // Determine task status based on session state
  let status = 'done';
  if (isActive) {
    status = 'inProgress';
  } else if (isSpawned && !session.completedAt) {
    status = 'queue';
  }
  
  // Extract agent name from session
  const agentName = session.agentId || session.label || 'main';
  const agentColor = getAgentColor(index);
  
  // Format time
  const timestamp = session.lastActivity || session.createdAt;
  const scheduledTime = timestamp ? formatRelativeTime(timestamp) : '';
  
  return {
    id: session.sessionKey || session.key || `session-${index}`,
    title: session.label || session.task || getTaskTitle(session),
    agent: agentName,
    agentColor,
    scheduledTime,
    status,
    // Additional metadata
    sessionKey: session.sessionKey || session.key,
    kind: session.kind,
    channel: session.channel,
    lastMessage: session.lastMessages?.[0]?.content,
    model: session.model,
  };
}

function getTaskTitle(session) {
  // Try to extract a meaningful title from the session
  if (session.label) return session.label;
  if (session.task) return session.task.slice(0, 50);
  if (session.lastMessages?.[0]?.content) {
    const content = session.lastMessages[0].content;
    return content.slice(0, 50) + (content.length > 50 ? '...' : '');
  }
  return `Session ${session.channel || 'unknown'}`;
}

function formatRelativeTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

// ============================================
// Live Data Functions
// ============================================

async function fetchTasksLive() {
  const [sessions, cronJobs] = await Promise.all([
    gatewayClient.getSessions({ limit: 50, messageLimit: 1 }),
    gatewayClient.getCronJobs().catch(() => ({ jobs: [] })),
  ]);
  
  const tasks = {
    scheduled: [],
    queue: [],
    inProgress: [],
    done: [],
  };
  
  // Map cron jobs to scheduled tasks
  if (cronJobs.jobs) {
    cronJobs.jobs.forEach((job, index) => {
      tasks.scheduled.push({
        id: `cron-${job.id}`,
        title: job.text || job.id,
        agent: job.agentId || 'main',
        agentColor: getAgentColor(index),
        scheduledTime: job.nextRun ? formatRelativeTime(job.nextRun) : job.schedule,
        cronJob: job,
      });
    });
  }
  
  // Map sessions to tasks
  if (sessions.sessions) {
    sessions.sessions.forEach((session, index) => {
      const task = mapSessionToTask(session, index);
      if (tasks[task.status]) {
        tasks[task.status].push(task);
      } else {
        tasks.done.push(task);
      }
    });
  }
  
  return tasks;
}

function fetchTasksMock() {
  return Promise.resolve(mockData.initialTasks);
}

// ============================================
// Agents
// ============================================

async function fetchAgentsLive() {
  try {
    const [status, agents] = await Promise.all([
      gatewayClient.getStatus(),
      gatewayClient.getAgents().catch(() => null),
    ]);
    
    // If we have an agents endpoint, use it
    if (agents?.agents) {
      return agents.agents.map((agent, index) => ({
        id: agent.id || agent.agentId,
        name: agent.name || agent.agentId,
        role: agent.role || 'Agent',
        status: agent.status || 'idle',
        model: agent.model || status.model,
        color: getAgentColor(index),
        costToday: agent.costToday || 0,
        costMonth: agent.costMonth || 0,
      }));
    }
    
    // Otherwise, create a single agent from status
    return [{
      id: 'main',
      name: 'Main',
      role: 'Primary Agent',
      status: status.status || 'online',
      model: status.model || 'unknown',
      color: getAgentColor(0),
      costToday: status.usage?.costToday || 0,
      costMonth: status.usage?.costMonth || 0,
    }];
  } catch (error) {
    console.error('Failed to fetch agents:', error);
    throw error;
  }
}

function fetchAgentsMock() {
  return Promise.resolve(mockData.agents);
}

// ============================================
// Cost & Usage
// ============================================

async function fetchCostDataLive() {
  const status = await gatewayClient.getStatus();
  
  return {
    today: status.usage?.costToday || 0,
    month: status.usage?.costMonth || 0,
    total: status.usage?.costTotal || 0,
  };
}

function fetchCostDataMock() {
  return Promise.resolve(mockData.costData);
}

async function fetchUsageDataLive() {
  const status = await gatewayClient.getStatus();
  
  return {
    today: {
      inputTokens: status.usage?.inputTokensToday || 0,
      outputTokens: status.usage?.outputTokensToday || 0,
      requests: status.usage?.requestsToday || 0,
    },
    month: {
      inputTokens: status.usage?.inputTokensMonth || 0,
      outputTokens: status.usage?.outputTokensMonth || 0,
      requests: status.usage?.requestsMonth || 0,
    },
    byAgent: [], // Gateway doesn't have per-agent breakdown yet
    byModel: [],
    recentRuns: [],
  };
}

function fetchUsageDataMock() {
  return Promise.resolve(mockData.usageData);
}

// ============================================
// Gateway Status
// ============================================

async function fetchGatewayStatusLive() {
  return gatewayClient.getStatus();
}

function fetchGatewayStatusMock() {
  return Promise.resolve({
    status: 'mock',
    model: 'mock-model',
    uptime: 0,
    version: 'mock',
  });
}

// ============================================
// Exported Service Functions
// ============================================

export const dataService = {
  // Check Gateway connection
  isConnected: isGatewayAvailable,
  
  // Tasks
  fetchTasks: withFallback(fetchTasksLive, fetchTasksMock),
  
  // Agents
  fetchAgents: withFallback(fetchAgentsLive, fetchAgentsMock),
  
  // Cost & Usage
  fetchCostData: withFallback(fetchCostDataLive, fetchCostDataMock),
  fetchUsageData: withFallback(fetchUsageDataLive, fetchUsageDataMock),
  
  // Gateway
  fetchGatewayStatus: withFallback(fetchGatewayStatusLive, fetchGatewayStatusMock),
  
  // Direct Gateway access (no fallback)
  gateway: gatewayClient,
  
  // Session actions
  async spawnTask(task, options = {}) {
    return gatewayClient.spawnSession(task, options);
  },
  
  async runCronJob(jobId) {
    return gatewayClient.runCronJob(jobId);
  },
  
  async getSessionHistory(sessionKey, options = {}) {
    return gatewayClient.getSessionHistory(sessionKey, options);
  },
  
  // User data (always mock for now)
  fetchUser: () => Promise.resolve(mockData.user),
  fetchMemory: () => Promise.resolve(mockData.systemMemory),
  fetchApiKeys: () => Promise.resolve(mockData.apiKeys),
};

export default dataService;
