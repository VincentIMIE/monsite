import React, { useEffect, useState } from 'react';
import { SiteConfig } from '../types';

interface HeroProps {
  siteConfig: SiteConfig;
  isAdmin?: boolean;
  onEdit?: () => void;
}

const Hero: React.FC<HeroProps> = ({ 
  siteConfig, 
  isAdmin = false, 
  onEdit 
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          transform: loaded ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.5s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 
          className={`text-4xl md:text-6xl font-bold text-white mb-4 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {siteConfig.name}
        </h1>
        <h2 
          className={`text-2xl md:text-3xl font-semibold text-white mb-6 transition-all duration-1000 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {siteConfig.title}
        </h2>
        <p 
          className={`text-lg md:text-xl text-gray-200 mb-8 transition-all duration-1000 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {siteConfig.subtitle}
        </p>
        
        <div 
          className={`transition-all duration-1000 delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <a 
            href="#contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors mx-2"
          >
            Contact Me
          </a>
          <a 
            href="#projects" 
            className="bg-transparent hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-full border-2 border-white transition-colors mx-2 mt-4 md:mt-0 inline-block"
          >
            View Work
          </a>
        </div>
        
        {isAdmin && (
          <div className="mt-8">
            <button 
              onClick={onEdit}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
            >
              Edit Hero Section
            </button>
          </div>
        )}
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-white opacity-70"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;