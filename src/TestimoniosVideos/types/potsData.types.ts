export interface Departament {
    id: number;
    name: string;
  }
  
  export interface City {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    departament: Departament;
  }
  
  export interface User {
    id: number;
    name: string;
  }
  
  export interface FileData {
    id: number;
    name: string;
    route: string;
    type: string;
    size: number;
    isDeleted: boolean;
    createdAt: string;
  }
  
  export interface Tag {
    id: number;
    name: string;
  }
  
  export interface Post {
    id: number;
    title: string;
    description: string;
    stars: number;
    views: number;
    likes: number;
    dislikes: number;
    type: number;
    content: string;
    createdAt: string;
    user: User;
    city: City;
    file: FileData | null;
    tags: Tag[];
  }
  
  export interface PostResponse {
    code: number;
    posts: Post[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }
  