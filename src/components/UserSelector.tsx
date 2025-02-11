import React, { useEffect, useState } from 'react';
import { getUsers } from '../utils/services';
import { User } from '../types/User';

interface UserProps {
  selectedUser: string | null;
  handleUserSelect: (userId: number) => void;
  openUser: boolean;
  setOpenUser: React.Dispatch<React.SetStateAction<boolean>>;
  setError: (message: string) => void;
}

export const UserSelector: React.FC<UserProps> = ({
  selectedUser,
  handleUserSelect,
  openUser,
  setOpenUser,
  // setError,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(data => {
      setUsers(data);
    });
  }, []);

  // перемикаю статус
  const toggleDropDown = () => {
    setOpenUser(prevState => !prevState);
  };

  return (
    <div
      data-cy="UserSelector"
      className={`dropdown ${openUser ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropDown}
        >
          {/* відобаражаю користувача */}
          <span>
            {selectedUser
              ? users.find(user => user.id === Number(selectedUser))?.name ||
                'User  not found'
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className="dropdown-item"
                onClick={() => handleUserSelect(user.id)}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
