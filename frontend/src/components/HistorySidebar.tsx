import React from 'react';
import { type ExecutionRecord, type Language, LANGUAGES } from '../types';

interface HistorySidebarProps {
  show: boolean;
  history: ExecutionRecord[];
  onClose: () => void;
  onSelectRecord: (record: ExecutionRecord, lang: Language) => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ show, history, onClose, onSelectRecord }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-y-0 left-0 w-80 bg-slate-900 border-r border-slate-800 z-40 shadow-2xl animate-in slide-in-from-left">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center">
        <h2 className="font-semibold">Execution History</h2>
        <button onClick={onClose} className="text-slate-500 hover:text-white">×</button>
      </div>
      <div className="overflow-y-auto h-full pb-20">
        {history.length === 0 ? (
          <div className="p-10 text-center text-slate-600 italic text-sm">No history found...</div>
        ) : (
          history.map((item) => (
            <div 
              key={item.id} 
              className="p-4 border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer transition-colors"
              onClick={() => {
                const lang = LANGUAGES.find(l => l.id === item.language) || LANGUAGES[0];
                onSelectRecord(item, lang);
              }}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-indigo-400 uppercase">{item.language}</span>
                <span className="text-[10px] text-slate-500">{new Date(item.created_at).toLocaleString()}</span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 font-mono">{item.code}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistorySidebar;
