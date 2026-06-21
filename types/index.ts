export interface Project {
  slug: string;
  title: string;
  description: string;
  status: string;
  stack?: string[];
  content: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
}
