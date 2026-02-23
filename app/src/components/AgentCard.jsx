const statusColors = {
  idle: 'bg-green-500',
  running: 'bg-blue-500 animate-pulse',
  waiting: 'bg-yellow-500',
  failed: 'bg-red-500',
  offline: 'bg-gray-500',
};

const statusLabels = {
  idle: '🟢 Idle',
  running: '🔵 Running',
  waiting: '🟡 Waiting',
  failed: '🔴 Failed',
  offline: '⚫ Offline',
};

export default function AgentCard({ agent }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 hover:bg-slate-750 transition-colors border border-slate-700 hover:border-slate-600">
      <div className="flex items-start gap-3">
        <div className="text-3xl">{agent.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold truncate">{agent.name}</h3>
            <span className={`w-2 h-2 rounded-full ${statusColors[agent.status]}`}></span>
          </div>
          <p className="text-sm text-slate-400">{agent.role}</p>
        </div>
      </div>

      <div className="mt-3 space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Status</span>
          <span>{statusLabels[agent.status]}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Model</span>
          <span className="text-cyan-400 truncate ml-2">{agent.model}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Profile</span>
          <span className="truncate ml-2">{agent.profile}</span>
        </div>
        {agent.currentTask && (
          <div className="mt-2 pt-2 border-t border-slate-700">
            <span className="text-slate-400">Task: </span>
            <span className="text-blue-400">{agent.currentTask}</span>
          </div>
        )}
      </div>
    </div>
  );
}
