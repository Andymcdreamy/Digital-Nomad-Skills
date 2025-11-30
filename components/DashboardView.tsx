import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { SkillData, Quest } from '../types';
import { CATEGORY_COLORS } from '../constants';
import { ShieldAlert, TrendingUp, Zap } from 'lucide-react';

interface DashboardViewProps {
  skills: SkillData[];
  quests: Quest[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-cyan-500/50 p-2 rounded shadow-lg">
        <p className="text-cyan-300 font-bold">{label}</p>
        <p className="text-sm text-slate-300">Level: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const DashboardView: React.FC<DashboardViewProps> = ({ skills, quests }) => {
  const chartData = skills.map(s => ({
    subject: s.name.split(' ')[0], // Shorten name for chart
    A: s.level,
    fullMark: s.maxLevel,
    category: s.category
  }));

  const totalLevels = skills.reduce((acc, s) => acc + s.level, 0);
  const averageLevel = (totalLevels / skills.length).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/50 border border-cyan-500/20 p-4 rounded-lg relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-cyan-500/10 w-24 h-24 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all"></div>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xs text-cyan-600 uppercase tracking-widest">Global Level</h3>
                    <p className="text-3xl font-bold text-white mt-1">{totalLevels}</p>
                </div>
                <Zap className="text-yellow-400 w-6 h-6" />
            </div>
        </div>
        
        <div className="bg-slate-900/50 border border-cyan-500/20 p-4 rounded-lg relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-emerald-500/10 w-24 h-24 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xs text-cyan-600 uppercase tracking-widest">Avg Proficiency</h3>
                    <p className="text-3xl font-bold text-white mt-1">{averageLevel}<span className="text-sm text-slate-500">/10</span></p>
                </div>
                <TrendingUp className="text-emerald-400 w-6 h-6" />
            </div>
        </div>

        <div className="bg-slate-900/50 border border-cyan-500/20 p-4 rounded-lg relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-red-500/10 w-24 h-24 rounded-full blur-xl group-hover:bg-red-500/20 transition-all"></div>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xs text-cyan-600 uppercase tracking-widest">Active Threats</h3>
                    <p className="text-3xl font-bold text-white mt-1">2<span className="text-sm text-slate-500"> detected</span></p>
                </div>
                <ShieldAlert className="text-red-400 w-6 h-6" />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-slate-900/80 border border-cyan-500/30 p-6 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.05)]">
            <h2 className="text-lg font-bold text-cyan-400 mb-4 border-b border-cyan-900 pb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
                METRICS_VISUALIZATION
            </h2>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                    <Radar
                        name="Skill Level"
                        dataKey="A"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        fill="#06b6d4"
                        fillOpacity={0.3}
                    />
                    <Tooltip content={<CustomTooltip />} />
                </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Recent Quests Summary */}
        <div className="bg-slate-900/80 border border-cyan-500/30 p-6 rounded-xl">
             <h2 className="text-lg font-bold text-cyan-400 mb-4 border-b border-cyan-900 pb-2">
                ACTIVE_OPERATIONS
            </h2>
            <div className="space-y-4">
                {quests.slice(0, 3).map(q => (
                    <div key={q.id} className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded hover:border-cyan-500/50 transition-colors">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${q.difficulty === 'Hard' ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                                <h4 className="text-sm font-semibold text-slate-200">{q.title}</h4>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{q.description}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-mono text-yellow-500">+{q.rewardXp} XP</span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 border border-dashed border-slate-700 text-slate-500 text-xs hover:text-cyan-400 hover:border-cyan-500 transition-all uppercase tracking-widest">
                View All Operations
            </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
