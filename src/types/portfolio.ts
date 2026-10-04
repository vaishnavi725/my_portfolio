export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon: string;
}

export interface MetricItem {
  label: string;
  value: string;
  subtitle: string;
  icon: string;
  color?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  badge: string;
  location?: string;
  highlights: string[];
  microCerts?: string[];
  skills: string[];
  metrics?: { metric: string; label: string }[];
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  categoryTag: 'AI / ML' | 'FULL STACK' | 'CLOUD' | 'SALESFORCE' | 'IOT';
  status: string;
  isMajor?: boolean;
  period?: string;
  summary: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  stats?: ProjectStat[];
  pipelineSteps?: string[];
  visualType: 'payguard' | 'salesforce' | 'travel' | 'iot';
  details: {
    problem: string;
    solution: string;
    architecture?: string[];
    technologies: string[];
    keyFeatures: string[];
    workflowSteps?: { title: string; desc: string }[];
    contribution?: string;
  };
}

export interface SkillCategory {
  name: string;
  icon: string;
  description: string;
  skills: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  badge: string;
  highlight: string;
  description: string;
  stats?: { count: string; label: string }[];
  badgeDetails?: string;
  link?: string;
  icon: string;
  visualType: 'leetcode' | 'hyperapi' | 'sih' | 'awssummit';
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: string;
  modules: string[];
  featured?: boolean;
  description: string;
  skillsGained?: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  period: string;
  score: string;
  isCurrent: boolean;
  highlights: string[];
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  tag: string;
  icon: string;
}

export interface TechUniverseNode {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  technologies: string[];
  color: string;
}
