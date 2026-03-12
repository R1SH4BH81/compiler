import React from 'react';
import { ArrowRight, Star, PlayCircle } from 'lucide-react';

const FeaturesShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-[#F2F1ED] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 space-y-10">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-serif text-[#1C3026] leading-[1.1]">
                Discover the <br />
                <span className="italic font-light">Perfect Environment</span> <br />
                to Code and Create
              </h2>
              <p className="text-lg text-[#5A635F] max-w-lg leading-relaxed">
                Explore a curated development environment that fits your workflow. 
                Build, test, and deploy with lightning-fast cloud infrastructure.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-[#1C3026] text-white rounded-full font-medium flex items-center gap-3 hover:bg-[#2A4538] transition-all group shadow-lg">
                View Projects
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} />
                </div>
              </button>
            </div>

            <div className="flex items-center gap-12 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1C3026]">10,000+</p>
                  <p className="text-xs text-[#5A635F]">Active Developers</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="fill-[#1C3026] text-[#1C3026]" />
                  ))}
                  <span className="ml-2 text-sm font-bold text-[#1C3026]">4.9/5</span>
                </div>
                <p className="text-xs text-[#5A635F]">Review on Product Hunt</p>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Mockup */}
          <div className="flex-1 relative w-full">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-white aspect-[4/5] lg:aspect-auto lg:h-[700px]">
              <img 
                src="https://res.cloudinary.com/djap3kkqi/image/upload/v1773339398/compiler_wvjo0a.avif" 
                alt="Compiler Interface" 
                className="w-full h-full object-cover"
              />
              
              {/* Floating Tags - Image style */}
              <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                <p className="text-xs text-[#5A635F] mb-1">Cloud Native</p>
                <p className="text-2xl font-bold text-[#1C3026]">Free to Use</p>
                <button className="mt-4 px-6 py-2 border border-[#1C3026] rounded-full text-xs font-bold hover:bg-[#1C3026] hover:text-white transition-all">
                  Get Started
                </button>
              </div>

              <div className="absolute top-1/2 right-10 -translate-y-1/2 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1C3026] rounded-full flex items-center justify-center text-white">
                  <PlayCircle size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1C3026]">Feature Tour</p>
                  <p className="text-xs text-[#5A635F]">Watch Demo</p>
                </div>
              </div>

              <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#1C3026]">Enterprise Ready</h3>
                  <p className="text-[#5A635F] text-sm mt-1">Scale your team with ease</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-serif text-[#1C3026] italic">$0</p>
                  <p className="text-xs text-[#5A635F]">Starting Plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
