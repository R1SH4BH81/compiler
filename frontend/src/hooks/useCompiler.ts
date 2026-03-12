import { useState, useEffect } from 'react';
import axios from 'axios';
import { type Language, LANGUAGES, API_BASE_URL, type ExecutionRecord } from '../types';

export const useCompiler = () => {
  const [selectedLang, setSelectedLang] = useState<Language>(LANGUAGES[0]);
  const [code, setCode] = useState<string>(selectedLang.defaultCode);
  const [inputData, setInputData] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<ExecutionRecord[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  useEffect(() => {
    setCode(selectedLang.defaultCode);
  }, [selectedLang]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const runCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/run`, {
        code,
        input_data: inputData,
        language: selectedLang.id
      });
      setOutput(response.data.output);
      fetchHistory();
    } catch (error: any) {
      setOutput(error.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectHistoryRecord = (record: ExecutionRecord, lang: Language) => {
    setCode(record.code);
    setInputData(record.input_data || '');
    setSelectedLang(lang);
    setShowHistory(false);
  };

  return {
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
  };
};
