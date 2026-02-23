export default function AgentCard({ agent }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Avatar placeholder - colored gradient */}
      <div 
        className="h-48 flex items-center justify-center text-6xl"
        style={{ background: `linear-gradient(135deg, ${agent.color}22, ${agent.color}44)` }}
      >
        🤖
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900">{agent.name}</h3>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-sm text-gray-500">Idle</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-3">{agent.role}</p>
        <p className="text-xs text-gray-400 font-mono">{agent.model}</p>
      </div>
    </div>
  );
}
