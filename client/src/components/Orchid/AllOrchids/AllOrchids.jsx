import OrchidDetailsCard from "../OrchidDetailsCard/OrchidDetailsCard.jsx";
import "./AllOrchids.css";
import orchids from "../../../../../server/data/orchids.json";
import { useEffect, useState } from "react";
import * as orchidService from "../../../services/orchidService.jsx";

const AllOrchids = () => {
  const [allOrchids, setAllOrchids] = useState(orchids);

  useEffect(() => {
    orchidService
      .getAll()
      .then((result) =>
        setAllOrchids((prevOrchids) => [...prevOrchids, ...result])
      )
      .catch((err) => {
        console.log(err);
      });
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
      {allOrchids && (
        <section className="orchidsSection">
          {allOrchids.map((orchid) => (
            <OrchidDetailsCard key={orchid._id} {...orchid} />
          ))}
        </section>
      )}
    </div>
  );
};

export default AllOrchids;
