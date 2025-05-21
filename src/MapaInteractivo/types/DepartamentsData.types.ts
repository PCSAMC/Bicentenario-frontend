export interface DepartamentDataResponse {
    code: number;
    departaments: Department[];
}

export interface Department {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    cities: City[];
}

export interface City {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}
