import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';
import { client } from './fetchClient';

//USERS
export const getUsers = () => {
  return client.get<User[]>('/users');
};

//POST
export const getPostByUserId = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

//COMMENTS
export const getCommentsByPostId = (postId: number) => {
  return client.get<Comment[]>(`/posts?userId=${postId}`);
};
