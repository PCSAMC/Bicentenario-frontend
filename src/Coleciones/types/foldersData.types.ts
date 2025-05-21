export interface CreateFolderDataEnviar{
    idUser:number;
    name : string;
}

export interface CreateFolderResponse{
    code : number ;
    message : string;
    folderSaved : folderSaved
}

export interface folderSaved{
    id : number ;
    name : string ;
    createdAt : number 

}

export interface GetFolderEnviar {
    idUser : number;
}

export interface GetFolderResponse{
    code : number ;
    message : string;
    folders : folderSaved
}