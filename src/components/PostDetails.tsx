import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { getCommentsByPostId } from '../utils/services';
import { Post } from '../types/Post';

interface CommentProps {
  posts: Post[];
  postId: number | null;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  error: string | null;
}

export const PostDetails: React.FC<CommentProps> = ({
  postId,
  posts,
  error,
  isLoading,
  setIsLoading,
}) => {
  const [comment, setComment] = useState<Comment[]>([]); // відображення коментарів
  const selectedPost = posts.find(post => post.id === postId); // обраний пост

  useEffect(() => {
    if (!postId) {
      return;
    }

    setIsLoading(true);
    setComment([]);

    getCommentsByPostId(postId)
      .then(data => {
        setComment(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [postId, setIsLoading]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comment.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>

          {comment.map(comments => (
            <article
              className="message is-small"
              data-cy="Comment"
              key={comments.id}
            >
              <div className="message-header">
                <a href={`mailto:${comments.email}`} data-cy="CommentAuthor">
                  {comments.name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comments.body}
              </div>
            </article>
          ))}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
          >
            Write a comment
          </button>
        </div>

        {/* <NewCommentForm /> */}
      </div>
    </div>
  );
};
