// CrearTestimonioData.types.ts

export interface CrearTestimonioData {
  title: string;
  description: string;
  idcity: number;
  typre: number;
  content: string;
  idEvent: number;
  tags: number;
  file: File; // Archivo de tipo File, que se enviará como buffer
  idUser: number;
  token: string; // Token de autenticación que es necesario para el backend
}
