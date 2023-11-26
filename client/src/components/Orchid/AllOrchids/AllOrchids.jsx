import React from 'react';
import OrchidDetailsCard from '../OrchidDetailsCard/OrchidDetailsCard.jsx';
import "./AllOrchids.css";
import orchids from "../../../../../server/data/orchids.json";

const AllOrchids = () => {
   
  return (
    <div className="allOrchidsContainer">
      <div className="title">
        {orchids ? (
          <h1>Learn more about orchids</h1>
        ) : orchids.length === 0 ? (
          <h1>NO ORCHIDS ADDED!</h1>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      {orchids && (
        <section className='orchidsSection'>
          {orchids.map((orchid) => (
            <OrchidDetailsCard key={orchid._id} {...orchid} />
          ))}
        </section>
      )}
      {!orchids && (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {orchids && orchids.length > 10 && (
        <div className="pagination">
          {/* Assuming 'pagination-controls' and 'paginator' are part of your pagination component */}
          <pagination-controls className="paginator" onPageChange={onPageChange}></pagination-controls>
        </div>
      )}
    </div>
  );
};

export default AllOrchids;
