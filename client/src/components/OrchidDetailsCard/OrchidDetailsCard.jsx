import React from 'react';
import { Link } from 'react-router-dom';
import "./OrchidDetailsCard.css";

const OrchidDetailsCard = ({ orchid }) => {
  return (
    <article>
      {orchid?.imageUrl && (
        <div className="image">
          <img src={orchid?.imageUrl} className="uploadedImage" alt="no-img" />
          {/* <img src={orchid?.imageUrl.includes('res.cloudinary.com') ? orchid?.imageUrl : ''} alt="no-img" /> */}
        </div>
      )}

      <div className="info">
        <h1>{orchid?.name}</h1>
        <Link to={`/all-orchids/${orchid?._id}`}>Details</Link>
      </div>
    </article>
  );
};

export default OrchidDetailsCard;
