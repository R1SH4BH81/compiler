import React from 'react';
import { Play, RotateCcw, History, Code2 } from 'lucide-react';

interface HeaderProps {
  loading: boolean;
  onRun: () => void;
  onToggleHistory: () => void;
  showHistory: boolean;
}

const Header: React.FC<HeaderProps> = ({ loading, onRun, onToggleHistory, showHistory }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-indigo-500 rounded-lg">
          <Code2 className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">8BIT Compiler</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleHistory}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors rounded-md hover:bg-slate-800 ${
            showHistory ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400 hover:text-white'
          }`}
        >
          <History className="w-4 h-4" />
          History
        </button>
        <div className="h-6 w-px bg-slate-800" />
        <button
          onClick={onRun}
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${
            loading 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 active:scale-95'
          }`}
        >
          {loading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
          {loading ? 'Running...' : 'Run Code'}
        </button>
      </div>
    </header>
  );
};

export default Header;
