import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext.jsx';
import "./Profile.css"

const Profile = () => {
  const { username, email, avatar } = useContext(AuthContext);
  
  return (
  <div className="my-profile-container">
    <div>
      <div className="my-profile-title">
        <h1>My Profile Info</h1>
      </div>
      <section className='my-profile-section'>
        
          <article className="userSchema">
            <img src={avatar} className="my-profile-avatarImg" />
            <div className="userSchema">
              <h3>
                Username: <span>{username}</span>
              </h3>
              <h3>
                Email: <span>{email}</span>
              </h3>
            </div>
          </article>
        
      </section>
    </div>
  </div>
  );
};

export default Profile;
