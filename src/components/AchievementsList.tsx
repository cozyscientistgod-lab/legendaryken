import React from 'react';
import { Achievement } from '../types';
import { 
  Trophy, 
  MapPin, 
  Clock, 
  Star,
  Zap,
  Sword,
  Shield,
  Target,
  Compass,
  Key,
  Flame,
  Ghost,
  Crown,
  Gamepad2,
  Lock,
  Unlock
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const iconMap: Record<string, any> = {
  Trophy,
  Zap,
  Sword,
  Shield,
  Target,
  Compass,
  Key,
  Flame,
  Ghost,
  Crown,
  Gamepad2,
  Star,
  Lock,
  Unlock
};

interface AchievementsListProps {
  achievements: Achievement[];
  isMini?: boolean;
}

const AchievementsList: React.FC<AchievementsListProps> = ({ achievements, isMini }) => {
  return (
    <div className={cn(
        "bg-[#111114] border border-slate-800/60 rounded-[32px] overflow-hidden flex flex-col shadow-2xl",
        isMini ? "h-auto" : "h-full"
    )}>
      <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
        <h3 className="font-display font-bold text-xl flex items-center gap-2">
          <Trophy size={20} className="text-indigo-500" />
          Award Nexus
        </h3>
        <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-slate-900 border border-slate-800 rounded-full">
          {achievements.length.toLocaleString()} Unlocked
        </span>
      </div>

      <div className={cn(
          "p-4 space-y-3 custom-scrollbar",
          !isMini ? "flex-1 overflow-y-auto" : ""
      )}>
        {achievements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4 border border-slate-800">
                <Trophy size={32} className="text-slate-700" />
            </div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">No terminal data</p>
            <p className="text-slate-600 text-[10px] uppercase mt-1">Unlock nodes to reveal records</p>
          </div>
        ) : (
          achievements.map((achievement, idx) => {
            const IconComponent = iconMap[achievement.icon] || Trophy;
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all"
              >
                <div className={cn(
                  "w-12 h-12 min-w-[48px] rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105",
                  achievement.rarity === 'Infinite' ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]" :
                  achievement.rarity === 'Legendary' ? "bg-gradient-to-br from-yellow-600 to-orange-400 text-white shadow-[0_0_15px_rgba(234,179,8,0.2)]" :
                  achievement.rarity === 'Rare' ? "bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]" :
                  "bg-slate-800 text-slate-400 border border-slate-700"
                )}>
                  <IconComponent size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-sm text-slate-200 truncate group-hover:text-white transition-colors">{achievement.name}</h4>
                    <span className={cn(
                      "text-[9px] font-black uppercase px-2 py-0.5 rounded-md border",
                      achievement.rarity === 'Infinite' ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                      achievement.rarity === 'Legendary' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                      achievement.rarity === 'Rare' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                      "bg-slate-800 text-slate-500 border-slate-700"
                    )}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 uppercase tracking-tight font-medium">{achievement.description}</p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
      
      {!isMini && achievements.length > 0 && (
          <div className="p-4 bg-slate-900 border-t border-slate-800/50 text-center">
              <button className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em] hover:text-indigo-300 transition-colors">
                  Synchronize Additional Records
              </button>
          </div>
      )}
    </div>
  );
};

export default AchievementsList;
