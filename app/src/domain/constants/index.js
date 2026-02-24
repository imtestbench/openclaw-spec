export const MODELS = [
  'claude-opus-4.6',
  'claude-sonnet-4.5',
  'claude-haiku',
  'gpt-4o',
  'gpt-4o-mini',
];

export const STATUS_CONFIG = {
  idle: {
    label: 'Idle',
    color: 'bg-cyan-500',
    badgeClass: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  },
  running: {
    label: 'Running',
    color: 'bg-blue-500',
    badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  waiting: {
    label: 'Waiting',
    color: 'bg-yellow-500',
    badgeClass: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  },
  failed: {
    label: 'Failed',
    color: 'bg-red-500',
    badgeClass: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
  offline: {
    label: 'Offline',
    color: 'bg-gray-500',
    badgeClass: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  },
};

export const TASK_STATUS_CONFIG = {
  scheduled: { label: 'Scheduled', color: '#9ca3af' },
  queue: { label: 'Queue', color: '#06b6d4' },
  inProgress: { label: 'In Progress', color: '#eab308' },
  done: { label: 'Done', color: '#22c55e' },
};

export const PRIORITY_CONFIG = {
  low: { label: 'Low', color: 'green' },
  medium: { label: 'Medium', color: 'yellow' },
  high: { label: 'High', color: 'red' },
};

export const NAV_ITEMS = [
  { id: 'tasks', label: 'Tasks', icon: 'LayoutGrid' },
  { id: 'agents', label: 'Agents', icon: 'Users' },
  { id: 'memory', label: 'Memory & Keys', icon: 'Brain' },
  { id: 'usage', label: 'Usage & Cost', icon: 'BarChart3' },
];
