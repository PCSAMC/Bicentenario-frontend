export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface Department {
  id: number;
  name: string;
  cities: City[];
}

export interface DepartmentsResponse {
  code: number;
  departaments: Department[];
}
