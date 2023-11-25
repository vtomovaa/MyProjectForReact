import React from 'react';
import OrchidDetailsCard from '../OrchidDetailsCard/OrchidDetailsCard.jsx';
import "./AllOrchids.css";
//import orchids from "../../../../server/data/orchids.json";

const AllOrchids = () => {
    const orchids = [
            {
                "name": "My Dendrobium",
                "owner": "peter@abv.bg",
                "make": "My Dendrobium",
                "type": "Dendrobium",
                "imageUrl": "https://www.allaboutgardening.com/wp-content/uploads/2023/02/Dendrobium-Orchid-Growing-in-Garden.jpg",
                "description": "These extraordinarily beautiful plants grow in all climates from hot and humid lowlands to high and cool mountains.",
                "base64": [],
                "addedBy": ["peter@abv.bg"]
            },
            {
                "name": "My Cattleya",
                "owner": "peter@abv.bg",
                "make": "My Cattleya",
                "type": "Cattleya",
                "imageUrl": "https://www.orchidroots.com/static/utils/images/hybrid/hyb_000013793_100991307.jpg",
                "description": " Cattleya orchids typically feature showy, fragrant flowers that come in a wide variety of shapes, colors, and color combinations.",
                "base64": [],
                "addedBy": ["peter@abv.bg"]
            }
    ];
    // Object.entries(orchids).forEach(([key, value]) => {
    //     console.log(key, value);
    //   });
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
            <OrchidDetailsCard key={orchid.name} orchid={orchid} />
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
