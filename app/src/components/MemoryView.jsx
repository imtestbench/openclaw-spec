import { useState } from 'react';
import { Brain, Key, Plus, Eye, EyeOff, Trash2, Save, Database, User, Globe, Lock, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const mockSystemMemory = [
  { id: 'm1', key: 'user_preferences', value: 'Prefers concise responses, timezone: Asia/Singapore, communication style: casual', scope: 'global', updatedAt: '2 hours ago' },
  { id: 'm2', key: 'project_context', value: 'Working on Clawdboard - AI orchestration platform. Tech stack: React, Vite, Tailwind, shadcn/ui', scope: 'global', updatedAt: '1 day ago' },
  { id: 'm3', key: 'team_members', value: 'Testbench (owner), Bernard (dev), Vale (marketing)', scope: 'global', updatedAt: '3 days ago' },
];

const mockAgentMemories = {
  'Claw': [
    { id: 'am1', key: 'admin_notes', value: 'Primary admin agent. Has access to all system functions.', updatedAt: '1 hour ago' },
    { id: 'am2', key: 'recent_decisions', value: 'Approved budget increase for Q1. Scheduled team sync for Friday.', updatedAt: '4 hours ago' },
  ],
  'Bernard': [
    { id: 'am3', key: 'code_context', value: 'Currently working on sidebar improvements. Using shadcn collapsible pattern.', updatedAt: '30 min ago' },
    { id: 'am4', key: 'tech_preferences', value: 'Prefers TypeScript, functional components, Tailwind for styling.', updatedAt: '2 days ago' },
  ],
  'Gumbo': [
    { id: 'am5', key: 'daily_routine', value: 'Morning: email triage, calendar review. Afternoon: synthesis tasks.', updatedAt: '6 hours ago' },
  ],
  'Vale': [
    { id: 'am6', key: 'brand_guidelines', value: 'Purple/violet theme, Fira Code font, lowercase branding.', updatedAt: '1 day ago' },
  ],
};

const mockApiKeys = [
  { id: 'k1', name: 'Anthropic API', key: 'sk-ant-api03-****************************', status: 'active', lastUsed: '2 min ago' },
  { id: 'k2', name: 'OpenAI API', key: 'sk-****************************', status: 'active', lastUsed: '1 hour ago' },
  { id: 'k3', name: 'GitHub Token', key: 'ghp_****************************', status: 'active', lastUsed: '15 min ago' },
  { id: 'k4', name: 'Telegram Bot', key: '7234567890:****************************', status: 'active', lastUsed: '5 min ago' },
];

export default function MemoryView({ agents }) {
  const [activeTab, setActiveTab] = useState('system');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [addType, setAddType] = useState('memory');
  const [visibleKeys, setVisibleKeys] = useState({});
  const [newEntry, setNewEntry] = useState({ key: '', value: '', scope: 'global' });

  const toggleKeyVisibility = (id) => {
    setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAdd = () => {
    console.log('Adding:', addType, newEntry);
    setShowAddDialog(false);
    setNewEntry({ key: '', value: '', scope: 'global' });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="system" className="gap-2">
            <Globe className="w-4 h-4" />
            System Memory
          </TabsTrigger>
          <TabsTrigger value="agents" className="gap-2">
            <User className="w-4 h-4" />
            Agent Memory
          </TabsTrigger>
          <TabsTrigger value="keys" className="gap-2">
            <Key className="w-4 h-4" />
            API Keys
          </TabsTrigger>
        </TabsList>

        {/* System Memory */}
        <TabsContent value="system" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">System Memory</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Shared context available to all agents</p>
            </div>
            <Button 
              className="gap-2 bg-violet-500 hover:bg-violet-600"
              onClick={() => { setAddType('memory'); setShowAddDialog(true); }}
            >
              <Plus className="w-4 h-4" />
              Add Memory
            </Button>
          </div>

          <div className="space-y-3">
            {mockSystemMemory.map((mem) => (
              <Card key={mem.id} className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-4 h-4 text-violet-500" />
                        <code className="text-sm font-medium text-gray-900 dark:text-white">{mem.key}</code>
                        <Badge variant="secondary" className="text-xs">global</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{mem.value}</p>
                      <p className="text-xs text-gray-400 mt-2">Updated {mem.updatedAt}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Agent Memory */}
        <TabsContent value="agents" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Agent Memory</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Individual agent context and knowledge</p>
            </div>
            <Button 
              className="gap-2 bg-violet-500 hover:bg-violet-600"
              onClick={() => { setAddType('agent-memory'); setShowAddDialog(true); }}
            >
              <Plus className="w-4 h-4" />
              Add Memory
            </Button>
          </div>

          <div className="space-y-6">
            {Object.entries(mockAgentMemories).map(([agentName, memories]) => (
              <div key={agentName}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-sm font-medium">
                    {agentName[0]}
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{agentName}</h4>
                  <Badge variant="outline" className="text-xs">{memories.length} entries</Badge>
                </div>
                <div className="space-y-2 ml-10">
                  {memories.map((mem) => (
                    <Card key={mem.id} className="dark:bg-gray-800 dark:border-gray-700">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <code className="text-xs font-medium text-violet-600 dark:text-violet-400">{mem.key}</code>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{mem.value}</p>
                            <p className="text-xs text-gray-400 mt-1">Updated {mem.updatedAt}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Edit2 className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="keys" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Connected API Keys</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage your API connections</p>
            </div>
            <Button 
              className="gap-2 bg-violet-500 hover:bg-violet-600"
              onClick={() => { setAddType('key'); setShowAddDialog(true); }}
            >
              <Plus className="w-4 h-4" />
              Add Key
            </Button>
          </div>

          <div className="space-y-3">
            {mockApiKeys.map((apiKey) => (
              <Card key={apiKey.id} className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <Key className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">{apiKey.name}</span>
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs">
                            {apiKey.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                            {visibleKeys[apiKey.id] ? apiKey.key.replace(/\*/g, 'x') : apiKey.key}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          >
                            {visibleKeys[apiKey.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </Button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Last used {apiKey.lastUsed}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Rotate</Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {addType === 'key' ? 'Add API Key' : 'Add Memory Entry'}
            </DialogTitle>
            <DialogDescription>
              {addType === 'key' 
                ? 'Connect a new API key to your workspace.'
                : 'Add a new memory entry to the system.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {addType === 'key' ? (
              <>
                <div className="grid gap-2">
                  <Label>Service Name</Label>
                  <Input placeholder="e.g., Anthropic API" />
                </div>
                <div className="grid gap-2">
                  <Label>API Key</Label>
                  <Input type="password" placeholder="sk-..." />
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-2">
                  <Label>Key</Label>
                  <Input 
                    placeholder="e.g., user_preferences" 
                    value={newEntry.key}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, key: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Value</Label>
                  <Textarea 
                    placeholder="Enter the memory content..."
                    value={newEntry.value}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, value: e.target.value }))}
                    rows={4}
                  />
                </div>
                {addType === 'agent-memory' && (
                  <div className="grid gap-2">
                    <Label>Agent</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>Claw</option>
                      <option>Bernard</option>
                      <option>Gumbo</option>
                      <option>Vale</option>
                    </select>
                  </div>
                )}
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button className="bg-violet-500 hover:bg-violet-600" onClick={handleAdd}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
