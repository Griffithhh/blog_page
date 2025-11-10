import ky from 'ky';
import { Blog } from '@/types';

export const api = ky.create({
  prefixUrl: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Получение всех блогов
export const getBlogs = async (): Promise<Blog[]> =>
  api.get('blogs').json<Blog[]>();

// Получение одного блога по id
export const getBlogById = async (id: string): Promise<Blog> =>
  api.get(`blogs/${id}`).json<Blog>();

// Добавление нового блога
export const addBlog = async (blog: Omit<Blog, 'id'>): Promise<Blog> => {
  console.log('addBlog sending:', blog);
  const data = await api.post('blogs', { json: blog }).json<Blog>();
  console.log('addBlog response:', data);
  return data;
};
