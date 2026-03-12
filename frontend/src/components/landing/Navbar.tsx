import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const Navbar: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 h-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <img 
              src="/logo.png" 
              alt="8BIT Compiler Logo" 
              className="w-10 h-10 rounded-lg" 
            />
            <h1 className="text-xl font-bold tracking-tight text-black">
              8BIT Compiler
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div 
            onClick={() => navigate(user ? '/profile' : '/auth')}
            className="w-10 h-10 rounded-full border-2 border-slate-100 flex items-center justify-center text-sm font-bold text-slate-400 bg-slate-50 cursor-pointer hover:bg-slate-100 hover:border-slate-200 transition-all"
            title={user ? 'Profile' : 'Sign In'}
          >
            {user ? (
              user.email[0].toUpperCase()
            ) : (
              <LogIn className="w-5 h-5" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
