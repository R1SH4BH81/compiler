import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="pb-0 bg-white text-center min-h-[85vh] flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex-1 flex flex-col items-center pt-18">
        <div className="flex flex-col items-center mb-6">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6 block">
            AI-POWERED CLOUD-BASED COMPILER
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 max-w-5xl mx-auto leading-[1.05]">
            Start coding without the complex setup
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16">
            <Link 
              to="/compiler" 
              className="px-10 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2 group shadow-xl shadow-indigo-900/20 text-lg"
            >
              Let's Code
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Product Image Section - Browser Mockup */}
        <div className="relative max-w-6xl w-full mx-auto px-4">
          <div className="rounded-2xl shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.15),0_40px_100px_-30px_rgba(0,0,0,0.2)] border border-slate-200 bg-white overflow-hidden">
            {/* Browser Header */}
            <div className="h-11 bg-slate-50 border-b border-slate-200 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white border border-slate-200 rounded-md px-3 py-1 text-[10px] text-slate-400 w-1/2 max-w-xs text-center">
                  eightbit-compiler
                </div>
              </div>
            </div>
            
            {/* Image Content */}
            <div className="bg-slate-900 max-h-full overflow-hidden relative group">
              <img 
                src="https://res.cloudinary.com/djap3kkqi/image/upload/v1773339398/compiler_wvjo0a.avif" 
                alt="EightBit Compiler Interface" 
                className="w-full h-auto opacity-95 group-hover:opacity-100 transition-opacity duration-500"
              />
              {/* Bottom Fade Overlay to indicate more content below */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
