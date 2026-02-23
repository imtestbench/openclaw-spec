import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign } from 'lucide-react';

const statusConfig = {
  idle: { label: 'Idle', color: 'bg-cyan-500', badgeClass: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' },
  running: { label: 'Running', color: 'bg-blue-500 animate-pulse', badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  waiting: { label: 'Waiting', color: 'bg-yellow-500', badgeClass: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  failed: { label: 'Failed', color: 'bg-red-500', badgeClass: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  offline: { label: 'Offline', color: 'bg-gray-500', badgeClass: 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
};

export default function AgentCard({ agent }) {
  const status = statusConfig[agent.status] || statusConfig.idle;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
      {/* Avatar placeholder - colored gradient */}
      <div 
        className="h-40 flex items-center justify-center text-5xl"
        style={{ background: `linear-gradient(135deg, ${agent.color}22, ${agent.color}44)` }}
      >
        🤖
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h3>
          <Badge variant="secondary" className={`gap-1.5 ${status.badgeClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.color}`}></span>
            {status.label}
          </Badge>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{agent.role}</p>
        
        {/* Cost Display */}
        <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <DollarSign className="w-3 h-3" />
            Today
          </div>
          <span className="font-medium text-gray-900 dark:text-white">${agent.costToday.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">This month</span>
          <span className="text-gray-600 dark:text-gray-300">${agent.costMonth.toFixed(2)}</span>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <code className="text-xs text-gray-400">{agent.model}</code>
        </div>
      </CardContent>
    </Card>
  );
}
