import React from 'react';
import { type Language, LANGUAGES } from '../types';

interface SidebarProps {
  selectedLang: Language;
  onSelectLanguage: (lang: Language) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedLang, onSelectLanguage }) => {
  return (
    <aside className="w-16 border-r border-slate-800 flex flex-col items-center py-6 gap-6 bg-slate-900/30">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onSelectLanguage(lang)}
          className={`relative group p-3 rounded-xl transition-all ${
            selectedLang.id === lang.id 
              ? 'bg-indigo-500/10 text-indigo-400' 
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <span className="text-xs font-bold uppercase">{lang.icon}</span>
          {selectedLang.id === lang.id && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full" />
          )}
          <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
            {lang.name}
          </div>
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
