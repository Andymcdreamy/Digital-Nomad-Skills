import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { askOracle } from '../services/gemini';
import { SkillData, ChatMessage } from '../types';

interface OracleViewProps {
  skills: SkillData[];
}

const OracleView: React.FC<OracleViewProps> = ({ skills }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'nexus',
      text: 'Greetings, Operator. I am NEXUS. My processing cores are aligned with your neural net. What guidance do you seek regarding your skill optimization protocols?',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
        // Format history for the API
        const history = messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
        })).filter(h => h.role === 'user' || h.role === 'model') as { role: 'user' | 'model', parts: [{ text: string }] }[];

        const responseText = await askOracle(userMsg.text, skills, history);
        
        const nexusMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            sender: 'nexus',
            text: responseText,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, nexusMsg]);
    } catch (err) {
        console.error("Chat error", err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] flex flex-col bg-slate-900/50 border border-cyan-500/20 rounded-xl overflow-hidden animate-in fade-in zoom-in duration-300">
      
      {/* Header */}
      <div className="bg-slate-900 border-b border-cyan-500/30 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <h2 className="font-mono text-cyan-400 font-bold tracking-widest">NEXUS_UPLINK</h2>
        </div>
        <div className="text-xs text-slate-500 font-mono">LATENCY: 12ms</div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded flex-shrink-0 flex items-center justify-center border ${
                msg.sender === 'nexus' ? 'bg-cyan-900/50 border-cyan-500 text-cyan-400' : 'bg-slate-800 border-slate-600 text-slate-300'
            }`}>
                {msg.sender === 'nexus' ? <Bot size={18} /> : <User size={18} />}
            </div>
            
            <div className={`p-3 rounded-lg text-sm border ${
                msg.sender === 'nexus' 
                ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-100 rounded-tl-none' 
                : 'bg-slate-800 border-slate-700 text-slate-200 rounded-tr-none'
            }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <p className="text-[10px] mt-2 opacity-50 text-right font-mono">
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
            </div>
          </div>
        ))}
        {loading && (
             <div className="flex items-start gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center border bg-cyan-900/50 border-cyan-500 text-cyan-400 animate-pulse">
                    <Bot size={18} />
                </div>
                <div className="flex items-center gap-1 p-4 bg-cyan-950/10 rounded-lg">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-0"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-200"></span>
                </div>
             </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900/80 border-t border-cyan-500/30 backdrop-blur-sm">
        <div className="flex gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query the mainframe..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
            />
            <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded border border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Send size={18} />
            </button>
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
             <button onClick={() => setInput("What is the best skill to learn for 2030?")} className="text-xs whitespace-nowrap px-3 py-1 rounded-full border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-colors bg-slate-900">
                <Sparkles className="inline w-3 h-3 mr-1" /> Best skills 2030
             </button>
             <button onClick={() => setInput("How do I improve my Digital Knowledge?")} className="text-xs whitespace-nowrap px-3 py-1 rounded-full border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-colors bg-slate-900">
                <Sparkles className="inline w-3 h-3 mr-1" /> Upgrade Digital Tech
             </button>
             <button onClick={() => setInput("Generate a daily routine for martial arts.")} className="text-xs whitespace-nowrap px-3 py-1 rounded-full border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-colors bg-slate-900">
                <Sparkles className="inline w-3 h-3 mr-1" /> Daily Routine
             </button>
        </div>
      </div>
    </div>
  );
};

export default OracleView;
