import React from 'react';
import Editor from '@monaco-editor/react';
import { type Language } from '../types';

interface EditorSectionProps {
  selectedLang: Language;
  code: string;
  onChange: (value: string) => void;
}

const EditorSection: React.FC<EditorSectionProps> = ({ selectedLang, code, onChange }) => {
  return (
    <div className="relative border-b border-slate-800 flex-1">
      <div className="absolute top-2 right-4 z-10 px-2 py-1 bg-slate-800/80 backdrop-blur rounded text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-700">
        {selectedLang.name} Editor
      </div>
      <Editor
        height="100%"
        language={selectedLang.id === 'cpp' || selectedLang.id === 'c' ? 'cpp' : selectedLang.id}
        value={code}
        theme="vs-dark"
        onChange={(value) => onChange(value || '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 20 },
          fontFamily: 'JetBrains Mono, Fira Code, monospace',
          smoothScrolling: true,
          cursorSmoothCaretAnimation: "on",
        }}
      />
    </div>
  );
};

export default EditorSection;
