export const user = {
  name: 'Testbench',
  email: 'testbench@example.com',
  avatar: null,
  plan: 'Pro',
  workspace: 'Personal',
};

export const agents = [
  { id: '1', name: 'Claw', role: 'Admin', status: 'idle', model: 'claude-opus-4.6', color: '#3b82f6', costToday: 0.34, costMonth: 89.50 },
  { id: '2', name: 'Bernard', role: 'Developer', status: 'running', model: 'claude-opus-4.6', color: '#8b5cf6', costToday: 0.22, costMonth: 72.30 },
  { id: '3', name: 'Vale', role: 'Marketer', status: 'idle', model: 'claude-sonnet-4.5', color: '#ec4899', costToday: 0.12, costMonth: 31.20 },
  { id: '4', name: 'Gumbo', role: 'Assistant', status: 'idle', model: 'claude-sonnet-4.5', color: '#f97316', costToday: 0.05, costMonth: 26.98 },
];

export const initialTasks = {
  scheduled: [
    { id: 't1', title: 'Weekly rollup', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Fri 2/13 4pm' },
    { id: 't2', title: 'Budget check', agent: 'Claw', agentColor: '#3b82f6', scheduledTime: 'Fri 2/13 12pm' },
    { id: 't3', title: 'Open threads review', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Mon 2/16 1:30pm' },
    { id: 't4', title: 'Monthly rollup', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Sun 3/1 10am' },
    { id: 't5', title: 'Daily synthesis', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Fri 2/13 7pm' },
    { id: 't6', title: 'Intake processing', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Fri 2/13 9am' },
  ],
  queue: [],
  inProgress: [],
  done: [
    { id: 't7', title: 'Intake processing', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Thu 2/12 9am' },
    { id: 't8', title: 'Daily synthesis', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Thu 2/12 7pm' },
    { id: 't9', title: 'Intake processing', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Thu 2/12 2pm' },
    { id: 't10', title: 'Intake processing', agent: 'Gumbo', agentColor: '#f97316', scheduledTime: 'Thu 2/12 7pm' },
  ],
};

export const costData = {
  today: 0.73,
  month: 219.98,
  total: 1247.32,
};

export const usageData = {
  today: { inputTokens: 45200, outputTokens: 12800, requests: 23 },
  month: { inputTokens: 12450000, outputTokens: 3280000, requests: 4521 },
  byAgent: [
    { name: 'Claw', inputTokens: 5200000, outputTokens: 1400000, cost: 89.50, requests: 1823 },
    { name: 'Bernard', inputTokens: 4100000, outputTokens: 1100000, cost: 72.30, requests: 1402 },
    { name: 'Vale', inputTokens: 1800000, outputTokens: 480000, cost: 31.20, requests: 687 },
    { name: 'Gumbo', inputTokens: 1350000, outputTokens: 300000, cost: 26.98, requests: 609 },
  ],
  byModel: [
    { name: 'claude-opus-4.6', inputTokens: 8100000, outputTokens: 2200000, cost: 156.80 },
    { name: 'claude-sonnet-4.5', inputTokens: 3150000, outputTokens: 780000, cost: 48.20 },
    { name: 'claude-haiku', inputTokens: 1200000, outputTokens: 300000, cost: 14.98 },
  ],
  recentRuns: [
    { id: 'r1', task: 'Daily synthesis', agent: 'Gumbo', model: 'claude-sonnet-4.5', inputTokens: 2400, outputTokens: 890, cost: 0.08, duration: '45s', time: '2 min ago' },
    { id: 'r2', task: 'Code review', agent: 'Bernard', model: 'claude-opus-4.6', inputTokens: 8200, outputTokens: 3100, cost: 0.34, duration: '2m 12s', time: '15 min ago' },
    { id: 'r3', task: 'Email draft', agent: 'Vale', model: 'claude-sonnet-4.5', inputTokens: 1200, outputTokens: 650, cost: 0.04, duration: '18s', time: '32 min ago' },
    { id: 'r4', task: 'Research summary', agent: 'Claw', model: 'claude-opus-4.6', inputTokens: 12400, outputTokens: 4200, cost: 0.52, duration: '3m 5s', time: '1 hr ago' },
    { id: 'r5', task: 'Intake processing', agent: 'Gumbo', model: 'claude-sonnet-4.5', inputTokens: 1800, outputTokens: 420, cost: 0.05, duration: '22s', time: '1 hr ago' },
  ],
};
