import React from 'react';
import { ExperienceItem } from '../../types';

interface ExperienceProps {
  experience: ExperienceItem[];
  isAdmin?: boolean;
  onEdit?: () => void;
}

const Experience: React.FC<ExperienceProps> = ({ 
  experience, 
  isAdmin = false, 
  onEdit 
}) => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
        
        {isAdmin && (
          <div className="mb-6 text-center">
            <button 
              onClick={onEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Edit Experience
            </button>
          </div>
        )}
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200 hidden md:block"></div>
          
          <div className="space-y-12">
            {experience.map((item, index) => (
              <div key={item.id} className="relative">
                <div className={`md:flex items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full hidden md:block"></div>
                  
                  {/* Content */}
                  <div className="md:w-1/2 md:px-8">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                      <h4 className="text-lg font-medium text-blue-600 mb-2">{item.company}</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {item.location} | {formatDate(item.startDate)} - {formatDate(item.endDate)}
                      </p>
                      <p className="text-gray-700 mb-4">{item.description}</p>
                      
                      {item.skills && item.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, i) => (
                            <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  if (dateString === 'Present') return 'Present';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en', { 
    year: 'numeric', 
    month: 'short'
  }).format(date);
};

export default Experience;