// types/event.types.ts

export interface Department {
    id: number;
    name: string;
  }
  
  export interface City {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    department: Department;
  }
  
  export interface Event {
    id: number;
    title: string;
    description: string;
    content: string;
    createdat: string;
    city: City;
  }
  
  export interface EventResponse {
    code: number;
    events: Event[];
  }
  
  export interface EventSelectionState {
    selectedEvent: Event | null;
    isModalOpen: boolean;
  }