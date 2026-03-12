import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import HistorySidebar from './HistorySidebar';
import EditorSection from './EditorSection';
import TerminalSection from './TerminalSection';
import Header from './Header';
import { useCompiler } from '../hooks/useCompiler';

const Compiler: React.FC = () => {
  const {
    selectedLang,
    setSelectedLang,
    code,
    setCode,
    inputData,
    setInputData,
    output,
    loading,
    history,
    showHistory,
    setShowHistory,
    runCode,
    fetchHistory,
    selectHistoryRecord,
  } = useCompiler();

  const [showTerminal, setShowTerminal] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <Header 
        loading={loading} 
        onRun={runCode} 
        onToggleHistory={() => setShowHistory(!showHistory)}
        showHistory={showHistory}
      />

      <main className="flex flex-1 overflow-hidden">
        <Sidebar 
          selectedLang={selectedLang} 
          onSelectLanguage={setSelectedLang} 
        />

        <div className="flex-1 flex flex-col relative overflow-hidden">
          <HistorySidebar 
            show={showHistory} 
            history={history} 
            onClose={() => setShowHistory(false)} 
            onSelectRecord={selectHistoryRecord}
          />

          <div className="flex-1 grid grid-rows-[1fr_auto_auto] min-h-0 overflow-hidden">
            {/* Editor Area */}
            <div className="min-h-0 flex flex-col overflow-hidden">
              <EditorSection 
                selectedLang={selectedLang} 
                code={code} 
                onChange={setCode} 
              />
            </div>

            {/* Terminal Toggle Handle */}
            <div className="h-8 bg-slate-900 border-y border-slate-800 flex items-center justify-between px-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {loading ? 'Executing...' : 'Ready'}
                </span>
              </div>
              <button 
                onClick={() => setShowTerminal(!showTerminal)}
                className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1.5 px-2 py-1 rounded hover:bg-slate-800"
              >
                {showTerminal ? 'Hide Terminal' : 'Show Terminal'}
              </button>
            </div>

            {/* Terminal Area */}
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col ${
                showTerminal ? 'h-[300px] opacity-100' : 'h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="flex-1 min-h-0">
                <TerminalSection 
                  inputData={inputData} 
                  onInputChange={setInputData} 
                  output={output} 
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


export default Compiler;
