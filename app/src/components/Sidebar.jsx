import { LayoutGrid, Users, BarChart3, Moon, Sun, Cog, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const NavButton = ({ item }) => {
    const isActive = view === item.id;
    const button = (
      <button
        onClick={() => setView(item.id)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
          isActive
            ? 'bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
        } ${collapsed ? 'justify-center px-0' : ''}`}
      >
        <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-violet-600 dark:text-violet-400' : ''}`} />
        {!collapsed && <span>{item.label}</span>}
      </button>
    );

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }
    return button;
  };

  return (
    <div 
      className={`h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className={`p-4 border-b border-gray-200 dark:border-gray-800 ${collapsed ? 'px-3' : ''}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/25 flex-shrink-0">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"/>
            </svg>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <span 
                className="font-semibold text-gray-900 dark:text-white tracking-tight block"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                clawdboard
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Mission Control</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 py-4 space-y-1 ${collapsed ? 'px-2' : 'px-3'}`}>
        {navItems.map((item) => (
          <NavButton key={item.id} item={item} />
        ))}
      </nav>

      <div className={`${collapsed ? 'px-2' : 'px-3'}`}>
        <Separator className="mb-3" />
      </div>

      {/* Dark Mode Toggle */}
      <div className={`pb-3 ${collapsed ? 'px-2' : 'px-3'}`}>
        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-full flex items-center justify-center py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>Dark Mode</span>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        )}
      </div>

      <div className={`${collapsed ? 'px-2' : 'px-3'}`}>
        <Separator className="mb-3" />
      </div>

      {/* User Profile */}
      <div className={`pb-3 ${collapsed ? 'px-2' : 'px-3'}`}>
        {collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className="flex justify-center">
                <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-violet-500/20">
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white font-medium">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
            <Avatar className="h-10 w-10 ring-2 ring-violet-500/20">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white font-medium">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
            </div>
            <Cog className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <div className={`p-3 border-t border-gray-200 dark:border-gray-800 ${collapsed ? 'px-2' : ''}`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-2 py-2 px-3 rounded-xl text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
            collapsed ? 'justify-center px-0' : ''
          }`}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
