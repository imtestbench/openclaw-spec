import { useEffect, useState } from 'react';
import { Search, LayoutGrid, List, Plus, RefreshCw, ChevronDown, Wifi, WifiOff, Loader2 } from 'lucide-react';

// Store
import { useAppStore } from '@/application/store';

// Components
import Sidebar from '@/presentation/components/Sidebar';
import AgentCard from '@/presentation/components/AgentCard';
import KanbanBoard from '@/presentation/components/KanbanBoard';
import TaskListView from '@/presentation/components/TaskListView';
import UsageView from '@/presentation/components/UsageView';
import MemoryView from '@/presentation/components/MemoryView';
import NewTaskDialog from '@/presentation/components/NewTaskDialog';
import TaskDetailPanel from '@/presentation/components/TaskDetailPanel';
import AgentDetailPanel from '@/presentation/components/AgentDetailPanel';

// UI Components
import { Button } from '@/presentation/components/ui/button';
import { Input } from '@/presentation/components/ui/input';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/presentation/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';

export default function App() {
  // Store state
  const view = useAppStore((s) => s.view);
  const setView = useAppStore((s) => s.setView);
  const darkMode = useAppStore((s) => s.darkMode);
  const setDarkMode = useAppStore((s) => s.setDarkMode);
  const taskViewMode = useAppStore((s) => s.taskViewMode);
  const setTaskViewMode = useAppStore((s) => s.setTaskViewMode);
  const tasks = useAppStore((s) => s.tasks);
  const setTasks = useAppStore((s) => s.setTasks);
  const agents = useAppStore((s) => s.agents);
  const costData = useAppStore((s) => s.costData);
  const usageData = useAppStore((s) => s.usageData);
  const user = useAppStore((s) => s.user);
  const selectedTask = useAppStore((s) => s.selectedTask);
  const setSelectedTask = useAppStore((s) => s.setSelectedTask);
  const selectedAgent = useAppStore((s) => s.selectedAgent);
  const setSelectedAgent = useAppStore((s) => s.setSelectedAgent);
  const createTask = useAppStore((s) => s.createTask);
  
  // Connection state
  const isConnected = useAppStore((s) => s.isConnected);
  const isLoading = useAppStore((s) => s.isLoading);
  const loadAll = useAppStore((s) => s.loadAll);
  const gatewayStatus = useAppStore((s) => s.gatewayStatus);
  
  // Local refresh state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Apply dark mode on mount and load data
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
    // Load data from Gateway on mount
    loadAll();
  }, []);
  
  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadAll();
    setIsRefreshing(false);
  };
  
  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadAll();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Computed values
  const totalTasks = Object.values(tasks).flat().length;
  const activeTasks = tasks.scheduled.length + tasks.queue.length + tasks.inProgress.length;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        {/* Sidebar */}
        <Sidebar
          user={user}
          view={view}
          setView={setView}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Main Content */}
        <main className="ml-14">
          {/* Top Navigation */}
          <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>

              <div className="flex-1 max-w-xl mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search tasks, activity, jobs..."
                    className="pl-10 dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                {/* Connection Status */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${
                      isConnected 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {isConnected ? (
                        <Wifi className="w-3 h-3" />
                      ) : (
                        <WifiOff className="w-3 h-3" />
                      )}
                      {isConnected ? 'Live' : 'Mock'}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isConnected 
                      ? `Connected to Gateway${gatewayStatus?.model ? ` (${gatewayStatus.model})` : ''}`
                      : 'Using mock data - Gateway not connected'}
                  </TooltipContent>
                </Tooltip>
                
                {/* Refresh Button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleRefresh}
                  disabled={isRefreshing || isLoading}
                  className="h-8 w-8"
                >
                  {isRefreshing || isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                </Button>
                
                <div className="text-right">
                  <div className="text-gray-400 text-xs uppercase">Today</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    ${costData.today.toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-xs uppercase">Month</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    ${costData.month.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="p-6">
            {/* Tasks View */}
            {view === 'tasks' && (
              <>
                <header className="flex items-center justify-between mb-6 max-w-6xl mx-auto">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Tasks</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activeTasks} active · {totalTasks} total
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Search tasks..."
                        className="pl-10 w-48 dark:bg-gray-800 dark:border-gray-700"
                      />
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2 dark:bg-gray-800 dark:border-gray-700">
                          All agents
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>All agents</DropdownMenuItem>
                        {agents.map((a) => (
                          <DropdownMenuItem key={a.id}>{a.name}</DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-none border-r dark:border-gray-700 ${
                          taskViewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-800' : ''
                        }`}
                        onClick={() => setTaskViewMode('grid')}
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-none ${
                          taskViewMode === 'list' ? 'bg-gray-100 dark:bg-gray-800' : ''
                        }`}
                        onClick={() => setTaskViewMode('list')}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>

                    <NewTaskDialog agents={agents} onCreateTask={createTask} />
                  </div>
                </header>

                {taskViewMode === 'grid' ? (
                  <KanbanBoard tasks={tasks} setTasks={setTasks} onTaskClick={setSelectedTask} />
                ) : (
                  <TaskListView tasks={tasks} onTaskClick={setSelectedTask} />
                )}
              </>
            )}

            {/* Agents View */}
            {view === 'agents' && (
              <>
                <header className="mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Agents</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {agents.length} agents configured
                  </p>
                </header>

                <Button 
                  variant="outline" 
                  className="gap-2 mb-4 dark:bg-gray-800 dark:border-gray-700"
                  onClick={handleRefresh}
                  disabled={isRefreshing || isLoading}
                >
                  {isRefreshing || isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  {isConnected ? 'Sync from Gateway' : 'Refresh Mock Data'}
                </Button>

                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search agents..."
                    className="pl-10 w-72 dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {agents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} onClick={setSelectedAgent} />
                  ))}
                </div>
              </>
            )}

            {/* Memory & Keys View */}
            {view === 'memory' && (
              <>
                <header className="mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Memory & Keys</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    System memory, agent knowledge, and API connections
                  </p>
                </header>
                <MemoryView agents={agents} />
              </>
            )}

            {/* Usage & Cost View */}
            {view === 'usage' && (
              <>
                <header className="mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Usage & Cost</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Token usage and cost breakdown
                  </p>
                </header>
                <UsageView usageData={usageData} costData={costData} />
              </>
            )}
          </div>
        </main>

        {/* Panels */}
        {selectedTask && (
          <TaskDetailPanel task={selectedTask} onClose={() => setSelectedTask(null)} />
        )}

        {selectedAgent && (
          <AgentDetailPanel
            agent={selectedAgent}
            onClose={() => setSelectedAgent(null)}
            onSave={(updated) => console.log('Save agent:', updated)}
          />
        )}
      </div>
    </TooltipProvider>
  );
}
