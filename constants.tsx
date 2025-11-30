import { SkillCategory, SkillData, Quest } from './types';
import { 
  Languages, 
  Activity, 
  Banknote, 
  Bitcoin, 
  Cpu, 
  Sword, 
  Music, 
  Briefcase 
} from 'lucide-react';

export const INITIAL_SKILLS: SkillData[] = [
  {
    id: 'lang_1',
    name: 'Mandarin / English',
    category: SkillCategory.LANGUAGES,
    level: 4,
    maxLevel: 10,
    xp: 450,
    maxXp: 1000,
    description: 'Global communication protocols essential for trade and diplomacy.',
    lore: 'Ancient tongues that bind the fragmented zones of the old world. Mastery grants +10 Charisma.',
    trend: 15
  },
  {
    id: 'health_1',
    name: 'Longevity & Nutrition',
    category: SkillCategory.HEALTH,
    level: 3,
    maxLevel: 10,
    xp: 200,
    maxXp: 800,
    description: 'Optimization of the biological chassis.',
    lore: 'Flesh is weak, but optimized flesh endures. extend runtime by +20 years.',
    trend: 90
  },
  {
    id: 'money_1',
    name: 'Investing & Stocks',
    category: SkillCategory.FIAT,
    level: 5,
    maxLevel: 10,
    xp: 600,
    maxXp: 1200,
    description: 'Management of traditional resource tokens.',
    lore: 'Navigating the old empires banking grids. Dangerous, but necessary for resource acquisition.',
    trend: -5
  },
  {
    id: 'crypto_1',
    name: 'DeFi & Blockchain',
    category: SkillCategory.CRYPTO,
    level: 6,
    maxLevel: 10,
    xp: 700,
    maxXp: 1500,
    description: 'Understanding trustless ledgers and digital assets.',
    lore: 'The new economy of the decentralized web. Sovereign wealth for the sovereign individual.',
    trend: 120
  },
  {
    id: 'digi_1',
    name: 'AI Prompt Engineering',
    category: SkillCategory.DIGITAL,
    level: 2,
    maxLevel: 10,
    xp: 150,
    maxXp: 600,
    description: 'Interfacing with synthetic intelligence.',
    lore: 'Whispering to the machine spirits. A rare talent that commands silicon armies.',
    trend: 300
  },
  {
    id: 'combat_1',
    name: 'Brazilian Jiu-Jitsu',
    category: SkillCategory.MARTIAL_ARTS,
    level: 7,
    maxLevel: 10,
    xp: 2000,
    maxXp: 2500,
    description: 'Physical defense and grappling.',
    lore: 'The gentle art of folding clothes while people are still in them. Essential for close-quarters survival.',
    trend: 10
  },
  {
    id: 'music_1',
    name: 'Electronic Production',
    category: SkillCategory.MUSIC,
    level: 4,
    maxLevel: 10,
    xp: 300,
    maxXp: 900,
    description: 'Creation of auditory landscapes.',
    lore: 'Hack the brainwaves of the populace through harmonic resonance.',
    trend: 25
  },
  {
    id: 'job_1',
    name: 'Full Stack Development',
    category: SkillCategory.PROFESSION,
    level: 8,
    maxLevel: 10,
    xp: 3000,
    maxXp: 4000,
    description: 'Architecting digital infrastructure.',
    lore: 'Building the Matrix, one block of code at a time.',
    trend: 45
  }
];

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q1',
    title: 'Protocol Sync',
    description: 'Practice a foreign language for 15 minutes.',
    rewardXp: 50,
    skillId: 'lang_1',
    completed: false,
    difficulty: 'Easy'
  },
  {
    id: 'q2',
    title: 'Cold Storage Setup',
    description: 'Transfer assets to a hardware wallet.',
    rewardXp: 200,
    skillId: 'crypto_1',
    completed: false,
    difficulty: 'Hard'
  },
  {
    id: 'q3',
    title: 'Physical Audit',
    description: 'Complete 100 pushups in a single session.',
    rewardXp: 100,
    skillId: 'health_1',
    completed: false,
    difficulty: 'Medium'
  }
];

export const CATEGORY_ICONS: Record<SkillCategory, any> = {
  [SkillCategory.LANGUAGES]: Languages,
  [SkillCategory.HEALTH]: Activity,
  [SkillCategory.FIAT]: Banknote,
  [SkillCategory.CRYPTO]: Bitcoin,
  [SkillCategory.DIGITAL]: Cpu,
  [SkillCategory.MARTIAL_ARTS]: Sword,
  [SkillCategory.MUSIC]: Music,
  [SkillCategory.PROFESSION]: Briefcase,
};

export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  [SkillCategory.LANGUAGES]: '#3b82f6', // blue
  [SkillCategory.HEALTH]: '#ef4444', // red
  [SkillCategory.FIAT]: '#22c55e', // green
  [SkillCategory.CRYPTO]: '#f59e0b', // amber
  [SkillCategory.DIGITAL]: '#d946ef', // fuchsia
  [SkillCategory.MARTIAL_ARTS]: '#f97316', // orange
  [SkillCategory.MUSIC]: '#06b6d4', // cyan
  [SkillCategory.PROFESSION]: '#8b5cf6', // violet
};
