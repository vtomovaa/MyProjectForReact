import React from 'react';
import { Link } from 'react-router-dom';
import "./OrchidDetailsCard.css";

const OrchidDetailsCard = ( props ) => {
  const {name, imageUrl, _id} = props;
  return (
    <article>
      {imageUrl && (
        <div className="image">
          <img src={imageUrl} className="uploadedImage" alt="no-img" />
          {/* <img src={orchid?.imageUrl.includes('res.cloudinary.com') ? orchid?.imageUrl : ''} alt="no-img" /> */}
        </div>
      )}

      <div className="info">
        <h1>{name}</h1>
        <button className='btns'><Link className='details-card-btn' to={`/all-orchids/${_id}`}>Details</Link></button>
      </div>
    </article>
  );
};

export default OrchidDetailsCard;
