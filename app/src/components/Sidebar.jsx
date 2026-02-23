import { LayoutGrid, Users, BarChart3, Moon, Sun, Cog, PanelLeftClose, PanelLeft } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Sidebar({ user, view, setView, darkMode, setDarkMode, collapsed, setCollapsed }) {
  const navItems = [
    { id: 'tasks', label: 'Tasks', icon: LayoutGrid },
    { id: 'agents', label: 'Agents', icon: Users },
    { id: 'usage', label: 'Usage & Cost', icon: BarChart3 },
  ];

  return (
    <div className={`h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col fixed left-0 top-0 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/25 flex-shrink-0">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"/>
              </svg>
            </div>
            {!collapsed && (
              <span className="font-semibold text-gray-900 dark:text-white tracking-tight text-lg" style={{ fontFamily: "'Fira Code', monospace" }}>
                clawdboard
              </span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 ${collapsed ? 'mx-auto mt-2' : ''}`}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <Tooltip key={item.id} delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  view === item.id
                    ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                {item.label}
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </nav>

      <Separator />

      {/* Dark Mode Toggle */}
      <div className={`p-3 ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="h-9 w-9"
              >
                {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              Dark Mode
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        )}
      </div>

      <Separator />

      {/* User Profile */}
      <div className={`p-3 ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white font-medium">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white font-medium">
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
        )}
      </div>
    </div>
  );
}
