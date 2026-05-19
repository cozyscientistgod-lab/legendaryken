export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Infinite';
}

export interface PlayerStats {
  userId: string;
  displayName: string;
  xp: number;
  level: number;
  rank: string;
}
