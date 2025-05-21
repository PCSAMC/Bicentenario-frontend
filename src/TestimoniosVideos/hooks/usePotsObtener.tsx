
//hook
import { useEffect, useState } from 'react';
import { Post } from '../types/potsData.types';
import { fetchPosts } from '../services/potsServices';

interface UsePostsParams {
  token: string;
  filters?: {
    search?: string;
    idUser?:number;
    type?: number;
    limit?: number;
    page?: number;
    tags?: number[];
    event?: number;
    status?: number;
    city?: number;
  };
}

export const usePosts = ({ token, filters }: UsePostsParams) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const load = async () => {
    console.log('Loading posts with filters:', filters); // Debugging line
      try {
        setLoading(true);
        const res = await fetchPosts(token, filters);
        console.log('Response from fetchPosts:', filters); // Debugging line
        console.log('Response:', res); // Debugging line
        setPosts(res.posts);
        setTotal(res.total);
        setPage(res.page);
        setPages(res.pages);
      } catch (e: any) {
        setError(e.message || 'Error al obtener testimonios');
      } finally {
        setLoading(false);
      }
    };

    if (token) load();
  }, [token, JSON.stringify(filters)]);

  return { posts, loading, error, total, page, pages };
};
