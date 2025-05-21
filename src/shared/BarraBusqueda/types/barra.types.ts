// types/index.ts

export interface Notification {
    id: number;
    text: string;
    time: string;
    read: boolean;
  }
  
  export interface User {
    id: string;
    name: string;
    avatar?: string;
    role: 'visitor' | 'admin' | 'editor';
  }
  
  export interface SearchFilter {
    category?: string;
    sortBy?: 'recent' | 'oldest' | 'relevant';
    dateRange?: 'last_year' | 'last_5_years' | 'all';
  }
  
  export interface SearchResult {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    imageUrl?: string;
    url: string;
  }