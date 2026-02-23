import { useState, useEffect } from 'react';
import { Search, LayoutGrid, List, Plus, RefreshCw, ChevronDown } from 'lucide-react';
import { agents, initialTasks, costData, usageData, user } from './data/mockData';
import AgentCard from './components/AgentCard';
import KanbanBoard from './components/KanbanBoard';
import UsageView from './components/UsageView';
import Sidebar from './components/Sidebar';
import NewTaskDialog from './components/NewTaskDialog';
import TaskDetailPanel from './components/TaskDetailPanel';
import AgentDetailPanel from './components/AgentDetailPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('tasks');
  const [darkMode, setDarkMode] = useState(false);
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const totalTasks = Object.values(tasks).flat().length;
  const activeTasks = tasks.scheduled.length + tasks.queue.length + tasks.inProgress.length;

  const handleCreateTask = (newTask) => {
    setTasks(prev => ({
      ...prev,
      scheduled: [...prev.scheduled, newTask],
    }));
  };

  return (
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
      <div className="ml-64">
        {/* Top Navigation */}
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            {/* Left - Date/Time */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search tasks, activity, jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>

            {/* Right - Cost HUD */}
            <div className="flex items-center gap-6 text-sm">
              <div className="text-right">
                <div className="text-gray-400 text-xs uppercase">Today</div>
                <div className="font-semibold text-gray-900 dark:text-white">${costData.today.toFixed(2)}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-xs uppercase">Feb</div>
                <div className="font-semibold text-gray-900 dark:text-white">${costData.month.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </nav>

        <div className="p-6">
          {/* Tasks View */}
          {view === 'tasks' && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Tasks</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activeTasks} active · {totalTasks} total</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
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
                      {agents.map(a => (
                        <DropdownMenuItem key={a.id}>{a.name}</DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Button variant="ghost" size="icon" className="rounded-none border-r dark:border-gray-700">
                      <LayoutGrid className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-none">
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Button 
                    className="gap-2 bg-cyan-500 hover:bg-cyan-600"
                    onClick={() => setNewTaskOpen(true)}
                  >
                    <Plus className="w-4 h-4" />
                    New Task
                  </Button>
                </div>
              </div>

              <KanbanBoard tasks={tasks} setTasks={setTasks} onTaskClick={setSelectedTask} />
            </>
          )}

          {/* Agents View */}
          {view === 'agents' && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Agents</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{agents.length} agents configured</p>
              </div>

              <Button variant="outline" className="gap-2 mb-4 dark:bg-gray-800 dark:border-gray-700">
                <RefreshCw className="w-4 h-4" />
                Sync from OpenClaw
              </Button>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
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

          {/* Usage & Cost View */}
          {view === 'usage' && (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Usage & Cost</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Token usage and cost breakdown</p>
              </div>
              <UsageView usageData={usageData} costData={costData} />
            </>
          )}
        </div>
      </div>

      {/* New Task Dialog */}
      <NewTaskDialog 
        open={newTaskOpen} 
        onOpenChange={setNewTaskOpen}
        agents={agents}
        onCreateTask={handleCreateTask}
      />

      {/* Task Detail Panel */}
      {selectedTask && (
        <TaskDetailPanel 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}

      {/* Agent Detail Panel */}
      {selectedAgent && (
        <AgentDetailPanel 
          agent={selectedAgent} 
          onClose={() => setSelectedAgent(null)}
          onSave={(updated) => console.log('Save agent:', updated)}
        />
      )}
    </div>
  );
}
