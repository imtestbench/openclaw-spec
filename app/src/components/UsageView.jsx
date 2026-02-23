import { TrendingUp, Zap, DollarSign, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function StatCard({ title, value, subtitle, icon: Icon, trend, trendUp }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-gray-50 rounded-lg">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
            {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </div>
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
          trendUp={true}
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
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Usage by Agent</h3>
          <div className="space-y-3">
            {usageData.byAgent.map((agent) => (
              <div key={agent.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
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
        </div>

        {/* Usage by Model */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Usage by Model</h3>
          <div className="space-y-3">
            {usageData.byModel.map((model) => (
              <div key={model.name} className="py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-gray-700">{model.name}</span>
                  <span className="font-medium text-gray-900">${model.cost.toFixed(2)}</span>
                </div>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>In: {formatNumber(model.inputTokens)}</span>
                  <span>Out: {formatNumber(model.outputTokens)}</span>
                </div>
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 rounded-full"
                    style={{ width: `${(model.cost / costData.month) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Runs */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Runs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Task</th>
                <th className="pb-3 font-medium">Agent</th>
                <th className="pb-3 font-medium">Model</th>
                <th className="pb-3 font-medium text-right">Tokens</th>
                <th className="pb-3 font-medium text-right">Cost</th>
                <th className="pb-3 font-medium text-right">Duration</th>
                <th className="pb-3 font-medium text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {usageData.recentRuns.map((run) => (
                <tr key={run.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 font-medium text-gray-900">{run.task}</td>
                  <td className="py-3 text-gray-600">{run.agent}</td>
                  <td className="py-3 font-mono text-xs text-gray-500">{run.model}</td>
                  <td className="py-3 text-right text-gray-600">
                    <span className="text-gray-400">{formatNumber(run.inputTokens)}</span>
                    {' / '}
                    <span>{formatNumber(run.outputTokens)}</span>
                  </td>
                  <td className="py-3 text-right font-medium text-gray-900">${run.cost.toFixed(2)}</td>
                  <td className="py-3 text-right text-gray-500">{run.duration}</td>
                  <td className="py-3 text-right text-gray-400">{run.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
