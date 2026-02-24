/**
 * @typedef {'idle' | 'running' | 'waiting' | 'failed' | 'offline'} AgentStatus
 * @typedef {'scheduled' | 'queue' | 'inProgress' | 'done'} TaskStatus
 * @typedef {'low' | 'medium' | 'high'} Priority
 */

/**
 * @typedef {Object} Agent
 * @property {string} id
 * @property {string} name
 * @property {string} role
 * @property {AgentStatus} status
 * @property {string} model
 * @property {string} color
 * @property {number} costToday
 * @property {number} costMonth
 */

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {string} agent
 * @property {string} agentColor
 * @property {Priority} [priority]
 * @property {string} [scheduledTime]
 * @property {number} [progress]
 * @property {number} [eta]
 * @property {number} [cost]
 */

/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} email
 * @property {string} [avatar]
 */

/**
 * @typedef {Object} MemoryEntry
 * @property {string} id
 * @property {string} key
 * @property {string} value
 * @property {string} [scope]
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} ApiKey
 * @property {string} id
 * @property {string} name
 * @property {string} key
 * @property {'active' | 'inactive'} status
 * @property {string} lastUsed
 */

/**
 * @typedef {Object} CostData
 * @property {number} today
 * @property {number} month
 * @property {number} [total]
 */

/**
 * @typedef {Object} UsageStats
 * @property {number} inputTokens
 * @property {number} outputTokens
 * @property {number} requests
 */

export const AgentStatus = {
  IDLE: 'idle',
  RUNNING: 'running',
  WAITING: 'waiting',
  FAILED: 'failed',
  OFFLINE: 'offline',
};

export const TaskStatus = {
  SCHEDULED: 'scheduled',
  QUEUE: 'queue',
  IN_PROGRESS: 'inProgress',
  DONE: 'done',
};

export const Priority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};
