import { create } from 'zustand';
import axios from 'axios';
import { type Language, LANGUAGES, API_BASE_URL, type ExecutionRecord } from '../types';
import { useAuthStore } from './useAuthStore';

interface CompilerState {
  selectedLang: Language;
  code: string;
  inputData: string;
  output: string;
  loading: boolean;
  aiLoading: boolean;
  history: ExecutionRecord[];
  showHistory: boolean;
  error: { title: string; message: string } | null;

  setSelectedLang: (lang: Language) => void;
  setCode: (code: string | ((prev: string) => string)) => void;
  setInputData: (data: string) => void;
  setOutput: (output: string | ((prev: string) => string)) => void;
  setError: (error: { title: string; message: string } | null) => void;
  setShowHistory: (show: boolean) => void;

  runCode: () => Promise<void>;
  getAIAssistance: (promptType: 'complete' | 'fix' | 'explain') => Promise<void>;
  fetchHistory: () => Promise<void>;
  selectHistoryRecord: (record: ExecutionRecord, lang: Language) => void;
  handleFileUpload: (file: File) => void;
  handleDownload: () => void;
  handleCopy: () => void;
  resetCode: () => void;
  clearOutput: () => void;
  clearHistory: () => Promise<void>;
}

export const useCompilerStore = create<CompilerState>((set, get) => ({
  selectedLang: (() => {
    const saved = localStorage.getItem('compiler_lang');
    return LANGUAGES.find(l => l.id === saved) || LANGUAGES[0];
  })(),
  code: localStorage.getItem('compiler_code') || LANGUAGES[0].defaultCode,
  inputData: localStorage.getItem('compiler_input') || '',
  output: '',
  loading: false,
  aiLoading: false,
  history: [],
  showHistory: false,
  error: null,

  setSelectedLang: (lang: Language) => {
    localStorage.setItem('compiler_lang', lang.id);
    localStorage.setItem('compiler_code', lang.defaultCode);
    set({ selectedLang: lang, code: lang.defaultCode });
  },

  setCode: (codeUpdate) => {
    const currentCode = get().code;
    const newCode = typeof codeUpdate === 'function' ? codeUpdate(currentCode) : codeUpdate;
    localStorage.setItem('compiler_code', newCode);
    set({ code: newCode });
  },

  setInputData: (data: string) => {
    localStorage.setItem('compiler_input', data);
    set({ inputData: data });
  },

  setOutput: (outputUpdate) => {
    const currentOutput = get().output;
    const newOutput = typeof outputUpdate === 'function' ? outputUpdate(currentOutput) : outputUpdate;
    set({ output: newOutput });
  },

  setError: (error) => set({ error }),
  setShowHistory: (show) => set({ showHistory: show }),

  runCode: async () => {
    const { code, inputData, selectedLang } = get();
    const { token } = useAuthStore.getState();
    
    set({ loading: true });
    try {
      const response = await axios.post(`${API_BASE_URL}/run`, {
        code,
        input_data: inputData,
        language: selectedLang.id
      }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      set({ output: response.data.output });
      get().fetchHistory();
    } catch (error: any) {
      set({ output: error.response?.data?.detail || 'An error occurred' });
    } finally {
      set({ loading: false });
    }
  },

  getAIAssistance: async (promptType) => {
    const { code, selectedLang } = get();
    const { token, user } = useAuthStore.getState();

    if (!token) {
      set({ error: { title: 'Authentication Required', message: 'Please log in to use AI features.' } });
      return;
    }

    if (!user?.has_api_key) {
      set({ error: { title: 'API Key Missing', message: 'Please provide your Gemini API key in your profile to enable AI features.' } });
      return;
    }

    set({ aiLoading: true });
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/assist`, {
        code,
        language: selectedLang.id,
        prompt_type: promptType
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const suggestion = response.data.suggestion;
      if (suggestion.startsWith('AI Error:')) {
        set({ error: { title: 'AI Assistance Error', message: suggestion } });
      } else {
        if (promptType === 'complete') {
          get().setCode(prev => prev + '\n' + suggestion);
        } else if (promptType === 'fix') {
          get().setCode(suggestion);
        } else if (promptType === 'explain') {
          get().setOutput(prev => prev + '\n\n--- AI Explanation ---\n' + suggestion);
        }
      }
    } catch (error: any) {
      set({ error: { title: 'AI Request Failed', message: error.response?.data?.detail || 'An error occurred' } });
    } finally {
      set({ aiLoading: false });
    }
  },

  fetchHistory: async () => {
    const { token } = useAuthStore.getState();
    if (!token) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ history: response.data });
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  },

  selectHistoryRecord: (record, lang) => {
    localStorage.setItem('compiler_lang', lang.id);
    localStorage.setItem('compiler_code', record.code);
    localStorage.setItem('compiler_input', record.input_data || '');
    set({ 
      selectedLang: lang, 
      code: record.code, 
      inputData: record.input_data || '',
      showHistory: false 
    });
  },

  handleFileUpload: (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    const lang = LANGUAGES.find(l => {
      if (l.id === 'python') return extension === 'py';
      if (l.id === 'java') return extension === 'java';
      if (l.id === 'cpp') return ['cpp', 'cc', 'cxx', 'hpp'].includes(extension || '');
      if (l.id === 'c') return extension === 'c' || extension === 'h';
      return false;
    });

    if (!lang) {
      set({
        error: {
          title: 'Unsupported File Type',
          message: `The file extension .${extension} is not supported. Please upload a .py, .java, .cpp, or .c file.`
        }
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      get().setSelectedLang(lang);
      get().setCode(content);
    };
    reader.readAsText(file);
  },

  handleDownload: () => {
    const { code, selectedLang } = get();
    const extensions: Record<string, string> = {
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c'
    };
    const extension = extensions[selectedLang.id] || 'txt';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  },

  handleCopy: () => {
    const { code } = get();
    navigator.clipboard.writeText(code);
  },

  resetCode: () => {
    const { selectedLang } = get();
    get().setCode(selectedLang.defaultCode);
    get().setInputData('');
  },

  clearOutput: () => set({ output: '' }),

  clearHistory: async () => {
    set({ history: [] });
  }
}));
