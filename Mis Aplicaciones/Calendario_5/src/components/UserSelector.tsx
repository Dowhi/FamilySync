import React from 'react';
import { User } from '../types';

interface UserSelectorProps {
  onUserSelect: (user: User) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({ onUserSelect }) => {
  const users: User[] = [
    { id: 'user1', name: 'Usuario 1', color: '#3B82F6' },
    { id: 'user2', name: 'Usuario 2', color: '#EF4444' },
    { id: 'user3', name: 'Usuario 3', color: '#10B981' },
    { id: 'user4', name: 'Usuario 4', color: '#F59E0B' },
    { id: 'user5', name: 'Usuario 5', color: '#8B5CF6' }
  ];

  return (
    <div className="user-selector">
      <div className="user-selector-header">
        <h2>Selecciona tu perfil</h2>
        <p>Elige tu usuario para acceder al calendario</p>
      </div>
      
      <div className="user-grid">
        {users.map((user) => (
          <div
            key={user.id}
            className="user-card"
            onClick={() => onUserSelect(user)}
          >
            <div 
              className="user-avatar" 
              style={{ backgroundColor: user.color }}
            >
              {user.name.charAt(0)}
            </div>
            <span className="user-name">{user.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        .user-selector {
          min-height: 100vh;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .user-selector-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .user-selector-header h2 {
          color: white;
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
          font-weight: 700;
        }

        .user-selector-header p {
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          font-size: 1rem;
        }

        .user-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          width: 100%;
          max-width: 600px;
        }

        .user-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .user-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.75rem auto;
          color: white;
          font-size: 1.25rem;
          font-weight: bold;
        }

        .user-name {
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
        }

        @media (max-width: 768px) {
          .user-selector {
            padding: 0.5rem;
          }

          .user-selector-header h2 {
            font-size: 1.5rem;
          }

          .user-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 0.75rem;
          }

          .user-card {
            padding: 1rem;
          }

          .user-avatar {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default UserSelector;
