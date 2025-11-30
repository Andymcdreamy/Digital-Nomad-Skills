import { LucideIcon } from 'lucide-react';

export enum SkillCategory {
  LANGUAGES = 'Linguistic Protocols',
  HEALTH = 'Bio-Metrics',
  FIAT = 'Legacy Currency',
  CRYPTO = 'Decentralized Credits',
  DIGITAL = 'Netrunning',
  MARTIAL_ARTS = 'Combat Kinetics',
  MUSIC = 'Auditory Synthesis',
  PROFESSION = 'Class Specialization'
}

export interface SkillData {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  maxLevel: number;
  xp: number;
  maxXp: number;
  description: string;
  lore: string; // RPG flavor text
  trend: number; // Growth trend percentage
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  skillId: string;
  completed: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'nexus';
  text: string;
  timestamp: Date;
}

export type ViewState = 'DASHBOARD' | 'SKILLS' | 'ORACLE' | 'QUESTS';
