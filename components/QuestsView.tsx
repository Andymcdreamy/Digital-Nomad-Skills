import React from 'react';
import { Quest, SkillData } from '../types';
import { CATEGORY_ICONS } from '../constants';
import { CheckCircle2, Circle, AlertTriangle } from 'lucide-react';

interface QuestsViewProps {
  quests: Quest[];
  skills: SkillData[];
  setQuests: (quests: Quest[]) => void;
  setSkills: (skills: SkillData[]) => void;
}

const QuestsView: React.FC<QuestsViewProps> = ({ quests, skills, setQuests, setSkills }) => {
  
  const handleComplete = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;

    // Update quest status
    const updatedQuests = quests.map(q => 
        q.id === questId ? { ...q, completed: true } : q
    );
    setQuests(updatedQuests);

    // Add XP to skill
    const updatedSkills = skills.map(s => {
        if (s.id === quest.skillId) {
            let newXp = s.xp + quest.rewardXp;
            let newLevel = s.level;
            // Simple level up logic
            if (newXp >= s.maxXp) {
                newXp = newXp - s.maxXp;
                newLevel = Math.min(s.level + 1, s.maxLevel);
            }
            return { ...s, xp: newXp, level: newLevel };
        }
        return s;
    });
    setSkills(updatedSkills);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            ACTIVE_OPERATIONS_LOG
        </h2>
        <div className="text-xs font-mono text-slate-500 border border-slate-700 px-2 py-1 rounded">
            SYNCED: JUST NOW
        </div>
      </div>

      <div className="space-y-4">
        {quests.map((quest) => {
            const skill = skills.find(s => s.id === quest.skillId);
            const Icon = skill ? CATEGORY_ICONS[skill.category] : AlertTriangle;
            
            return (
                <div key={quest.id} className={`relative p-1 rounded-xl transition-all ${quest.completed ? 'opacity-50' : 'hover:scale-[1.01]'}`}>
                    {/* Border gradient */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${quest.completed ? 'from-slate-800 to-slate-900' : 'from-cyan-500/50 to-emerald-500/50'} opacity-50 blur-[1px]`}></div>
                    
                    <div className="relative bg-slate-900 rounded-lg p-4 flex items-center justify-between border border-slate-800">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${quest.completed ? 'bg-slate-800 text-slate-600' : 'bg-slate-800 text-cyan-400'}`}>
                                <Icon size={24} />
                            </div>
                            <div>
                                <h3 className={`font-bold text-lg ${quest.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{quest.title}</h3>
                                <p className="text-sm text-slate-400 font-mono">{quest.description}</p>
                                <div className="flex gap-2 mt-2">
                                    <span className="text-[10px] bg-slate-950 border border-slate-700 px-2 py-0.5 rounded text-yellow-500">
                                        XP +{quest.rewardXp}
                                    </span>
                                    <span className={`text-[10px] bg-slate-950 border border-slate-700 px-2 py-0.5 rounded ${
                                        quest.difficulty === 'Easy' ? 'text-emerald-500' : 
                                        quest.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                                    }`}>
                                        {quest.difficulty.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => handleComplete(quest.id)}
                            disabled={quest.completed}
                            className={`p-2 rounded-full transition-colors ${
                                quest.completed 
                                ? 'text-emerald-500 cursor-default' 
                                : 'text-slate-600 hover:text-emerald-400 hover:bg-emerald-400/10'
                            }`}
                        >
                            {quest.completed ? <CheckCircle2 size={32} /> : <Circle size={32} />}
                        </button>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default QuestsView;
