export interface UserDataEnviar {
    id : number;
}

export interface UserData {
    id: number;
    name: string;
    email: string;
    password: string;
    age: number;
    role : role
    strikes : number;
    createdAt: string;
}

export interface role {
    id: number;
    name: string;
}

export interface UserDataResponse {
    code: number;
    message: string;
    user: UserData;
}