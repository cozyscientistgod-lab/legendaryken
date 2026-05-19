import React from 'react';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Trophy, 
  User, 
  Settings,
  Circle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: 'dashboard' | 'games' | 'achievements' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'games' | 'achievements' | 'profile') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'games', icon: Gamepad2, label: 'Game Center' },
    { id: 'achievements', icon: Trophy, label: 'Awards' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <aside className="w-24 lg:w-72 border-r border-slate-800/50 bg-[#0C0C0E] flex flex-col p-6 h-full transition-all duration-300">
      <div className="flex items-center gap-3 px-3 mb-12 overflow-hidden">
        <div className="w-10 h-10 min-w-[40px] rounded-xl bg-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)]">
          <span className="text-white font-bold text-xl">∞</span>
        </div>
        <span className="font-display font-bold text-xl hidden lg:block tracking-tight text-white">INFINITE PLAY</span>
      </div>

      <nav className="flex-1 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative",
              activeTab === item.id 
                ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5" 
                : "text-slate-500 hover:text-slate-200 hover:bg-slate-800/40"
            )}
          >
            {activeTab === item.id && (
              <motion.div 
                layoutId="activeTabIcon"
                className="absolute left-0 w-1.5 h-6 bg-indigo-500 rounded-r-full"
              />
            )}
            <item.icon size={22} className={cn(
                "transition-colors duration-200",
                activeTab === item.id ? "text-indigo-400" : "group-hover:text-slate-200"
            )} />
            <span className="font-semibold hidden lg:block text-sm tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800/50">
        <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-500 hover:text-slate-200 hover:bg-slate-800/40 transition-all font-semibold text-sm">
          <Settings size={22} />
          <span className="hidden lg:block">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
