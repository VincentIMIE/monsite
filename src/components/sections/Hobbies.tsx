import React, { useEffect, useRef } from 'react';
import { HobbyItem } from '../../types';

interface HobbiesProps {
  hobbies: HobbyItem[];
  parallaxEnabled?: boolean;
  isAdmin?: boolean;
  onEdit?: () => void;
}

const Hobbies: React.FC<HobbiesProps> = ({ 
  hobbies, 
  parallaxEnabled = false,
  isAdmin = false, 
  onEdit 
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallaxEnabled) return;
    
    const handleScroll = () => {
      const cards = document.querySelectorAll('.hobby-card');
      
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if card is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollPosition = window.scrollY;
          const distance = scrollPosition - rect.top;
          const translateY = distance * -0.05 * (index % 2 === 0 ? 1 : -1);
          
          (card as HTMLElement).style.transform = `translateY(${translateY}px)`;
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallaxEnabled]);

  return (
    <div ref={sectionRef} className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Hobbies & Interests</h2>
        
        {isAdmin && (
          <div className="mb-6 text-center">
            <button 
              onClick={onEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Edit Hobbies
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hobbies.map((hobby) => (
            <div 
              key={hobby.id} 
              className="hobby-card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {hobby.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={hobby.image} 
                    alt={hobby.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{hobby.name}</h3>
                <p className="text-gray-300">{hobby.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hobbies;