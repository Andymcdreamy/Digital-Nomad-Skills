import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, BookOpen, MessageSquare, Target, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  const navItems = [
    { id: 'DASHBOARD', icon: LayoutDashboard, label: 'CMD_CENTER' },
    { id: 'SKILLS', icon: BookOpen, label: 'SKILL_DB' },
    { id: 'QUESTS', icon: Target, label: 'ACTIVE_OPS' },
    { id: 'ORACLE', icon: MessageSquare, label: 'NEXUS_AI' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-cyan-500 font-mono selection:bg-cyan-900 selection:text-white overflow-hidden flex flex-col md:flex-row">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10" 
        style={{ 
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
        }}>
      </div>
      
      {/* Sidebar / Mobile Nav */}
      <nav className="z-10 w-full md:w-64 bg-slate-900/80 backdrop-blur-md border-b md:border-b-0 md:border-r border-cyan-500/30 flex md:flex-col justify-between p-4 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <div className="mb-0 md:mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-lg border border-cyan-500 flex items-center justify-center animate-pulse">
            <User className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wider text-slate-100">NEXUS</h1>
            <p className="text-xs text-cyan-700">v.2.0.45 [ONLINE]</p>
          </div>
        </div>

        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewState)}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 border border-transparent
                ${currentView === item.id 
                  ? 'bg-cyan-950/50 border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                  : 'hover:bg-slate-800/50 hover:text-cyan-400 opacity-70 hover:opacity-100'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="hidden md:inline tracking-widest text-sm font-semibold">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="hidden md:block mt-auto border-t border-cyan-900/50 pt-4">
            <div className="text-xs text-cyan-800 mb-2">SYSTEM STATUS</div>
            <div className="flex gap-1 mb-1">
                <div className="h-1 w-full bg-emerald-500/50 rounded-full animate-pulse"></div>
                <div className="h-1 w-1/3 bg-cyan-500/50 rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-500">Connected to Mainframe</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 z-10 overflow-y-auto p-4 md:p-8 relative">
        <div className="max-w-7xl mx-auto h-full">
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
