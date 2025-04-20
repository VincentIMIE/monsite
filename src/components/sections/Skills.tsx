import React from 'react';
import { SkillItem } from '../../types';

interface SkillsProps {
  skills: SkillItem[];
  isAdmin?: boolean;
  onEdit?: () => void;
}

const Skills: React.FC<SkillsProps> = ({ skills, isAdmin = false, onEdit }) => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        
        {isAdmin && (
          <div className="mb-6 text-center">
            <button 
              onClick={onEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Edit Skills
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div 
              key={skill.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">{skill.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${(skill.level / 5) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {skill.level === 1 && "Beginner"}
                {skill.level === 2 && "Elementary"}
                {skill.level === 3 && "Intermediate"}
                {skill.level === 4 && "Advanced"}
                {skill.level === 5 && "Expert"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;