
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  icon: string;
  gradient: string;
}

export interface Certificate {
  id: string;
  title: string;
  provider: string;
  duration: string;
  date: string;
  skills: string[];
  pdfUrl: string;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  badge: string;
  platform: string;
  description: string;
  skills: string[];
  link: string;
  icon: string;
  gradient: string;
  rank: string;
}
