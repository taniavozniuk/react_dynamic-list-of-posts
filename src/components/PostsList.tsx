import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { getPostByUserId } from '../utils/services';
import { Loader } from './Loader';

interface PostProps {
  setIsLoading: (value: boolean) => void;
  selectedUser: number | null;
  setError: (message: string) => void;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  posts: Post[];
}

export const PostsList: React.FC<PostProps> = ({
  setIsLoading,
  selectedUser,
  setError,
  setPosts,
  posts,
}) => {
  const [postsLoading, setPostsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);

      return;
    }

    setIsLoading(true);
    setPostsLoading(true);
    setError('');

    getPostByUserId(selectedUser)
      .then(data => {
        setPosts(data);
      })
      .catch(() => {
        setError('Error');
        setPosts([]);
      })
      .finally(() => {
        setIsLoading(false);
        setPostsLoading(false);
      });
  }, [selectedUser, setIsLoading, setError, setPosts]);

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      {postsLoading && <Loader />}

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link is-light"
                >
                  Open
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// <tbody>
//   <tr data-cy="Post">
//     <td data-cy="PostId">17</td>

//     <td data-cy="PostTitle">
//       fugit voluptas sed molestias voluptatem provident
//     </td>

//     <td className="has-text-right is-vcentered">
//       <button
//         type="button"
//         data-cy="PostButton"
//         className="button is-link is-light"
//       >
//         Open
//       </button>
//     </td>
//   </tr>

//   <tr data-cy="Post">
//     <td data-cy="PostId">18</td>

//     <td data-cy="PostTitle">voluptate et itaque vero tempora molestiae</td>

//     <td className="has-text-right is-vcentered">
//       <button type="button" data-cy="PostButton" className="button is-link">
//         Close
//       </button>
//     </td>
//   </tr>

//   <tr data-cy="Post">
//     <td data-cy="PostId">19</td>
//     <td data-cy="PostTitle">adipisci placeat illum aut reiciendis qui</td>

//     <td className="has-text-right is-vcentered">
//       <button
//         type="button"
//         data-cy="PostButton"
//         className="button is-link is-light"
//       >
//         Open
//       </button>
//     </td>
//   </tr>

//   <tr data-cy="Post">
//     <td data-cy="PostId">20</td>
//     <td data-cy="PostTitle">doloribus ad provident suscipit at</td>

//     <td className="has-text-right is-vcentered">
//       <button
//         type="button"
//         data-cy="PostButton"
//         className="button is-link is-light"
//       >
//         Open
//       </button>
//     </td>
//   </tr>
// </tbody>;
