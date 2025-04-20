import { 
  SiteConfig, 
  SkillItem, 
  ExperienceItem, 
  ProjectItem, 
  HobbyItem, 
  ToolItem, 
  PhotoItem, 
  SectionConfig 
} from '../types';
import { 
  initialSiteConfig, 
  initialSkills, 
  initialExperience, 
  initialProjects, 
  initialHobbies, 
  initialTools, 
  initialPhotos 
} from '../data/initialData';

// Helper function to save data to localStorage
const saveData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data for ${key}:`, error);
  }
};

// Helper function to load data from localStorage
const loadData = <T>(key: string, defaultData: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultData;
  } catch (error) {
    console.error(`Error loading data for ${key}:`, error);
    return defaultData;
  }
};

// Data storage and retrieval functions
export const getSiteConfig = (): SiteConfig => {
  return loadData<SiteConfig>('siteConfig', initialSiteConfig);
};

export const saveSiteConfig = (config: SiteConfig): void => {
  saveData('siteConfig', config);
};

export const getSkills = (): SkillItem[] => {
  return loadData<SkillItem[]>('skills', initialSkills);
};

export const saveSkills = (skills: SkillItem[]): void => {
  saveData('skills', skills);
};

export const getExperience = (): ExperienceItem[] => {
  return loadData<ExperienceItem[]>('experience', initialExperience);
};

export const saveExperience = (experience: ExperienceItem[]): void => {
  saveData('experience', experience);
};

export const getProjects = (): ProjectItem[] => {
  return loadData<ProjectItem[]>('projects', initialProjects);
};

export const saveProjects = (projects: ProjectItem[]): void => {
  saveData('projects', projects);
};

export const getHobbies = (): HobbyItem[] => {
  return loadData<HobbyItem[]>('hobbies', initialHobbies);
};

export const saveHobbies = (hobbies: HobbyItem[]): void => {
  saveData('hobbies', hobbies);
};

export const getTools = (): ToolItem[] => {
  return loadData<ToolItem[]>('tools', initialTools);
};

export const saveTools = (tools: ToolItem[]): void => {
  saveData('tools', tools);
};

export const getPhotos = (): PhotoItem[] => {
  return loadData<PhotoItem[]>('photos', initialPhotos);
};

export const savePhotos = (photos: PhotoItem[]): void => {
  saveData('photos', photos);
};

// Helper for adding a new section
export const addSection = (
  sectionType: string, 
  title: string
): SectionConfig => {
  const config = getSiteConfig();
  const newSection: SectionConfig = {
    id: `section-${Date.now()}`,
    title: title,
    type: sectionType as any,
    visible: true,
    order: config.sections.length + 1,
  };
  
  // Add the new section
  config.sections.push(newSection);
  saveSiteConfig(config);
  
  return newSection;
};

// Helper for removing a section
export const removeSection = (sectionId: string): void => {
  const config = getSiteConfig();
  config.sections = config.sections.filter(section => section.id !== sectionId);
  saveSiteConfig(config);
};

// Helper for updating a section
export const updateSection = (section: SectionConfig): void => {
  const config = getSiteConfig();
  const index = config.sections.findIndex(s => s.id === section.id);
  if (index !== -1) {
    config.sections[index] = section;
    saveSiteConfig(config);
  }
};

// Helper for reordering sections
export const reorderSections = (sections: SectionConfig[]): void => {
  const config = getSiteConfig();
  config.sections = sections.map((section, index) => ({
    ...section,
    order: index + 1
  }));
  saveSiteConfig(config);
};