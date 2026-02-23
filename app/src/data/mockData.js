export const agents = [
  { id: '1', name: 'Gumbo', role: 'Assistant', status: 'idle', model: 'claude-sonnet-4.5', profile: 'Ops Assistant', avatar: '🦞' },
  { id: '2', name: 'Bernard', role: 'Analyst', status: 'running', model: 'claude-opus-4.5', profile: 'Research', avatar: '🐻', currentTask: 'Budget analysis' },
  { id: '3', name: 'Scout', role: 'Monitor', status: 'waiting', model: 'claude-haiku', profile: 'Watcher', avatar: '🦅' },
  { id: '4', name: 'Dash', role: 'Runner', status: 'idle', model: 'gpt-4o', profile: 'Quick Tasks', avatar: '⚡' },
];

export const profiles = [
  { id: '1', name: 'Ops Assistant', default_model: 'claude-sonnet-4.5', tools: ['web', 'files', 'calendar'] },
  { id: '2', name: 'Research', default_model: 'claude-opus-4.5', tools: ['web', 'memory', 'analysis'] },
  { id: '3', name: 'Watcher', default_model: 'claude-haiku', tools: ['notifications', 'monitor'] },
  { id: '4', name: 'Quick Tasks', default_model: 'gpt-4o', tools: ['web', 'files'] },
];

export const initialTasks = {
  scheduled: [
    { id: 't1', title: 'Weekly report', agent: 'Gumbo', priority: 'medium', scheduledTime: 'Mon 9am', progress: 0, eta: null, cost: 0 },
  ],
  ready: [
    { id: 't2', title: 'Review PRs', agent: 'Scout', priority: 'high', progress: 0, eta: 15, cost: 0 },
  ],
  queue: [
    { id: 't3', title: 'Data sync', agent: 'Dash', priority: 'low', progress: 0, eta: 5, cost: 0 },
  ],
  inProgress: [
    { id: 't4', title: 'Budget analysis', agent: 'Bernard', priority: 'high', progress: 65, eta: 12, cost: 0.34 },
    { id: 't5', title: 'Email triage', agent: 'Gumbo', priority: 'medium', progress: 30, eta: 8, cost: 0.12 },
  ],
  review: [
    { id: 't6', title: 'Meeting notes', agent: 'Gumbo', priority: 'low', progress: 100, eta: 0, cost: 0.08 },
  ],
  blocked: [],
  done: [
    { id: 't7', title: 'Morning briefing', agent: 'Bernard', priority: 'medium', progress: 100, eta: 0, cost: 0.22 },
    { id: 't8', title: 'Calendar check', agent: 'Scout', priority: 'low', progress: 100, eta: 0, cost: 0.02 },
  ],
};

export const costData = {
  today: 4.82,
  total: 127.45,
  byAgent: { Gumbo: 1.24, Bernard: 2.15, Scout: 0.43, Dash: 1.00 },
  byModel: { 'claude-sonnet-4.5': 2.50, 'claude-opus-4.5': 1.82, 'claude-haiku': 0.30, 'gpt-4o': 0.20 },
};
