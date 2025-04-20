import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Hobbies from './components/sections/Hobbies';
import Tools from './components/sections/Tools';
import Photos from './components/sections/Photos';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';

import { 
  SiteConfig, 
  SectionConfig,
  SkillItem, 
  ExperienceItem, 
  ProjectItem, 
  HobbyItem, 
  ToolItem, 
  PhotoItem 
} from './types';

import {
  getSiteConfig,
  saveSiteConfig,
  getSkills,
  getExperience,
  getProjects,
  getHobbies,
  getTools,
  getPhotos
} from './utils/storage';

function App() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(getSiteConfig());
  const [skills, setSkills] = useState<SkillItem[]>(getSkills());
  const [experience, setExperience] = useState<ExperienceItem[]>(getExperience());
  const [projects, setProjects] = useState<ProjectItem[]>(getProjects());
  const [hobbies, setHobbies] = useState<HobbyItem[]>(getHobbies());
  const [tools, setTools] = useState<ToolItem[]>(getTools());
  const [photos, setPhotos] = useState<PhotoItem[]>(getPhotos());
  const [showAdmin, setShowAdmin] = useState(false);
  
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  useEffect(() => {
    // Update document title
    document.title = `${siteConfig.name} | ${siteConfig.title}`;
  }, [siteConfig]);
  
  const handleSiteConfigChange = (config: SiteConfig) => {
    setSiteConfig(config);
    saveSiteConfig(config);
  };
  
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const toggleAdminPanel = () => {
    setShowAdmin(!showAdmin);
  };
  
  const renderSection = (section: SectionConfig) => {
    if (!section.visible) return null;
    
    switch (section.type) {
      case 'skills':
        return (
          <div key={section.id} ref={el => sectionRefs.current[section.id] = el} id={section.id}>
            <Skills skills={skills} isAdmin={showAdmin} />
          </div>
        );
      case 'experience':
        return (
          <div key={section.id} ref={el => sectionRefs.current[section.id] = el} id={section.id}>
            <Experience experience={experience} isAdmin={showAdmin} />
          </div>
        );
      case 'projects':
        return (
          <div key={section.id} ref={el => sectionRefs.current[section.id] = el} id={section.id}>
            <Projects projects={projects} isAdmin={showAdmin} />
          </div>
        );
      case 'hobbies':
        return (
          <div key={section.id} ref={el => sectionRefs.current[section.id] = el} id={section.id}>
            <Hobbies hobbies={hobbies} parallaxEnabled={section.parallaxEnabled} isAdmin={showAdmin} />
          </div>
        );
      case 'tools':
        return (
          <div key={section.id} ref={el => sectionRefs.current[section.id] = el} id={section.id}>
            <Tools tools={tools} isAdmin={showAdmin} />
          </div>
        );
      case 'photos':
        return (
          <div key={section.id} ref={el => sectionRefs.current[section.id] = el} id={section.id}>
            <Photos photos={photos} isAdmin={showAdmin} />
          </div>
        );
      case 'custom':
        return (
          <div 
            key={section.id} 
            ref={el => sectionRefs.current[section.id] = el}
            id={section.id}
            className="py-16"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">{section.title}</h2>
              <div className="prose lg:prose-lg mx-auto">
                {section.customContent ? (
                  <div dangerouslySetInnerHTML={{ __html: section.customContent }} />
                ) : (
                  <p className="text-center text-gray-500">No content added yet.</p>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        siteConfig={siteConfig} 
        isAdmin={showAdmin}
        onSectionClick={scrollToSection}
        onAdminClick={toggleAdminPanel}
      />
      
      <main>
        <Hero siteConfig={siteConfig} isAdmin={showAdmin} />
        
        {siteConfig.sections
          .filter(section => section.visible)
          .sort((a, b) => a.order - b.order)
          .map(renderSection)}
      </main>
      
      <Footer />
      
      {showAdmin && (
        <AdminPanel 
          siteConfig={siteConfig}
          onClose={toggleAdminPanel}
          onSiteConfigChange={handleSiteConfigChange}
        />
      )}
    </div>
  );
}

export default App;