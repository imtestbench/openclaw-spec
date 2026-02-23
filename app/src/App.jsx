import { useState } from 'react';
import { Search, Rocket, Users, LayoutGrid } from 'lucide-react';
import { agents, initialTasks, costData } from './data/mockData';
import AgentCard from './components/AgentCard';
import KanbanBoard from './components/KanbanBoard';
import CostHUD from './components/CostHUD';

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('board');

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <Rocket className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold">Mission Control</h1>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks, agents, runs, logs, memory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Right - Cost HUD */}
          <CostHUD costData={costData} />
        </div>
      </nav>

      <div className="p-6">
        {/* View Toggle */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setView('board')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${view === 'board' ? 'bg-cyan-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            <LayoutGrid className="w-4 h-4" />
            Board
          </button>
          <button
            onClick={() => setView('agents')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${view === 'agents' ? 'bg-cyan-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            <Users className="w-4 h-4" />
            Agents
          </button>
        </div>

        {/* Agents Section */}
        {view === 'agents' && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              Agents ({agents.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </section>
        )}

        {/* Kanban Board */}
        {view === 'board' && (
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-cyan-400" />
              Task Board
            </h2>
            <KanbanBoard tasks={tasks} setTasks={setTasks} />
          </section>
        )}
      </div>
    </div>
  );
}
