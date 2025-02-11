import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useState } from 'react';
import { Post } from './types/Post';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null); // вибраний користувач
  const [openUser, setOpenUser] = useState(false); // для вікритя користувачів
  const [error, setError] = useState(''); // помилка
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]); // відображення постів

  const handleUserSelect = (userId: number) => {
    setSelectedUser(userId);
    setOpenUser(false);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  handleUserSelect={handleUserSelect}
                  selectedUser={selectedUser}
                  openUser={openUser}
                  setOpenUser={setOpenUser}
                  setError={setError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {posts.length === 0 && !isLoading && selectedUser && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
{/*
                {posts.length > 0 && selectedUser && (

                  )} */}
                <PostsList
                  setPosts={setPosts}
                  posts={posts}
                  setIsLoading={setIsLoading}
                  selectedUser={selectedUser}
                  setError={setError}
                  // isLoading={isLoading}
                />
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              'Sidebar--open',
            )}
          >
            <div className="tile is-child box is-success">
              <PostDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
