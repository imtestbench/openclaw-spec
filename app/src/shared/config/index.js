/**
 * Application configuration
 * Environment-specific settings and feature flags
 */

export const config = {
  app: {
    name: 'Clawdboard',
    version: '0.1.0',
    description: 'AI Agent Mission Control',
  },
  
  api: {
    baseUrl: import.meta.env.VITE_API_URL || '/api',
    timeout: 30000,
  },
  
  features: {
    darkMode: true,
    realTimeUpdates: true,
    analytics: import.meta.env.PROD,
  },
  
  ui: {
    sidebarWidth: 56, // w-14 in pixels
    maxTasksPerColumn: 50,
    defaultView: 'tasks',
    defaultTaskViewMode: 'grid',
  },
  
  storage: {
    prefix: 'clawdboard',
    version: 1,
  },
};

export default config;
