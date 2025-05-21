import axios from 'axios';
import { PostResponse } from '../types/potsData.types';


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Asegúrate de que esta URL esté configurada en tu .env
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
interface FetchPostsParams {
  search?: string;
  idUser?:number;
  type?: number;
  limit?: number;
  page?: number;
  tags?: number[];
  idEvent?: number;
  idStatus?: number;
  idCity?: number;
}

export const fetchPosts = async (
  token: string,
  params?: FetchPostsParams
): Promise<PostResponse> => {
  let url = apiClient.defaults.baseURL + '/posts';

  if (params) {
    const query = new URLSearchParams();

    if (params.search) query.append('search', params.search);
    if(params.idUser) query.append("idUser",params.idUser.toString());
    if (params.type !== undefined) query.append('type', params.type.toString());
    if (params.limit !== undefined) query.append('limit', params.limit.toString());
    if (params.page !== undefined) query.append('page', params.page.toString());
    if (params.tags?.length) query.append('tags', params.tags.join(','));
    if (params.idEvent !== undefined) query.append('idEvent', params.idEvent.toString());
    if (params.idStatus !== undefined) query.append('idStatus', params.idStatus.toString());
    if (params.idCity !== undefined) query.append('idCity', params.idCity.toString());

    const queryString = query.toString();
    if (queryString) url += `?${queryString}`;
  }

  const response = await axios.get<PostResponse>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
