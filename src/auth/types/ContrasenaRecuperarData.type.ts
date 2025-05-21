export interface PasswordDataEnviar {
    email: string;
}

export interface PasswordResponse {
    code: number;
    message: string;
    codeAuth: string;
    emailResponse:{}
}

export interface RestorePasswordEnviar {
    password: string
    email: string;
}

export interface RestorePasswordResponse {
    code: number    
    message: string
}