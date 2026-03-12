import React from 'react';
import { ChevronRight, Terminal, Trash2 } from 'lucide-react';

interface TerminalSectionProps {
  inputData: string;
  onInputChange: (value: string) => void;
  output: string;
  onClearOutput: () => void;
}

const TerminalSection: React.FC<TerminalSectionProps> = ({ 
  inputData, 
  onInputChange, 
  output,
  onClearOutput
}) => {
  return (
    <div className="grid grid-cols-2 bg-slate-950 h-full w-full">
      {/* Input Area */}
      <div className="flex flex-col border-r border-slate-800">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900/30">
          <ChevronRight className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Standard Input</span>
        </div>
        <textarea
          value={inputData}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Enter program input here..."
          className="flex-1 bg-transparent p-4 font-mono text-sm focus:outline-none resize-none text-slate-300 placeholder:text-slate-700"
        />
      </div>

      {/* Output Area */}
      <div className="flex flex-col bg-slate-900/20">
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/30">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Console Output</span>
          </div>
          <button 
            onClick={onClearOutput}
            title="Clear Output"
            className="p-1 text-slate-500 hover:text-white transition-colors rounded hover:bg-slate-800"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex-1 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
          {output ? (
            <span className={output.includes('error') || output.includes('Error') ? 'text-red-400' : 'text-emerald-400'}>
              {output}
            </span>
          ) : (
            <span className="text-slate-700 italic text-xs">Run code to see output...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalSection;
