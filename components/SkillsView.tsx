import React from 'react';
import { SkillData } from '../types';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../constants';
import { Lock, ArrowUpRight } from 'lucide-react';

interface SkillsViewProps {
  skills: SkillData[];
}

const SkillsView: React.FC<SkillsViewProps> = ({ skills }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-6">
        SKILL_DATABASE
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => {
          const Icon = CATEGORY_ICONS[skill.category] || Lock;
          const color = CATEGORY_COLORS[skill.category] || '#ccc';
          const progress = (skill.xp / skill.maxXp) * 100;

          return (
            <div key={skill.id} className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 p-5 rounded-lg transition-all duration-300 group shadow-lg relative overflow-hidden">
                {/* Decorative glow */}
                <div 
                    className="absolute top-0 left-0 w-full h-1 opacity-50"
                    style={{ backgroundColor: color }}
                />
                
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-white/20 transition-colors">
                        <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-mono text-slate-500 block">LEVEL</span>
                        <span className="text-2xl font-bold text-white font-mono">{skill.level}<span className="text-sm text-slate-600">/{skill.maxLevel}</span></span>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-slate-100 mb-1">{skill.name}</h3>
                <p className="text-xs text-cyan-600 uppercase tracking-widest mb-3">{skill.category}</p>
                
                <p className="text-sm text-slate-400 mb-4 h-10 line-clamp-2">{skill.lore}</p>

                {/* XP Bar */}
                <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-xs text-slate-500 font-mono">
                        <span>XP_PROGRESS</span>
                        <span>{skill.xp} / {skill.maxXp}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div 
                            className="h-full transition-all duration-1000 ease-out"
                            style={{ width: `${progress}%`, backgroundColor: color }}
                        ></div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                    <div className="flex items-center gap-2">
                        <ArrowUpRight className={`w-4 h-4 ${skill.trend > 0 ? 'text-emerald-500' : 'text-red-500'}`} />
                        <span className={`text-xs font-mono ${skill.trend > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {skill.trend > 0 ? '+' : ''}{skill.trend}% Demand
                        </span>
                    </div>
                    <button className="text-xs text-white bg-slate-800 hover:bg-cyan-600 px-3 py-1 rounded transition-colors uppercase font-bold tracking-wider">
                        Train
                    </button>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsView;
