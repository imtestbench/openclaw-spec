import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dataService } from '@/infrastructure/api/dataService';
import { initialTasks, agents as initialAgents, costData as initialCostData, usageData as initialUsageData, user as initialUser } from '@/infrastructure/api/mockData';

/**
 * Main application store using Zustand
 * Handles global state management with persistence
 */
export const useAppStore = create(
  persist(
    (set, get) => ({
      // UI State
      view: 'tasks',
      taskViewMode: 'grid',
      darkMode: false,
      selectedTask: null,
      selectedAgent: null,
      
      // Connection State
      isConnected: false,
      isLoading: false,
      lastError: null,
      
      // Data State
      tasks: initialTasks,
      agents: initialAgents,
      costData: initialCostData,
      usageData: initialUsageData,
      user: initialUser,
      gatewayStatus: null,
      
      // UI Actions
      setView: (view) => set({ view }),
      setTaskViewMode: (mode) => set({ taskViewMode: mode }),
      setDarkMode: (darkMode) => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ darkMode });
      },
      setSelectedTask: (task) => set({ selectedTask: task }),
      setSelectedAgent: (agent) => set({ selectedAgent: agent }),
      
      // Data Loading Actions
      loadAll: async () => {
        const state = get();
        if (state.isLoading) return;
        
        set({ isLoading: true, lastError: null });
        
        try {
          const isConnected = await dataService.isConnected();
          
          const [tasks, agents, costData, gatewayStatus] = await Promise.all([
            dataService.fetchTasks(),
            dataService.fetchAgents(),
            dataService.fetchCostData(),
            dataService.fetchGatewayStatus().catch(() => null),
          ]);
          
          set({
            isConnected,
            tasks,
            agents,
            costData,
            gatewayStatus,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to load data:', error);
          set({
            isLoading: false,
            lastError: error.message,
          });
        }
      },
      
      loadTasks: async () => {
        try {
          const tasks = await dataService.fetchTasks();
          set({ tasks });
        } catch (error) {
          console.error('Failed to load tasks:', error);
          set({ lastError: error.message });
        }
      },
      
      loadAgents: async () => {
        try {
          const agents = await dataService.fetchAgents();
          set({ agents });
        } catch (error) {
          console.error('Failed to load agents:', error);
          set({ lastError: error.message });
        }
      },
      
      loadCostData: async () => {
        try {
          const costData = await dataService.fetchCostData();
          set({ costData });
        } catch (error) {
          console.error('Failed to load cost data:', error);
          set({ lastError: error.message });
        }
      },
      
      loadUsageData: async () => {
        try {
          const usageData = await dataService.fetchUsageData();
          set({ usageData });
        } catch (error) {
          console.error('Failed to load usage data:', error);
          set({ lastError: error.message });
        }
      },
      
      checkConnection: async () => {
        const isConnected = await dataService.isConnected();
        set({ isConnected });
        return isConnected;
      },
      
      // Task Actions
      createTask: async (task) => {
        // Add task locally first (optimistic update)
        set((state) => ({
          tasks: {
            ...state.tasks,
            scheduled: [...state.tasks.scheduled, task],
          },
        }));
        
        // If it's a spawn task, actually spawn it
        if (task.spawn) {
          try {
            await dataService.spawnTask(task.title, {
              agentId: task.agent,
              model: task.model,
            });
            // Reload tasks to get the real session
            get().loadTasks();
          } catch (error) {
            console.error('Failed to spawn task:', error);
            set({ lastError: error.message });
          }
        }
      },
      
      runTask: async (taskId) => {
        const state = get();
        // Find the task
        let task = null;
        for (const status in state.tasks) {
          task = state.tasks[status].find(t => t.id === taskId);
          if (task) break;
        }
        
        if (!task) return;
        
        // If it's a cron job, run it
        if (task.cronJob) {
          try {
            await dataService.runCronJob(task.cronJob.id);
            // Move to in progress
            get().moveTask(taskId, 'scheduled', 'inProgress', 0);
            // Reload tasks after a delay
            setTimeout(() => get().loadTasks(), 2000);
          } catch (error) {
            console.error('Failed to run cron job:', error);
            set({ lastError: error.message });
          }
        }
      },
      
      updateTask: (taskId, updates) => set((state) => {
        const newTasks = { ...state.tasks };
        for (const status in newTasks) {
          newTasks[status] = newTasks[status].map((t) =>
            t.id === taskId ? { ...t, ...updates } : t
          );
        }
        return { tasks: newTasks };
      }),
      
      moveTask: (taskId, fromStatus, toStatus, newIndex) => set((state) => {
        const newTasks = { ...state.tasks };
        const taskIndex = newTasks[fromStatus].findIndex((t) => t.id === taskId);
        if (taskIndex === -1) return state;
        
        const [task] = newTasks[fromStatus].splice(taskIndex, 1);
        newTasks[toStatus] = [...newTasks[toStatus]];
        newTasks[toStatus].splice(newIndex, 0, task);
        
        return { tasks: newTasks };
      }),
      
      setTasks: (tasks) => set({ tasks }),
      
      // Agent Actions
      updateAgent: (agentId, updates) => set((state) => ({
        agents: state.agents.map((a) =>
          a.id === agentId ? { ...a, ...updates } : a
        ),
      })),
      
      // Direct data service access
      getSessionHistory: (sessionKey, options) => 
        dataService.getSessionHistory(sessionKey, options),
    }),
    {
      name: 'clawdboard-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        taskViewMode: state.taskViewMode,
      }),
    }
  )
);

// Selector hooks for optimized re-renders
export const useView = () => useAppStore((state) => state.view);
export const useTasks = () => useAppStore((state) => state.tasks);
export const useAgents = () => useAppStore((state) => state.agents);
export const useDarkMode = () => useAppStore((state) => state.darkMode);
export const useSelectedTask = () => useAppStore((state) => state.selectedTask);
export const useSelectedAgent = () => useAppStore((state) => state.selectedAgent);
export const useCostData = () => useAppStore((state) => state.costData);
export const useUsageData = () => useAppStore((state) => state.usageData);
export const useIsConnected = () => useAppStore((state) => state.isConnected);
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useGatewayStatus = () => useAppStore((state) => state.gatewayStatus);
