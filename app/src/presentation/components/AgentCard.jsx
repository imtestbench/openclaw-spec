import { Card, CardContent } from '@/presentation/components/ui/card';
import { Badge } from '@/presentation/components/ui/badge';
import { DollarSign, Activity, Bot, ChevronRight } from 'lucide-react';

const statusConfig = {
  idle: { label: 'Idle', color: 'bg-cyan-500', badgeClass: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' },
  running: { label: 'Running', color: 'bg-blue-500 animate-pulse', badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  waiting: { label: 'Waiting', color: 'bg-yellow-500', badgeClass: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  failed: { label: 'Failed', color: 'bg-red-500', badgeClass: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  offline: { label: 'Offline', color: 'bg-gray-500', badgeClass: 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
};

export default function AgentCard({ agent, onClick }) {
  const status = statusConfig[agent.status] || statusConfig.idle;

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700 group hover:border-cyan-300 dark:hover:border-cyan-600"
      onClick={() => onClick?.(agent)}
    >
      {/* Header with gradient */}
      <div 
        className="h-32 flex items-center justify-center relative"
        style={{ background: `linear-gradient(135deg, ${agent.color}22, ${agent.color}55)` }}
      >
        <div 
          className="w-20 h-20 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"
        >
          <Bot className="w-10 h-10" style={{ color: agent.color }} />
        </div>
        
        {/* Status indicator */}
        <div className="absolute top-3 right-3">
          <Badge className={`${status.badgeClass} text-xs`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.color} mr-1.5`}></span>
            {status.label}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        {/* Name and Role */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{agent.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{agent.role}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-cyan-500 transition-colors" />
        </div>
        
        {/* Cost Display */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-2 py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <DollarSign className="w-4 h-4 text-green-500" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm">${agent.costToday.toFixed(2)}</div>
              <div className="text-xs text-gray-400">Today</div>
            </div>
          </div>
          <div className="flex items-center gap-2 py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Activity className="w-4 h-4 text-blue-500" />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm">${agent.costMonth.toFixed(2)}</div>
              <div className="text-xs text-gray-400">Month</div>
            </div>
          </div>
        </div>
        
        {/* Model */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
          <code className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{agent.model}</code>
        </div>
      </CardContent>
    </Card>
  );
}
