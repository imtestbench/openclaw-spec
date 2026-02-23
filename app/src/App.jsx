import { useState } from 'react';
import { Search, LayoutGrid, List, Plus, RefreshCw, ChevronDown } from 'lucide-react';
import { agents, initialTasks, costData, usageData } from './data/mockData';
import AgentCard from './components/AgentCard';
import KanbanBoard from './components/KanbanBoard';
import UsageView from './components/UsageView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

  const totalTasks = Object.values(tasks).flat().length;
  const activeTasks = tasks.scheduled.length + tasks.queue.length + tasks.inProgress.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left - Date/Time */}
          <div className="text-sm text-gray-500">
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
                className="pl-10"
              />
            </div>
          </div>

          {/* Right - Cost HUD */}
          <div className="flex items-center gap-6 text-sm">
            <div className="text-right">
              <div className="text-gray-400 text-xs uppercase">Today</div>
              <div className="font-semibold">${costData.today.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-xs uppercase">Feb</div>
              <div className="font-semibold">${costData.month.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <Tabs value={view} onValueChange={setView} className="mb-6">
          <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start gap-6 h-auto p-0">
            <TabsTrigger 
              value="tasks" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-600 data-[state=active]:shadow-none bg-transparent px-0 pb-3"
            >
              Tasks
            </TabsTrigger>
            <TabsTrigger 
              value="agents"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-600 data-[state=active]:shadow-none bg-transparent px-0 pb-3"
            >
              Agents
            </TabsTrigger>
            <TabsTrigger 
              value="usage"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-600 data-[state=active]:shadow-none bg-transparent px-0 pb-3"
            >
              Usage & Cost
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Tasks View */}
        {view === 'tasks' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
                <p className="text-sm text-gray-500">{activeTasks} active · {totalTasks} total</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search tasks..."
                    className="pl-10 w-48"
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
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
                
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <Button variant="ghost" size="icon" className="rounded-none border-r">
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-none">
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                
                <Button className="gap-2 bg-cyan-500 hover:bg-cyan-600">
                  <Plus className="w-4 h-4" />
                  New Task
                </Button>
              </div>
            </div>

            <KanbanBoard tasks={tasks} setTasks={setTasks} />
          </>
        )}

        {/* Agents View */}
        {view === 'agents' && (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Agents</h1>
              <p className="text-sm text-gray-500">{agents.length} agents configured</p>
            </div>

            <Button variant="outline" className="gap-2 mb-4">
              <RefreshCw className="w-4 h-4" />
              Sync from OpenClaw
            </Button>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search agents..."
                className="pl-10 w-72"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </>
        )}

        {/* Usage & Cost View */}
        {view === 'usage' && (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Usage & Cost</h1>
              <p className="text-sm text-gray-500">Token usage and cost breakdown</p>
            </div>
            <UsageView usageData={usageData} costData={costData} />
          </>
        )}
      </div>
    </div>
  );
}
