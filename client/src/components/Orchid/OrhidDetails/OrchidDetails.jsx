import { useContext } from "react";
import "./OrchidDetails.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import * as orchidService from "../../../services/orchidService.js";
import Path from "../../../paths.js";
import { useEffect } from "react";
import { useOrchidsData } from "../../../hooks/useOrchidsData.js";
import Comments from "../../Comments/Comments.jsx";

const OrchidDetails = () => {
  useEffect(() => {
    fetchOrchids();
  }, []);

  const navigate = useNavigate();
  const params = useParams();
  const { fetchOrchids, getOrchidById, isInEditMode } = useOrchidsData();
  const { email, isAuthenticated } = useContext(AuthContext);
  const id = params.orchidId;
  const orchid = getOrchidById(id);
  const inEditMode = isInEditMode(orchid?.owner, email);

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
        <div className="single-card-details">
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
                    <NavLink to={`/all-orchids/${orchid._id}/edit`}>
                      <button>Edit</button>
                    </NavLink>
                    <button onClick={deleteButtonClickHandler}>Delete</button>
                  </>
                )}
              </div>
            </div>
          </article>
          <Comments
            id={id}
            loggedInUser={email}
            isAuthenticated={isAuthenticated}
          />
        </div>
      )}
    </div>
  );
};

export default OrchidDetails;
