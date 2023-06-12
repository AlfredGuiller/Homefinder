import React, { useState, useEffect } from 'react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ProfileIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleIconClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogoutClick = async () => {
    if (!user) {
      console.error('User data is not available. Logout cannot be performed.');
      return;
    }
  
    try {
      const response = await fetch(`https://c868-136-158-25-84.ngrok-free.app/v1/test/sign-out/${encodeURIComponent(user.email)}`, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': '*',
          'ngrok-skip-browser-warning':  true
         
        },
      });
      const data = await response.json();
      if (data.success) {
        // Logout successful, redirect to home page
        router.push('/');
      } else {
        console.error('Logout failed:', data.message);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://c868-136-158-25-84.ngrok-free.app/v1/test/User-fetching', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': '*',
          'ngrok-skip-browser-warning':  'true'
        },} ); 
      const data = await response.json();
      setUser(data[0]);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  return (
    <div className="profile-icon-container">
      <div
        className={`profile-icon ${isHovered ? 'hovered' : ''}`}
        onClick={handleIconClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <  FaUser className="user-icon" />
      </div>

      {isProfileOpen && (
        <div className="profile-view">
          <div className="profile-options">
            <h3 className="name-postion">{user.firstName}</h3>

            <Link  href={`/${user.userType}`}>
              <button  className="home-postion">Home</button>
            </Link>

            <Link href="./profileview">
              <button>Profile Dashboard</button>
            </Link>

            <button onClick={handleLogoutClick}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}
      

      <style jsx>{`

.home-postion{
  margin-left: 15px;
}
.name-postion{
  color: blue;
  
  display: flex;
}

      
        .profile-icon-container {
          position: fixed;
          top: 20px;
          right: 20px;
          
          z-index: 999;
        }

        .profile-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height:60px;
          border-radius: 50%;
          background-color: black;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .profile-icon.hovered {
          background-color: #ccc;
        }

        .profile-view {
          position: absolute;
          top: 50px;
          right: 0;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 8px;
          z-index: 1;
        }

        .profile-options button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .profile-options button:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default ProfileIcon;
