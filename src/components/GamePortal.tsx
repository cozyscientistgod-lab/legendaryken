import React, { useState } from 'react';
import { 
  Trophy,
  Star,
  Gamepad2, 
  Zap, 
  Sword, 
  Target, 
  Compass, 
  Shield, 
  Flame, 
  Ghost,
  Sparkles,
  MousePointer2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface GamePortalProps {
  onEarningXp: (amount: number, action: string) => void;
  full?: boolean;
}

const games = [
  { id: 'quest', name: 'Legendary Quest', icon: Sword, color: 'from-orange-500 to-red-600', xp: 50, desc: 'Embark on a digital adventure' },
  { id: 'focus', name: 'Pulse Focus', icon: Target, color: 'from-blue-500 to-indigo-600', xp: 30, desc: 'Train your reaction precision' },
  { id: 'explore', name: 'Infinity Trail', icon: Compass, color: 'from-green-500 to-emerald-600', xp: 40, desc: 'Discover hidden system nodes' },
  { id: 'protect', name: 'Core Shield', icon: Shield, color: 'from-purple-500 to-pink-600', xp: 25, desc: 'Defend the data stream' },
  { id: 'blitz', name: 'Spark Blitz', icon: Zap, color: 'from-yellow-400 to-orange-500', xp: 60, desc: 'High energy speed trials' },
  { id: 'secret', name: 'Ghost Protocol', icon: Ghost, color: 'from-gray-600 to-gray-900', xp: 100, desc: 'Unlock redacted achievements' },
];

const GamePortal: React.FC<GamePortalProps> = ({ onEarningXp, full }) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);

  const handleGameAction = (gameId: string, baseXP: number, name: string) => {
    setActiveGame(gameId);
    setClickCount(prev => prev + 1);
    
    // Earn XP
    onEarningXp(baseXP, `Playing ${name}`);

    // Some visual feedback
    setTimeout(() => {
        if (activeGame === gameId) {
            // keep it active for a bit
        }
    }, 1000);
  };

  return (
    <div className={cn(
        "bg-[#111114] border border-slate-800/60 rounded-[32px] overflow-hidden flex flex-col shadow-2xl",
        full ? "w-full" : "h-full"
    )}>
      <div className="p-6 border-b border-slate-800/50 flex justify-between items-center bg-[#0C0C0E]/50">
        <h3 className="font-display font-bold text-xl flex items-center gap-2">
          <Gamepad2 size={20} className="text-indigo-400" />
          Infinite Archive
        </h3>
        <div className="flex gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold border border-emerald-500/20 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
            </div>
        </div>
      </div>

      <div className={cn(
          "p-6 grid gap-4",
          full ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => handleGameAction(game.id, game.xp, game.name)}
            className={cn(
              "group relative flex items-center gap-4 p-5 rounded-[24px] border border-slate-800/40 bg-slate-900/40 transition-all active:scale-95 text-left",
              "hover:border-indigo-500/30 hover:bg-indigo-500/5 shadow-inner"
            )}
          >
            <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform",
                game.color.replace('from-', 'from-').replace('to-', 'to-') // Keep original gradients but they fit well
            )}>
              <game.icon size={26} className="text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors uppercase text-xs tracking-widest">{game.name}</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-1">{game.desc}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="flex items-center gap-1 text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                   +{game.xp} XP
                </span>
              </div>
            </div>

            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <MousePointer2 size={12} className="text-slate-600" />
            </div>

            {/* Click Ripple Effect Simulation */}
            <AnimatePresence>
                {activeGame === game.id && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 rounded-[24px] bg-indigo-400/20 pointer-events-none"
                    />
                )}
            </AnimatePresence>
          </button>
        ))}
      </div>

      <div className="mt-auto p-6 bg-slate-900/20 border-t border-slate-800/50">
          <div className="flex justify-between items-center bg-slate-950/40 rounded-2xl p-4 border border-slate-800/50 shadow-inner">
                <div className="flex items-center gap-4">
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Protocol Status</p>
                        <p className="text-[10px] font-mono font-medium text-slate-200">AUTHENTICATION VERIFIED</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Cycles Today</p>
                    <p className="text-[10px] font-mono font-bold text-indigo-400">{clickCount.toLocaleString()}</p>
                </div>
          </div>
      </div>
    </div>
  );
};

export default GamePortal;
