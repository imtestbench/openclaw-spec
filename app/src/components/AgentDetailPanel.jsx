import { useState } from 'react';
import { X, Save, Play, Settings, FileText, Activity, Terminal, DollarSign, Cpu, Clock, Edit2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockAgentDetails = {
  systemPrompt: `You are a helpful AI assistant focused on administrative tasks.

## Core Responsibilities
- Monitor and triage incoming emails
- Summarize daily activities and meetings
- Manage calendar and scheduling
- Process routine data entry tasks

## Personality
- Professional but friendly
- Proactive in identifying issues
- Clear and concise communication

## Constraints
- Always verify before sending external communications
- Escalate urgent matters immediately
- Respect data privacy guidelines`,
  tools: ['web_search', 'file_read', 'file_write', 'calendar', 'email'],
  recentActivity: [
    { time: '2 min ago', action: 'Completed', task: 'Daily synthesis', tokens: 2840 },
    { time: '15 min ago', action: 'Completed', task: 'Email triage', tokens: 1250 },
    { time: '1 hr ago', action: 'Completed', task: 'Meeting notes', tokens: 890 },
    { time: '2 hr ago', action: 'Completed', task: 'Calendar review', tokens: 450 },
  ],
  stats: {
    tasksToday: 8,
    tasksWeek: 47,
    avgDuration: '2m 15s',
    successRate: 98.5,
  }
};

const models = [
  'claude-opus-4.6',
  'claude-sonnet-4.5',
  'claude-haiku',
  'gpt-4o',
  'gpt-4o-mini',
];

const statusConfig = {
  idle: { label: 'Idle', color: 'bg-cyan-500', badgeClass: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' },
  running: { label: 'Running', color: 'bg-blue-500', badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  waiting: { label: 'Waiting', color: 'bg-yellow-500', badgeClass: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  offline: { label: 'Offline', color: 'bg-gray-500', badgeClass: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
};

export default function AgentDetailPanel({ agent, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedAgent, setEditedAgent] = useState({
    name: agent.name,
    role: agent.role,
    model: agent.model,
    systemPrompt: mockAgentDetails.systemPrompt,
  });

  const status = statusConfig[agent.status] || statusConfig.idle;
  const details = mockAgentDetails;

  const handleSave = () => {
    onSave?.(editedAgent);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-[700px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: `linear-gradient(135deg, ${agent.color}33, ${agent.color}66)` }}
            >
              <Bot className="w-8 h-8" style={{ color: agent.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                {isEditing ? (
                  <Input 
                    value={editedAgent.name}
                    onChange={(e) => setEditedAgent(prev => ({ ...prev, name: e.target.value }))}
                    className="h-8 w-40 font-semibold"
                  />
                ) : (
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{agent.name}</h2>
                )}
                <Badge className={status.badgeClass}>
                  <span className={`w-1.5 h-1.5 rounded-full ${status.color} mr-1.5`}></span>
                  {status.label}
                </Badge>
              </div>
              {isEditing ? (
                <Input 
                  value={editedAgent.role}
                  onChange={(e) => setEditedAgent(prev => ({ ...prev, role: e.target.value }))}
                  className="h-7 w-32 text-sm"
                  placeholder="Role"
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400">{agent.role}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button size="sm" className="gap-1.5 bg-cyan-500 hover:bg-cyan-600" onClick={handleSave}>
                  <Save className="w-3.5 h-3.5" />
                  Save
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setIsEditing(true)}>
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">${agent.costToday.toFixed(2)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Today</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">${agent.costMonth.toFixed(2)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">This Month</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{details.stats.tasksToday}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Tasks Today</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-lg font-semibold text-green-600 dark:text-green-400">{details.stats.successRate}%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <TabsList className="px-5 pt-2 justify-start gap-4 bg-transparent border-b border-gray-200 dark:border-gray-800 rounded-none h-auto">
          <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 rounded-none pb-2 px-0">
            <Settings className="w-4 h-4 mr-1.5" />
            Config
          </TabsTrigger>
          <TabsTrigger value="prompt" className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 rounded-none pb-2 px-0">
            <FileText className="w-4 h-4 mr-1.5" />
            System Prompt
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 rounded-none pb-2 px-0">
            <Activity className="w-4 h-4 mr-1.5" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex-1 overflow-auto p-5 space-y-5 mt-0">
          {/* Model Selection */}
          <div className="space-y-2">
            <Label>Model</Label>
            {isEditing ? (
              <Select value={editedAgent.model} onValueChange={(v) => setEditedAgent(prev => ({ ...prev, model: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <code className="text-sm text-gray-700 dark:text-gray-300">{agent.model}</code>
              </div>
            )}
          </div>

          {/* Tools */}
          <div className="space-y-2">
            <Label>Enabled Tools</Label>
            <div className="flex flex-wrap gap-2">
              {details.tools.map(tool => (
                <Badge key={tool} variant="secondary" className="dark:bg-gray-800">
                  {tool}
                </Badge>
              ))}
              {isEditing && (
                <Button variant="outline" size="sm" className="h-6 text-xs">+ Add Tool</Button>
              )}
            </div>
          </div>

          {/* Settings */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium text-gray-900 dark:text-white">Settings</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-700 dark:text-gray-300">Auto-retry on failure</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Automatically retry failed tasks up to 3 times</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-700 dark:text-gray-300">Notifications</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Get notified when tasks complete</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-700 dark:text-gray-300">Cost alerts</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Alert when daily cost exceeds $5.00</div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompt" className="flex-1 overflow-auto p-5 mt-0">
          <div className="space-y-2 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <Label>System Prompt (AGENT.md)</Label>
              <span className="text-xs text-gray-400">{editedAgent.systemPrompt.length} characters</span>
            </div>
            <Textarea
              value={editedAgent.systemPrompt}
              onChange={(e) => setEditedAgent(prev => ({ ...prev, systemPrompt: e.target.value }))}
              className="flex-1 min-h-[400px] font-mono text-sm dark:bg-gray-800 dark:border-gray-700"
              readOnly={!isEditing}
            />
          </div>
        </TabsContent>

        <TabsContent value="activity" className="flex-1 overflow-auto p-5 mt-0">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {details.recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{activity.task}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{activity.action} · {activity.time}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.tokens.toLocaleString()} tokens
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">{details.stats.tasksWeek}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Tasks this week</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">{details.stats.avgDuration}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Avg. duration</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <Button variant="outline" className="gap-1.5">
          <Play className="w-3.5 h-3.5" />
          Run Task
        </Button>
        <Button variant="destructive" size="sm">
          Disable Agent
        </Button>
      </div>
    </div>
  );
}
