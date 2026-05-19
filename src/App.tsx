import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Gamepad2, 
  User, 
  LayoutDashboard, 
  Settings, 
  Zap, 
  Star, 
  Crown, 
  Search,
  Plus,
  Flame,
  Ghost,
  Shield,
  Sword,
  Target,
  Compass,
  Key,
  Lock,
  Unlock,
  ExternalLink
} from 'lucide-react';
import { cn } from './lib/utils';
import { Achievement, PlayerStats } from './types';

// Components
import Sidebar from './components/Sidebar';
import StatsDashboard from './components/StatsDashboard';
import AchievementsList from './components/AchievementsList';
import GamePortal from './components/GamePortal';

const BASE_XP = 100;
const XP_EXPONENT = 1.6;

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'games' | 'achievements' | 'profile'>('dashboard');
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('gamer_xp');
    return saved ? parseInt(saved, 10) : 900;
  });
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('gamer_achievements');
    if (saved) return JSON.parse(saved);
    
    // Seed with 700 initial awards for Kenneth Jay Mapalad
    return Array.from({ length: 700 }).map((_, i) => ({
      id: `seed-${i}`,
      name: `Legacy Milestone ${700 - i}`,
      description: "Pre-synchronized achievement record for elite ranking tier.",
      icon: i % 3 === 0 ? 'Trophy' : (i % 3 === 1 ? 'Zap' : 'Crown'),
      unlockedAt: new Date().toISOString(),
      rarity: i < 5 ? 'Infinite' : (i < 50 ? 'Legendary' : (i < 200 ? 'Rare' : 'Common'))
    }));
  });
  
  const [isGeneratingAchievement, setIsGeneratingAchievement] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  // Calculate Level from XP
  // XP = BASE_XP * level ^ XP_EXPONENT
  // => level = (XP / BASE_XP) ^ (1 / XP_EXPONENT)
  const level = useMemo(() => {
    if (xp === 0) return 1;
    return Math.floor(Math.pow(xp / BASE_XP, 1 / XP_EXPONENT)) + 1;
  }, [xp]);

  const nextLevelXp = useMemo(() => {
    return Math.floor(BASE_XP * Math.pow(level, XP_EXPONENT));
  }, [level]);

  const currentLevelStartXp = useMemo(() => {
    if (level === 1) return 0;
    return Math.floor(BASE_XP * Math.pow(level - 1, XP_EXPONENT));
  }, [level]);

  const progress = useMemo(() => {
    const neededInLevel = nextLevelXp - currentLevelStartXp;
    const gainedInLevel = xp - currentLevelStartXp;
    return Math.min(100, Math.max(0, (gainedInLevel / neededInLevel) * 100));
  }, [xp, level, nextLevelXp, currentLevelStartXp]);

  const rank = useMemo(() => {
    if (level < 10) return "Legendary SSS Rank";
    if (level < 30) return "Amateur Elite";
    if (level < 100) return "Pro";
    if (level < 500) return "Master";
    if (level < 2000) return "Grandmaster";
    return "Infinite Legend";
  }, [level]);

  useEffect(() => {
    localStorage.setItem('gamer_xp', xp.toString());
    localStorage.setItem('gamer_achievements', JSON.stringify(achievements));
  }, [xp, achievements]);

  const addXp = (amount: number, action: string) => {
    const oldLevel = level;
    setXp(prev => prev + amount);
    
    // Random chance to unlock an "infinite" achievement
    if (Math.random() > 0.8 && !isGeneratingAchievement) {
      generateAchievement(action);
    }
  };

  const generateAchievement = async (action: string) => {
    setIsGeneratingAchievement(true);
    try {
      const response = await fetch('/api/generate-achievement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level,
          currentAchievements: achievements.map(a => a.name),
          actionType: action
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        const achievement: Achievement = {
          id: Date.now().toString(),
          name: data.name,
          description: data.description,
          icon: data.icon,
          unlockedAt: new Date().toISOString(),
          rarity: level > 100 ? 'Infinite' : (level > 50 ? 'Legendary' : (level > 20 ? 'Rare' : 'Common'))
        };
        
        setAchievements(prev => [achievement, ...prev]);
        setNewAchievement(achievement);
        setTimeout(() => setNewAchievement(null), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAchievement(false);
    }
  };

  const stats: PlayerStats = {
    userId: 'kenneth-jay-mapalad',
    displayName: 'Kenneth Jay Mapalad',
    xp,
    level,
    rank
  };

  return (
    <div className="flex h-screen bg-[#0c0c0c] text-white font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto custom-scrollbar p-8 relative">
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800/50">
          <div>
            <h1 className="text-3xl font-display font-black text-white tracking-tight uppercase">Terminal Overview</h1>
            <a 
              href="https://campsite.bio/kenjay" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-400 text-[10px] uppercase font-bold tracking-[0.2em] mt-1 hover:text-indigo-300 transition-colors flex items-center gap-1"
            >
              campsite.bio/kenjay <ExternalLink size={10} />
            </a>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-2 pr-5 shadow-2xl">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-serif italic text-xl shadow-lg shadow-indigo-500/20 border border-white/10">
              {stats.displayName.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-sm leading-tight text-white">{stats.displayName}</p>
              <p className="text-indigo-400 text-[9px] font-mono font-bold uppercase tracking-widest">{stats.rank} Rank</p>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <StatsDashboard stats={stats} progress={progress} nextLevelXp={nextLevelXp} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AchievementsList achievements={achievements.slice(0, 5)} isMini />
                <GamePortal onEarningXp={addXp} />
              </div>
            </motion.div>
          )}

          {activeTab === 'games' && (
            <motion.div
              key="games"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <GamePortal onEarningXp={addXp} full />
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <AchievementsList achievements={achievements} />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
               <div className="w-32 h-32 rounded-full border-4 border-indigo-500/30 p-1 mb-6 ring-4 ring-indigo-500/10 shadow-[0_0_60px_rgba(99,102,241,0.2)]">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-serif italic text-4xl">
                  KJ
                </div>
              </div>
              <h2 className="text-4xl font-display font-black mb-2 text-white">Kenneth Jay Mapalad</h2>
              <p className="text-indigo-400 font-mono text-xl mb-12 uppercase tracking-[0.3em] font-bold">{stats.rank}</p>
              
              <div className="grid grid-cols-3 gap-8 w-full max-w-2xl px-4">
                <div className="bg-[#111114] border border-slate-800/60 p-8 rounded-[32px] text-center shadow-xl">
                  <p className="text-3xl font-black text-white">{stats.level.toLocaleString()}</p>
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Level Infinite</p>
                </div>
                <div className="bg-[#111114] border border-slate-800/60 p-8 rounded-[32px] text-center shadow-xl">
                  <p className="text-3xl font-black text-white">{achievements.length.toLocaleString()}</p>
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Awards</p>
                </div>
                <div className="bg-[#111114] border border-slate-800/60 p-8 rounded-[32px] text-center shadow-xl">
                  <p className="text-3xl font-black text-white">{Math.floor(xp / 1000)}k</p>
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Total XP</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Achievement Unlock Popup */}
        <AnimatePresence>
          {newAchievement && (
            <motion.div
              initial={{ opacity: 0, y: 100, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 100, x: '-50%' }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#111114] border-2 border-indigo-500/50 p-5 rounded-3xl shadow-[0_0_50px_rgba(99,102,241,0.2)] flex items-center gap-5 min-w-[380px]"
            >
              <div className="bg-indigo-600 text-white p-3.5 rounded-2xl shadow-lg shadow-indigo-600/30">
                <Trophy size={26} />
              </div>
              <div className="flex-1">
                <p className="text-indigo-400 text-[10px] uppercase font-black tracking-[0.2em] leading-none mb-1.5">Achievement Synchronized</p>
                <h3 className="font-bold text-white text-lg leading-tight uppercase tracking-tight">{newAchievement.name}</h3>
                <p className="text-slate-500 text-xs mt-1 uppercase font-semibold">{newAchievement.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em]">
          <span>System Version: INFINITE-X-2.0.42</span>
          <span className="text-slate-500 font-bold">Kenneth Jay Mapalad • Authentication Verified</span>
          <span>© 2024 Global Gaming Hub</span>
        </footer>
      </main>
    </div>
  );
}
