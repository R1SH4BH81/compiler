import React from 'react';
import { Trash2, X, History } from 'lucide-react';
import { type ExecutionRecord, type Language, LANGUAGES } from '../types';

interface HistorySidebarProps {
  show: boolean;
  history: ExecutionRecord[];
  isLoggedIn: boolean;
  onClose: () => void;
  onSelectRecord: (record: ExecutionRecord, lang: Language) => void;
  onClearHistory: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ 
  show, 
  history, 
  isLoggedIn,
  onClose, 
  onSelectRecord,
  onClearHistory
}) => {
  if (!show) return null;

  return (
    <div className="absolute inset-y-0 left-0 w-80 bg-slate-900 border-r border-slate-800 z-40 shadow-2xl animate-in slide-in-from-left">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-slate-200">Execution History</h2>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-500 uppercase">
            {history.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button 
              onClick={onClearHistory}
              title="Clear History"
              className="p-1.5 text-slate-500 hover:text-red-400 transition-colors rounded hover:bg-slate-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose} 
            className="p-1.5 text-slate-500 hover:text-white transition-colors rounded hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100%-60px)] pb-20 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <div className="p-3 rounded-full bg-slate-800/50 mb-4">
              <History className="w-8 h-8 text-slate-700" />
            </div>
            <p className="text-slate-400 font-medium mb-2">History is disabled</p>
            <p className="text-slate-600 text-sm mb-6">Login to save and view your execution history</p>
            <a 
              href="/auth" 
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm font-medium transition-colors"
            >
              Login Now
            </a>
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <div className="p-3 rounded-full bg-slate-800/50 mb-4">
              <History className="w-8 h-8 text-slate-700" />
            </div>
            <p className="text-slate-600 italic text-sm">No execution history found yet...</p>
          </div>
        ) : (
          history.map((item) => (
            <div 
              key={item.id} 
              className="p-4 border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer transition-colors group relative"
              onClick={() => {
                const lang = LANGUAGES.find(l => l.id === item.language) || LANGUAGES[0];
                onSelectRecord(item, lang);
              }}
            >
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                  {item.language}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 font-mono bg-slate-950/50 p-2 rounded border border-slate-800 group-hover:border-slate-700 transition-colors">
                {item.code}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistorySidebar;
