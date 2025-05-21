export interface ComentarioResponseCreate {
    code: number;
    message: string;
}
export interface ComentDataEnviar{
    idPost: number;
    idUser: number;
    content: string;
} 
export interface CommentsParamsGet {
    idPost: number;
    orderByCreateAt: string;
    orderByLikes: string;
    oderByDislikes: string;

}

export interface ComentarioResponseGet {
    code: number;
    message: string;
    comments: ComentarioData[];
}

export interface ComentarioData {
    id: number;
   user: UserData;
    content: string;    
    likes: number;
    dislikes: number;
    createdAt: string;
}

export interface UserData {
   name: string;
}

export interface ResponseDataEnviar {
    idComment: number;
    idUser: number;
    content: string;

}

export interface RespuestaResponse {
    code: number;
    message: string;
}

export interface ResponseParamsGet {
    idComment: number;
}

export interface ResponseResponseGet {
    code: number;
    responses: ComentarioData[];
}
