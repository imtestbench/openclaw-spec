import { useState } from 'react';
import { X, Play, Pause, RotateCcw, Clock, User, Cpu, DollarSign, FileText, Terminal, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/presentation/components/ui/button';
import { Badge } from '@/presentation/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/presentation/components/ui/tabs';
import { Card, CardContent } from '@/presentation/components/ui/card';

const mockTaskDetails = {
  description: 'Synthesize daily activities, emails, and meetings into a summary report.',
  status: 'running',
  progress: 65,
  startedAt: '2024-02-23 23:45:00',
  eta: '12 min remaining',
  tokens: { input: 4200, output: 1850 },
  cost: 0.18,
  steps: [
    { id: 1, name: 'Fetching emails', status: 'completed', duration: '12s' },
    { id: 2, name: 'Fetching calendar events', status: 'completed', duration: '8s' },
    { id: 3, name: 'Analyzing content', status: 'running', duration: '2m 34s' },
    { id: 4, name: 'Generating summary', status: 'pending', duration: null },
    { id: 5, name: 'Formatting output', status: 'pending', duration: null },
  ],
  logs: [
    { time: '23:45:01', level: 'info', message: 'Task started' },
    { time: '23:45:02', level: 'info', message: 'Connecting to email provider...' },
    { time: '23:45:08', level: 'success', message: 'Retrieved 24 emails from inbox' },
    { time: '23:45:09', level: 'info', message: 'Fetching calendar events for today...' },
    { time: '23:45:14', level: 'success', message: 'Found 5 calendar events' },
    { time: '23:45:15', level: 'info', message: 'Starting content analysis...' },
    { time: '23:46:20', level: 'info', message: 'Processing email threads...' },
    { time: '23:47:30', level: 'info', message: 'Identifying key topics and action items...' },
    { time: '23:48:12', level: 'warning', message: 'Large email thread detected, chunking content...' },
  ],
  result: null,
};

const statusConfig = {
  pending: { icon: Clock, color: 'text-gray-400', bg: 'bg-gray-100 dark:bg-gray-700' },
  running: { icon: Loader2, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', spin: true },
  completed: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
  failed: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
};

const logLevelColors = {
  info: 'text-blue-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
};

export default function TaskDetailPanel({ task, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const details = mockTaskDetails;

  if (!task) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[600px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{task.title}</h2>
            <Badge className={`${details.status === 'running' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-100 text-gray-700'}`}>
              {details.status === 'running' && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
              {details.status}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {task.agent}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {details.eta}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Pause className="w-3.5 h-3.5" />
            Pause
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400">Progress</span>
          <span className="font-medium text-gray-900 dark:text-white">{details.progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-500 rounded-full transition-all duration-500"
            style={{ width: `${details.progress}%` }}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <TabsList className="px-4 pt-2 justify-start gap-4 bg-transparent border-b border-gray-200 dark:border-gray-800 rounded-none h-auto">
          <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 rounded-none pb-2 px-0">
            Overview
          </TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 rounded-none pb-2 px-0">
            Logs
          </TabsTrigger>
          <TabsTrigger value="result" className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 rounded-none pb-2 px-0">
            Result
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex-1 overflow-auto p-4 space-y-4 mt-0">
          {/* Description */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Description</h3>
              <p className="text-gray-900 dark:text-white">{details.description}</p>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-3 text-center">
                <Cpu className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                <div className="text-lg font-semibold text-gray-900 dark:text-white">{details.tokens.input + details.tokens.output}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Tokens</div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-3 text-center">
                <DollarSign className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                <div className="text-lg font-semibold text-gray-900 dark:text-white">${details.cost.toFixed(2)}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Cost</div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-3 text-center">
                <Clock className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                <div className="text-lg font-semibold text-gray-900 dark:text-white">3:24</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Duration</div>
              </CardContent>
            </Card>
          </div>

          {/* Steps */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Execution Steps</h3>
              <div className="space-y-3">
                {details.steps.map((step, i) => {
                  const config = statusConfig[step.status];
                  const Icon = config.icon;
                  return (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full ${config.bg} flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${config.color} ${config.spin ? 'animate-spin' : ''}`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{step.name}</div>
                      </div>
                      {step.duration && (
                        <span className="text-xs text-gray-400">{step.duration}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="flex-1 overflow-auto p-4 mt-0">
          <Card className="dark:bg-gray-800 dark:border-gray-700 h-full">
            <CardContent className="p-0 h-full">
              <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs h-full overflow-auto">
                {details.logs.map((log, i) => (
                  <div key={i} className="flex gap-3 py-1">
                    <span className="text-gray-500 shrink-0">{log.time}</span>
                    <span className={`shrink-0 ${logLevelColors[log.level]}`}>[{log.level.toUpperCase()}]</span>
                    <span className="text-gray-300">{log.message}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Waiting for more output...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="result" className="flex-1 overflow-auto p-4 mt-0">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <Loader2 className="w-8 h-8 mx-auto mb-3 text-cyan-500 animate-spin" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">Task in progress</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Results will appear here when the task completes.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="text-xs text-gray-400">
          Started: {details.startedAt}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            Retry
          </Button>
          <Button variant="destructive" size="sm">
            Cancel Task
          </Button>
        </div>
      </div>
    </div>
  );
}
