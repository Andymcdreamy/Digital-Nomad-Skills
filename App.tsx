import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import DashboardView from './components/DashboardView';
import SkillsView from './components/SkillsView';
import OracleView from './components/OracleView';
import QuestsView from './components/QuestsView';
import { ViewState, SkillData, Quest } from './types';
import { INITIAL_SKILLS, INITIAL_QUESTS } from './constants';
import { Terminal } from 'lucide-react';

const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  
  const bootLines = [
    "INITIALIZING NEXUS_OS KERNEL...",
    "LOADING BIOMETRIC DRIVERS... OK",
    "SYNCING GLOBAL FINANCIAL PROTOCOLS... OK",
    "CONNECTING TO NEURAL LINK... ESTABLISHED",
    "DECRYPTING SKILL DATABASE...",
    "LOADING RPG_LORE_MODULE... COMPLETE",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let delay = 0;
    bootLines.forEach((line, index) => {
      delay += Math.random() * 500 + 200;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === bootLines.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-cyan-500 font-mono p-4">
      <div className="w-full max-w-md border border-cyan-900 bg-slate-900/50 p-6 rounded shadow-[0_0_20px_rgba(6,182,212,0.1)]">
        <div className="flex items-center gap-2 mb-4 border-b border-cyan-900 pb-2">
            <Terminal className="w-5 h-5 animate-pulse" />
            <span className="font-bold tracking-widest">BOOT_SEQUENCE</span>
        </div>
        <div className="space-y-2 font-mono text-sm h-48 overflow-hidden">
            {lines.map((line, i) => (
                <div key={i} className="animate-in fade-in slide-in-from-left-4 duration-300">
                    <span className="text-cyan-700 mr-2">{'>'}</span>
                    {line}
                </div>
            ))}
            <div className="animate-pulse text-cyan-500">_</div>
        </div>
        <div className="mt-4 h-1 bg-slate-800 w-full rounded overflow-hidden">
            <div 
                className="h-full bg-cyan-500 transition-all duration-300" 
                style={{ width: `${(lines.length / bootLines.length) * 100}%` }}
            ></div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');
  const [skills, setSkills] = useState<SkillData[]>(INITIAL_SKILLS);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <DashboardView skills={skills} quests={quests} />;
      case 'SKILLS':
        return <SkillsView skills={skills} />;
      case 'ORACLE':
        return <OracleView skills={skills} />;
      case 'QUESTS':
        return <QuestsView quests={quests} skills={skills} setQuests={setQuests} setSkills={setSkills} />;
      default:
        return <DashboardView skills={skills} quests={quests} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;