import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, RotateCcw, History, Code2, Upload, 
  Download, Copy, Check, RotateCw, LogIn
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface HeaderProps {
  loading: boolean;
  onRun: () => void;
  onToggleHistory: () => void;
  showHistory: boolean;
  onUpload: (file: File) => void;
  onDownload: () => void;
  onCopy: () => void;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  loading, 
  onRun, 
  onToggleHistory, 
  showHistory, 
  onUpload,
  onDownload,
  onCopy,
  onReset
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      e.target.value = '';
    }
  };

  const handleCopyClick = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-indigo-500 rounded-lg">
          <Code2 className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white cursor-pointer" onClick={() => navigate('/')}>
          8BIT Compiler
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept=".py,.java,.cpp,.cc,.cxx,.c,.h,.hpp"
        />
        <div className="flex items-center bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
          <button 
            onClick={handleUploadClick}
            title="Upload File"
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-md hover:bg-slate-700"
          >
            <Upload className="w-4 h-4" />
          </button>
          <button 
            onClick={onDownload}
            title="Download Code"
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-md hover:bg-slate-700"
          >
            <Download className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-slate-700 mx-1" />
          <button 
            onClick={handleCopyClick}
            title="Copy to Clipboard"
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-md hover:bg-slate-700 flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button 
            onClick={onReset}
            title="Reset to Default"
            className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-md hover:bg-slate-700"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

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

        <div className="relative">
          <button
            onClick={() => navigate(user ? '/profile' : '/auth')}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors rounded-md hover:bg-slate-800 ${
              user ? 'text-slate-200' : 'text-indigo-400'
            }`}
          >
            {user ? (
              <>
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold">
                  {user.email[0].toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate">{user.email.split('@')[0]}</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Sign In 
              </>
            )}
          </button>
        </div>

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
