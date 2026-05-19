import React from 'react';
import { PlayerStats } from '../types';
import { Zap, ChevronRight, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsDashboardProps {
  stats: PlayerStats;
  progress: number;
  nextLevelXp: number;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats, progress, nextLevelXp }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Level Card */}
      <div className="md:col-span-2 relative overflow-hidden bg-[#111114] border border-slate-800/60 rounded-[32px] p-8 group shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] -mr-32 -mt-32" />
        
        <div className="flex flex-col h-full justify-between relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-indigo-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-2 flex items-center gap-2 font-bold">
                <Zap size={14} fill="currentColor" /> Progression Active
              </p>
              <h2 className="text-5xl font-display font-black text-white">Level {stats.level.toLocaleString()}</h2>
              <p className="text-slate-500 mt-2 font-mono text-xs uppercase tracking-widest">{stats.rank} Status</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Lifetime XP</p>
              <p className="text-3xl font-black font-display tracking-tight text-white">{stats.xp.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
              <span className="text-slate-400">Level Progression</span>
              <span className="text-white font-mono">{nextLevelXp - stats.xp} XP to next infinity point</span>
            </div>
            <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-indigo-600 via-indigo-400 to-cyan-400 relative shadow-[0_0_15px_rgba(99,102,241,0.4)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] w-40 animate-[shimmer_2s_infinite]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Card */}
      <div className="bg-[#111114] border border-slate-800/60 rounded-[32px] p-8 flex flex-col justify-between shadow-xl">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-widest">Session Logic</h3>
            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
                <TrendingUp size={18} />
            </div>
        </div>
        
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-slate-800/50">
                <span className="text-slate-500 text-[10px] font-bold uppercase">Surge Status</span>
                <span className="text-emerald-400 font-mono text-xs">STABLE</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-slate-800/50">
                <span className="text-slate-500 text-[10px] font-bold uppercase">Multiplier</span>
                <span className="text-white font-bold font-mono">x4.5</span>
            </div>
        </div>

        <button className="w-full mt-6 flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/20 text-sm tracking-wide">
            View Analytics <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default StatsDashboard;
