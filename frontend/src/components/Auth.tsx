import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';
import './Auth.css';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);
        
        const response = await axios.post(`${API_BASE_URL}/token`, params);
        login(response.data.access_token);
        navigate('/compiler');
      } else {
        // Register the user
        await axios.post(`${API_BASE_URL}/register`, { email, password });
        
        // Auto-login after registration
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);
        
        const response = await axios.post(`${API_BASE_URL}/token`, params);
        login(response.data.access_token);
        navigate('/compiler');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <form className="uiverse-form" onSubmit={handleSubmit}>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isLogin ? 'Please enter your details to sign in' : 'Join us to start compiling code'}
          </p>
        </div>

        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
            <g id="Layer_3" data-name="Layer 3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
            </g>
          </svg>
          <input 
            type="email" 
            className="input" 
            placeholder="Enter your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input 
            type="password" 
            className="input" 
            placeholder="Enter your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
     
        </div>

        {error && (
          <div className={`error-message ${error.includes('created') ? 'success' : 'error'}`}>
            {error}
          </div>
        )}

        <button className="button-submit" type="submit" disabled={loading}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
        </button>

        <p className="p">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <span className="span" onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Auth;

