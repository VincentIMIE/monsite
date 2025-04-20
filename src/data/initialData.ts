import { 
  SiteConfig, 
  SkillItem, 
  ExperienceItem, 
  ProjectItem, 
  HobbyItem, 
  ToolItem, 
  PhotoItem 
} from '../types';

// Initial site configuration
export const initialSiteConfig: SiteConfig = {
  name: "John Doe",
  title: "Web Developer & Designer",
  subtitle: "Building beautiful, functional websites and applications",
  sections: [
    {
      id: "skills",
      title: "Skills",
      type: "skills",
      visible: true,
      order: 1
    },
    {
      id: "experience",
      title: "Experience",
      type: "experience",
      visible: true,
      order: 2
    },
    {
      id: "projects",
      title: "Projects",
      type: "projects",
      visible: true,
      order: 3
    },
    {
      id: "tools",
      title: "Tools",
      type: "tools",
      visible: true,
      order: 4
    },
    {
      id: "hobbies",
      title: "Hobbies",
      type: "hobbies",
      visible: true,
      order: 5,
      parallaxEnabled: true
    },
    {
      id: "photos",
      title: "Photography",
      type: "photos",
      visible: true,
      order: 6
    }
  ]
};

// Initial skills data
export const initialSkills: SkillItem[] = [
  { id: "1", name: "HTML5", level: 5 },
  { id: "2", name: "CSS3", level: 5 },
  { id: "3", name: "JavaScript", level: 4 },
  { id: "4", name: "React", level: 4 },
  { id: "5", name: "TypeScript", level: 3 },
  { id: "6", name: "Node.js", level: 3 },
  { id: "7", name: "UI/UX Design", level: 4 },
  { id: "8", name: "Responsive Design", level: 5 }
];

// Initial experience data
export const initialExperience: ExperienceItem[] = [
  {
    id: "1",
    title: "Senior Web Developer",
    company: "Tech Solutions Inc.",
    location: "Paris, France",
    startDate: "2020-01",
    endDate: "Present",
    description: "Leading development of web applications using modern JavaScript frameworks. Managing a team of 5 developers and coordinating with design and product teams.",
    skills: ["React", "TypeScript", "Node.js"]
  },
  {
    id: "2",
    title: "Web Developer",
    company: "Creative Agency",
    location: "Lyon, France",
    startDate: "2017-06",
    endDate: "2019-12",
    description: "Developed responsive websites for various clients. Worked closely with designers to implement pixel-perfect designs.",
    skills: ["HTML", "CSS", "JavaScript", "WordPress"]
  },
  {
    id: "3",
    title: "Junior Developer",
    company: "Startup Studio",
    location: "Marseille, France",
    startDate: "2015-09",
    endDate: "2017-05",
    description: "Assisted in development of web applications. Learned modern web development practices and tools.",
    skills: ["HTML", "CSS", "JavaScript", "PHP"]
  }
];

// Initial projects data
export const initialProjects: ProjectItem[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A complete e-commerce solution with product management, cart functionality, and payment processing.",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://example.com/project1",
    technologies: ["React", "Node.js", "MongoDB"]
  },
  {
    id: "2",
    title: "Portfolio Generator",
    description: "A tool for creatives to easily build and deploy professional portfolios without coding knowledge.",
    image: "https://images.pexels.com/photos/12883026/pexels-photo-12883026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://example.com/project2",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS"]
  },
  {
    id: "3",
    title: "Task Management App",
    description: "A collaborative task management tool with real-time updates and team functionality.",
    image: "https://images.pexels.com/photos/6956323/pexels-photo-6956323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "https://example.com/project3",
    technologies: ["React", "Redux", "Express", "PostgreSQL"]
  }
];

// Initial hobbies data
export const initialHobbies: HobbyItem[] = [
  {
    id: "1",
    name: "Photography",
    description: "Capturing landscapes and urban scenes with my DSLR.",
    image: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "2",
    name: "Hiking",
    description: "Exploring mountain trails and enjoying nature.",
    image: "https://images.pexels.com/photos/917510/pexels-photo-917510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: "3",
    name: "Reading",
    description: "Science fiction and technology books are my favorites.",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

// Initial tools data
export const initialTools: ToolItem[] = [
  { id: "1", name: "VS Code", description: "My primary code editor", proficiency: 5 },
  { id: "2", name: "Git", description: "Version control system", proficiency: 4 },
  { id: "3", name: "Figma", description: "Design and prototyping tool", proficiency: 4 },
  { id: "4", name: "Adobe Photoshop", description: "Image editing software", proficiency: 3 },
  { id: "5", name: "Docker", description: "Container platform", proficiency: 3 }
];

// Initial photos data
export const initialPhotos: PhotoItem[] = [
  {
    id: "1",
    title: "Mountain Sunset",
    url: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Beautiful sunset over the mountains"
  },
  {
    id: "2",
    title: "Urban Architecture",
    url: "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Modern building in downtown"
  },
  {
    id: "3",
    title: "Beach at Dawn",
    url: "https://images.pexels.com/photos/1249586/pexels-photo-1249586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Early morning at the coastline"
  },
  {
    id: "4",
    title: "Forest Path",
    url: "https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Peaceful trail through the woods"
  }
];