/**
 * Gateway API Client
 * Handles communication with Clawdbot Gateway via /tools/invoke endpoint
 */

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || 'http://localhost:18789';
const GATEWAY_TOKEN = import.meta.env.VITE_GATEWAY_TOKEN || '';

class GatewayClient {
  constructor() {
    this.baseUrl = GATEWAY_URL;
    this.token = GATEWAY_TOKEN;
  }

  /**
   * Invoke a tool via the Gateway
   */
  async invoke(tool, args = {}) {
    const url = `${this.baseUrl}/tools/invoke`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
        },
        body: JSON.stringify({ tool, args }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - check Gateway token');
        }
        if (response.status === 404) {
          throw new Error(`Tool not available: ${tool}`);
        }
        const error = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.ok) {
        throw new Error(data.error?.message || 'Tool invocation failed');
      }
      
      // Return the details object if available, otherwise parse the text content
      if (data.result?.details) {
        return data.result.details;
      }
      
      // Try to parse text content as JSON
      const textContent = data.result?.content?.find(c => c.type === 'text');
      if (textContent?.text) {
        try {
          return JSON.parse(textContent.text);
        } catch {
          return { text: textContent.text };
        }
      }
      
      return data.result;
    } catch (error) {
      console.error(`Gateway invoke error (${tool}):`, error);
      throw error;
    }
  }

  // ============================================
  // Sessions
  // ============================================
  
  async getSessions(options = {}) {
    return this.invoke('sessions_list', {
      limit: options.limit,
      activeMinutes: options.activeMinutes,
      messageLimit: options.messageLimit,
      kinds: options.kinds,
    });
  }

  async getSessionHistory(sessionKey, options = {}) {
    return this.invoke('sessions_history', {
      sessionKey,
      limit: options.limit,
      includeTools: options.includeTools,
    });
  }

  async sendMessage(sessionKey, message) {
    return this.invoke('sessions_send', {
      sessionKey,
      message,
    });
  }

  async spawnSession(task, options = {}) {
    return this.invoke('sessions_spawn', {
      task,
      ...options,
    });
  }

  async getSessionStatus(sessionKey) {
    return this.invoke('session_status', {
      sessionKey,
    });
  }

  // ============================================
  // Cron Jobs
  // ============================================
  
  async getCronJobs(options = {}) {
    return this.invoke('cron', {
      action: 'list',
      includeDisabled: options.includeDisabled,
    });
  }

  async addCronJob(job) {
    return this.invoke('cron', {
      action: 'add',
      job,
    });
  }

  async updateCronJob(jobId, patch) {
    return this.invoke('cron', {
      action: 'update',
      jobId,
      patch,
    });
  }

  async removeCronJob(jobId) {
    return this.invoke('cron', {
      action: 'remove',
      jobId,
    });
  }

  async runCronJob(jobId) {
    return this.invoke('cron', {
      action: 'run',
      jobId,
    });
  }

  // ============================================
  // Gateway Management
  // ============================================
  
  async getConfig() {
    return this.invoke('gateway', {
      action: 'config.get',
    });
  }

  async updateConfig(raw) {
    return this.invoke('gateway', {
      action: 'config.apply',
      raw,
    });
  }

  async restart() {
    return this.invoke('gateway', {
      action: 'restart',
    });
  }

  // ============================================
  // Agents
  // ============================================
  
  async getAgents() {
    return this.invoke('agents_list', {});
  }

  // ============================================
  // Health / Status
  // ============================================
  
  async ping() {
    try {
      // Try to list sessions as a health check
      await this.getSessions({ limit: 1 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get Gateway status by checking session_status
   */
  async getStatus() {
    try {
      const status = await this.getSessionStatus();
      return {
        ok: true,
        ...status,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}

export const gatewayClient = new GatewayClient();
export default gatewayClient;
