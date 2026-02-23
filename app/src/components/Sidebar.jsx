import { LayoutGrid, Users, BarChart3, Settings, Moon, Sun, LogOut, Cog } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export default function Sidebar({ user, view, setView, darkMode, setDarkMode }) {
  const navItems = [
    { id: 'tasks', label: 'Tasks', icon: LayoutGrid },
    { id: 'agents', label: 'Agents', icon: Users },
    { id: 'usage', label: 'Usage & Cost', icon: BarChart3 },
  ];

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-white font-bold">
            O
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">OpenClaw</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              view === item.id
                ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <Separator />

      {/* Dark Mode Toggle */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            Dark Mode
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>

      <Separator />

      {/* User Profile */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Cog className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-gray-500 dark:text-gray-400">Plan: <span className="text-cyan-600 dark:text-cyan-400">{user.plan}</span></span>
          <span className="text-gray-500 dark:text-gray-400">{user.workspace}</span>
        </div>
      </div>
    </div>
  );
}
