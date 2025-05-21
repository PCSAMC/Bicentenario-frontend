// types/videoTypes.ts

// Definir tipo para Ciudad
export interface City {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    departament: {
      id: number;
      name: string;
    };
  }
  
  // Definir tipo para Archivo (Video)
  export interface File {
    id: number;
    name: string;
    route: string;
    type: string;
    size: number;
    isDeleted: boolean;
    createdAt: string;
  }
  
  // Definir tipo para Etiqueta
  export interface Tag {
    id: number;
    name: string;
  }
  
  // Definir tipo para Usuario
  export interface User {
    id: number;
    name: string;
  }
  
  // Definir tipo para el Video
  export interface Video {
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
    file: File;
    tags: Tag[];
  }
  