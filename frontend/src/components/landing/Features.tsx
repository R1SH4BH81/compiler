import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="flex flex-col h-[400px] bg-gradient-to-b from-[#E6F4F1] to-white rounded-[2rem] overflow-hidden border border-[#E6F4F1]/50 shadow-sm relative group">
      {/* Background Image - Filling the card background */}
      {imageUrl && (
        <div className="absolute inset-0 z-10">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-all duration-500 scale-110 group-hover:scale-[1.15] opacity-40" 
          />
          {/* Gradient overlay to ensure top text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-transparent" />
        </div>
      )}

      <div className="p-8 md:p-10 flex flex-col relative z-20">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
          {title}
        </h3>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-[90%]">
          {description}
        </p>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "AI-Powered Assistance",
      description: "Get intelligent code suggestions, debugging help, and performance optimizations powered by Gemini AI, directly within your browser.",
      imageUrl: "/code-in-park.png" // Add your image URL here
    },
    {
      title: "Cloud-Based Compilation",
      description: "Compile and execute code in C, C++, Python, and Java instantly without any local setup. Our cloud infrastructure handles the heavy lifting.",
      imageUrl: "/team.png" // Using the provided image for Cloud-Based Compilation
    },
    {
      title: "Save and Share Snippets",
      description: "Securely save your code snippets and share them with a single link. Perfect for collaboration, interviews, or showcasing your work.",
      imageUrl: "/man-with-dog-in-park.png" // Add your image URL here
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              imageUrl={feature.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
