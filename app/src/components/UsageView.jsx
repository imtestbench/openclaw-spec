import { TrendingUp, Zap, DollarSign, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function StatCard({ title, value, subtitle, icon: Icon, trend }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-gray-50 rounded-lg">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <ArrowUpRight className="w-3 h-3" />
              {trend}
            </div>
          )}
        </div>
        <div className="text-2xl font-semibold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{title}</div>
        {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
      </CardContent>
    </Card>
  );
}

export default function UsageView({ usageData, costData }) {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={DollarSign} 
          title="Cost Today" 
          value={`$${costData.today.toFixed(2)}`}
          subtitle={`$${costData.month.toFixed(2)} this month`}
          trend="+12%"
        />
        <StatCard 
          icon={Zap} 
          title="Requests Today" 
          value={usageData.today.requests}
          subtitle={`${formatNumber(usageData.month.requests)} this month`}
        />
        <StatCard 
          icon={TrendingUp} 
          title="Input Tokens" 
          value={formatNumber(usageData.today.inputTokens)}
          subtitle={`${formatNumber(usageData.month.inputTokens)} this month`}
        />
        <StatCard 
          icon={TrendingUp} 
          title="Output Tokens" 
          value={formatNumber(usageData.today.outputTokens)}
          subtitle={`${formatNumber(usageData.month.outputTokens)} this month`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage by Agent */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Usage by Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {usageData.byAgent.map((agent) => (
                <div key={agent.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                      {agent.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{agent.name}</div>
                      <div className="text-xs text-gray-500">{agent.requests} requests</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">${agent.cost.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">{formatNumber(agent.inputTokens + agent.outputTokens)} tokens</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage by Model */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Usage by Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usageData.byModel.map((model) => (
                <div key={model.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <code className="text-sm text-gray-700">{model.name}</code>
                    <span className="font-medium text-gray-900">${model.cost.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>In: {formatNumber(model.inputTokens)}</span>
                    <span>Out: {formatNumber(model.outputTokens)}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500 rounded-full transition-all"
                      style={{ width: `${(model.cost / costData.month) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Runs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Runs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Model</TableHead>
                <TableHead className="text-right">Tokens</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Duration</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usageData.recentRuns.map((run) => (
                <TableRow key={run.id}>
                  <TableCell className="font-medium">{run.task}</TableCell>
                  <TableCell>{run.agent}</TableCell>
                  <TableCell><code className="text-xs">{run.model}</code></TableCell>
                  <TableCell className="text-right">
                    <span className="text-gray-400">{formatNumber(run.inputTokens)}</span>
                    {' / '}
                    <span>{formatNumber(run.outputTokens)}</span>
                  </TableCell>
                  <TableCell className="text-right font-medium">${run.cost.toFixed(2)}</TableCell>
                  <TableCell className="text-right text-gray-500">{run.duration}</TableCell>
                  <TableCell className="text-right text-gray-400">{run.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
