import { useState } from 'react';
import { Search, LayoutGrid, List, Plus, RefreshCw, ChevronDown } from 'lucide-react';
import { agents, initialTasks, costData, usageData } from './data/mockData';
import AgentCard from './components/AgentCard';
import KanbanBoard from './components/KanbanBoard';
import UsageView from './components/UsageView';

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
              <input
                type="text"
                placeholder="Search tasks, activity, jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Right - Cost HUD */}
          <div className="flex items-center gap-6 text-sm">
            <div className="text-right">
              <div className="text-gray-400 text-xs">TODAY</div>
              <div className="font-semibold">${costData.today.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-xs">FEB</div>
              <div className="font-semibold">${costData.month.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="flex gap-6 mb-6 border-b border-gray-200">
          <button
            onClick={() => setView('tasks')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              view === 'tasks' 
                ? 'border-cyan-500 text-cyan-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => setView('agents')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              view === 'agents' 
                ? 'border-cyan-500 text-cyan-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Agents
          </button>
          <button
            onClick={() => setView('usage')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              view === 'usage' 
                ? 'border-cyan-500 text-cyan-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Usage & Cost
          </button>
        </div>

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
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    className="bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm w-48 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50">
                  All agents
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button className="p-2 bg-white hover:bg-gray-50 border-r border-gray-200">
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white hover:bg-gray-50">
                    <List className="w-4 h-4" />
                  </button>
                </div>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm font-medium hover:bg-cyan-600 transition-colors">
                  <Plus className="w-4 h-4" />
                  New Task
                </button>
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

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 mb-4">
              <RefreshCw className="w-4 h-4" />
              Sync from OpenClaw
            </button>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents..."
                className="bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm w-72 focus:outline-none focus:border-cyan-500"
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
