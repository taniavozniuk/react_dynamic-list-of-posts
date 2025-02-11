import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

//USERS
export const getUsers = () => {
  return client.get<User[]>('/users');
};

//POST
export const getPostByUserId = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};
