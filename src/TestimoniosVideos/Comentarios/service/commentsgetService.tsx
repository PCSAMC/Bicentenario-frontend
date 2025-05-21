// post.ts
import axios from 'axios';
import { ComentarioResponseGet, CommentsParamsGet } from '../types/comentariosData.types';

// ✅ Usar import.meta.env para Vite
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const GetComments = async (
    params?: CommentsParamsGet,
  ): Promise<ComentarioResponseGet> => {
    let url = apiClient.defaults.baseURL + '/comments';
  
    if (params) {
      const query = new URLSearchParams();
  
      if (params.idPost) query.append('idPost', params.idPost.toString());
      if(params.oderByDislikes) query.append('oderByDislikes', params.oderByDislikes.toString());
    if(params.orderByLikes) query.append('orderByLikes', params.orderByLikes.toString());
    if(params.orderByCreateAt) query.append('orderByCreateAt', params.orderByCreateAt.toString());
      const queryString = query.toString();
      if (queryString) url += `?${queryString}`;
    }
  
    const response = await axios.get<ComentarioResponseGet>(url);
  
    return response.data;
  };
  