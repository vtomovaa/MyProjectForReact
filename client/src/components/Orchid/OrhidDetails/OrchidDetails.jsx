import { useContext, useState } from "react";
import "./OrchidDetails.css";
import orchids from "../../../../../server/data/orchids.json";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import * as orchidService from "../../../services/orchidService.jsx";
import Path from "../../../paths.js";
import { useEffect } from "react";

const OrchidDetails = () => {
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

  const params = useParams();
  const navigate = useNavigate();
  const { email } = useContext(AuthContext);

  const [imageUrl, setImageUrl] = useState("");

  const orchid = allOrchids.filter(
    (orchid) => orchid._id === params.orchidId
  )[0];
  const inEditMode = orchid?.owner === email;

  console.log(orchid);

  const deleteButtonClickHandler = async () => {

    const hasConfirmed = confirm(
      `Are you sure you want to delete ${orchid?.make}`
    );

    if (hasConfirmed) {
      console.log(orchid?._id);
      await orchidService.remove(orchid?._id);

      navigate(Path.AllOrchids);
    }
  };

  return (
    <div className="orchid-details-container">
      {orchid && (
        <div className="orchid-details-title">
          <h1>Details Page</h1>
        </div>
      )}

      {orchid && (
        <article className="orchid">
          <div className="image">
            {<img src={orchid.imageUrl} alt="no-img" />}
          </div>
          <div className="info">
            <h1>{orchid.make}</h1>
            <h3>
              Type: <span>{orchid.type}</span>
            </h3>
            <h3>
              Description: <span>{orchid.description}</span>
            </h3>
            <div className="buttons">
              <button onClick={() => window.history.back()}>Back</button>
              {inEditMode && (
                <>
                  <NavLink to={`/all-orchids/${orchid._id}/edit`}><button>Edit</button></NavLink>
                  <button
                    onClick={
                      deleteButtonClickHandler
                    }
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default OrchidDetails;
