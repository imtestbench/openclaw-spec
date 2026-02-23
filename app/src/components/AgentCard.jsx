import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AgentCard({ agent }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {/* Avatar placeholder - colored gradient */}
      <div 
        className="h-48 flex items-center justify-center text-6xl"
        style={{ background: `linear-gradient(135deg, ${agent.color}22, ${agent.color}44)` }}
      >
        🤖
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900">{agent.name}</h3>
          <Badge variant="secondary" className="gap-1.5 bg-cyan-50 text-cyan-700 hover:bg-cyan-50">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
            Idle
          </Badge>
        </div>
        <p className="text-gray-500 text-sm mb-3">{agent.role}</p>
        <code className="text-xs text-gray-400">{agent.model}</code>
      </CardContent>
    </Card>
  );
}
