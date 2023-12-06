import OrchidDetailsCard from "../OrchidDetailsCard/OrchidDetailsCard.jsx";
import "./AllOrchids.css";
import orchids from "../../../../../server/data/orchids.json";
import { useEffect } from "react";
import { useOrchidsData } from "../../../hooks/useOrchidsData.js";

const AllOrchids = () => {
  const { orchidsData, fetchOrchids } = useOrchidsData();

  useEffect(() => {
    fetchOrchids();
  }, []);

  return (
    <div className="allOrchidsContainer">
      <div className="title">
        {orchids ? (
          <h1>Learn more about orchids</h1>
        ) : (
          <h1>NO ORCHIDS ADDED!</h1>
        )}
      </div>
      {orchidsData && (
        <section className="orchidsSection">
          {orchidsData.map((orchid) => (
            <OrchidDetailsCard key={orchid._id} {...orchid} />
          ))}
        </section>
      )}
    </div>
  );
};

export default AllOrchids;
