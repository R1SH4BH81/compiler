import React from 'react';
import Editor from '@monaco-editor/react';
import { Sparkles, Wand2, HelpCircle, Loader2 } from 'lucide-react';
import { type Language } from '../types';

interface EditorSectionProps {
  selectedLang: Language;
  code: string;
  onChange: (value: string) => void;
  onAIAssist: (type: 'complete' | 'fix' | 'explain') => void;
  aiLoading: boolean;
}

const EditorSection: React.FC<EditorSectionProps> = ({ 
  selectedLang, 
  code, 
  onChange,
  onAIAssist,
  aiLoading
}) => {
  const monacoRef = React.useRef<any>(null);
  const editorRef = React.useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    monacoRef.current = monaco;
    editorRef.current = editor;
  };

  return (
    <div className="relative border-b border-slate-800 flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 bg-slate-800 rounded text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-700">
            {selectedLang.name}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onAIAssist('complete')}
            disabled={aiLoading}
            className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 hover:bg-indigo-500/20 rounded border border-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Complete Code"
          >
            {aiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            AUTOFILL
          </button>
          <button
            onClick={() => onAIAssist('fix')}
            disabled={aiLoading}
            className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 hover:bg-emerald-500/20 rounded border border-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Fix Bugs"
          >
            <Wand2 className="w-3 h-3" />
            FIX
          </button>
          <button
            onClick={() => onAIAssist('explain')}
            disabled={aiLoading}
            className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold text-amber-400 hover:text-amber-300 transition-colors bg-amber-500/10 hover:bg-amber-500/20 rounded border border-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Explain Code"
          >
            <HelpCircle className="w-3 h-3" />
            EXPLAIN
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={selectedLang.id === 'cpp' || selectedLang.id === 'c' ? 'cpp' : selectedLang.id}
          value={code}
          theme="vs-dark"
          onChange={(value) => onChange(value || '')}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 20 },
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            smoothScrolling: true,
            cursorSmoothCaretAnimation: "on",
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            }
          }}
        />
      </div>
    </div>
  );
};

export default EditorSection;
