import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { User, Key, Check, AlertCircle, ArrowLeft, Save, Loader2 } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, token, refreshUser } = useAuthStore();
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const navigate = useNavigate();

  const handleUpdateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await axios.post(`${API_BASE_URL}/update-api-key`, 
        { gemini_api_key: apiKey },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ type: 'success', text: 'API Key updated successfully!' });
      setApiKey('');
      await refreshUser();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.detail || 'Failed to update API Key' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8">
      <div className="max-w-2xl mx-auto pb-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Compiler
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/20">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">User Profile</h1>
                <p className="text-slate-400">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <section>
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-semibold">Active Member</span>
                  </div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Member Since</span>
                  <span className="text-sm font-semibold">{new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">AI Configuration (BYOK)</h2>
                {user.has_api_key ? (
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase">
                    <Check className="w-3 h-3" />
                    Key Configured
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20 uppercase">
                    <AlertCircle className="w-3 h-3" />
                    Key Missing
                  </span>
                )}
              </div>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Bring your own Google Gemini API key to enable AI features like AUTOFILL, FIX, and EXPLAIN. 
                  Your key is stored securely and used only for your requests.
                  <span className="block mt-2">
                    Don't have a key? <a 
                      href="https://aistudio.google.com/app/apikey" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 transition-colors underline decoration-indigo-500/30 underline-offset-4"
                    >
                      Get one from here 
                    </a>
                  </span>
                </p>

                <form onSubmit={handleUpdateKey} className="space-y-4">
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      placeholder={user.has_api_key ? "Enter new key to update..." : "Paste your Gemini API key here..."}
                    />
                  </div>

                  {message && (
                    <div className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {message.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      {message.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !apiKey}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Update API Key</>}
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
