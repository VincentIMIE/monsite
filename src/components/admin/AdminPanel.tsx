import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { SiteConfig, SectionConfig } from '../../types';
import { 
  getSkills, getExperience, getProjects, 
  getHobbies, getTools, getPhotos, 
  addSection, removeSection, updateSection, reorderSections
} from '../../utils/storage';
import SectionManager from './SectionManager';

interface AdminPanelProps {
  siteConfig: SiteConfig;
  onClose: () => void;
  onSiteConfigChange: (config: SiteConfig) => void;
}

type SectionType = 'skills' | 'experience' | 'projects' | 'hobbies' | 'tools' | 'photos' | 'custom';

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  siteConfig, 
  onClose,
  onSiteConfigChange 
}) => {
  const [newSectionType, setNewSectionType] = useState<SectionType>('custom');
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [generalInfo, setGeneralInfo] = useState({
    name: siteConfig.name,
    title: siteConfig.title,
    subtitle: siteConfig.subtitle
  });
  
  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    
    const newSection = addSection(newSectionType, newSectionTitle);
    onSiteConfigChange({
      ...siteConfig,
      sections: [...siteConfig.sections, newSection]
    });
    
    setNewSectionTitle('');
  };
  
  const handleRemoveSection = (sectionId: string) => {
    if (window.confirm('Are you sure you want to remove this section?')) {
      removeSection(sectionId);
      onSiteConfigChange({
        ...siteConfig,
        sections: siteConfig.sections.filter(section => section.id !== sectionId)
      });
    }
  };
  
  const handleToggleVisibility = (sectionId: string) => {
    const updatedSections = siteConfig.sections.map(section => 
      section.id === sectionId 
        ? { ...section, visible: !section.visible } 
        : section
    );
    
    const sectionToUpdate = updatedSections.find(s => s.id === sectionId);
    if (sectionToUpdate) {
      updateSection(sectionToUpdate);
    }
    
    onSiteConfigChange({
      ...siteConfig,
      sections: updatedSections
    });
  };
  
  const handleReorderSections = (reorderedSections: SectionConfig[]) => {
    reorderSections(reorderedSections);
    onSiteConfigChange({
      ...siteConfig,
      sections: reorderedSections
    });
  };
  
  const handleGeneralInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralInfo({
      ...generalInfo,
      [name]: value
    });
  };
  
  const handleSaveGeneralInfo = () => {
    onSiteConfigChange({
      ...siteConfig,
      name: generalInfo.name,
      title: generalInfo.title,
      subtitle: generalInfo.subtitle
    });
    
    alert('General information updated successfully!');
  };
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 overflow-y-auto">
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Portfolio Admin Panel</h1>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left sidebar */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">General Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={generalInfo.name}
                        onChange={handleGeneralInfoChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={generalInfo.title}
                        onChange={handleGeneralInfoChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subtitle
                      </label>
                      <textarea
                        name="subtitle"
                        value={generalInfo.subtitle}
                        onChange={handleGeneralInfoChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      onClick={handleSaveGeneralInfo}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      Save General Info
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Add New Section</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Type
                      </label>
                      <select
                        value={newSectionType}
                        onChange={(e) => setNewSectionType(e.target.value as SectionType)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="skills">Skills</option>
                        <option value="experience">Experience</option>
                        <option value="projects">Projects</option>
                        <option value="hobbies">Hobbies</option>
                        <option value="tools">Tools</option>
                        <option value="photos">Photos</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={newSectionTitle}
                        onChange={(e) => setNewSectionTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter section title"
                      />
                    </div>
                    <button
                      onClick={handleAddSection}
                      disabled={!newSectionTitle.trim()}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={18} className="mr-2" />
                      Add Section
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Main content */}
              <div className="md:col-span-2">
                <SectionManager
                  sections={siteConfig.sections.sort((a, b) => a.order - b.order)}
                  onToggleVisibility={handleToggleVisibility}
                  onRemoveSection={handleRemoveSection}
                  onReorderSections={handleReorderSections}
                />
                
                <div className="mt-6 text-center">
                  <button
                    onClick={onClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-md transition-colors"
                  >
                    Return to Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;