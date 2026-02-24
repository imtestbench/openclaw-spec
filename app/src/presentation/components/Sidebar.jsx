import { LayoutGrid, Users, BarChart3, Moon, Sun, Cog, Brain, Settings2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/presentation/components/ui/avatar';
import { Button } from '@/presentation/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/presentation/components/ui/tooltip';

export default function Sidebar({ user, view, setView, darkMode, setDarkMode }) {
  const navItems = [
    { id: 'tasks', label: 'Tasks', icon: LayoutGrid },
    { id: 'agents', label: 'Agents', icon: Users },
    { id: 'memory', label: 'Memory & Keys', icon: Brain },
    { id: 'usage', label: 'Usage & Cost', icon: BarChart3 },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex h-full w-14 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      {/* Logo */}
      <div className="flex h-14 items-center justify-center border-b border-gray-200 dark:border-gray-800">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/20 cursor-pointer">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"/>
              </svg>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10}>
            <span style={{ fontFamily: "'Fira Code', monospace" }}>clawdboard</span>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-2 py-4">
        {navItems.map((item) => {
          const isActive = view === item.id;
          return (
            <Tooltip key={item.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setView(item.id)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                    isActive
                      ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400 shadow-sm'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="flex flex-col items-center gap-2 py-4 border-t border-gray-200 dark:border-gray-800">
        {/* Dark Mode */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-all"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </TooltipContent>
        </Tooltip>

        {/* Settings */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-all">
              <Settings2 className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10}>
            Settings
          </TooltipContent>
        </Tooltip>

        {/* User Avatar */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button className="mt-2">
              <Avatar className="h-9 w-9 ring-2 ring-transparent hover:ring-violet-500/50 transition-all">
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-sm font-medium">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10}>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
}
