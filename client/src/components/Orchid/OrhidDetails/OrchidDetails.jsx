import { useContext, useState } from "react";
import "./OrchidDetails.css";

import orchids from "../../../../../server/data/orchids.json";
import { Navigate, useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import * as orchidService from "../../../services/orchidService.jsx";
import Path from "../../../paths.js";
import { useEffect } from "react";

const OrchidDetails = ({
  editOrchid,
  // addToFavourite,
  // removeFromFavourites,
}) => {
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
  const { email } = useContext(AuthContext);

  const [imageUrl, setImageUrl] = useState("");

  const orchid = allOrchids.filter(
    (orchid) => orchid._id === params.orchidId
  )[0];
  // const inEditMode = orchid[0]?.owner === email;
  const inEditMode = true;
  const alreadyFavourite = true;

  const deleteButtonClickHandler = async (orchidId, orchidMake) => {
    console.log(orchidId, orchidMake);
    const hasConfirmed = confirm(
      `Are you sure you want to delete ${orchidMake}`
    );

    if (hasConfirmed) {
      await orchidService.remove(orchidId);

      Navigate(Path.AllOrchids);
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
            <hr />
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
                  <button onClick={() => editOrchid(orchid, imageUrl)}>
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      deleteButtonClickHandler(orchid._id, orchid.make)
                    }
                  >
                    Delete
                  </button>
                </>
              )}
              {/* {!alreadyFavourite && (
                <button onClick={() => addToFavourite()}>
                  Add to favourite
                </button>
              )} */}
              {/* {alreadyFavourite && (
                <>
                  <button id="remove" onClick={() => removeFromFavourites()}>
                    Remove from favourites
                  </button>
                </>
              )} */}
            </div>
          </div>
        </article>
      )}
{/* 
      {inEditMode && orchid && (
        <div className="orchid-details-title">
          <h1>Edit Orchid</h1>
        </div>
      )} */}

      {inEditMode && orchid && (
        <div className="form">
          <h1 className="h1">Edit Orchid</h1>
          <form onSubmit={(e) => editOrchid(e, orchid, imageUrl)}>
            <label className="formTitle">Make</label>
            <input
              className="formInput"
              type="text"
              name="make"
              required
              minLength="3"
              maxLength="15"
              value={orchid.make}
              onChange={() => {}}
            />
            <label className="formTitle">Type</label>
            <input
              className="formInput"
              type="text"
              name="type"
              required
              minLength="2"
              maxLength="10"
              value={orchid.type}
              onChange={() => {}}
            />
            <div className="imageurl">
              <label htmlFor="ImageURL">ImageURL</label>
              <input
                type="radio"
                value="ImageURL"
                id="ImageURL"
                name="image"
                checked
                onChange={() => onChange("ImageURL")}
              />
              <label htmlFor="UploadFile" id="upload">
                UploadFile
              </label>
              <input
                type="radio"
                value="UploadFile"
                id="UploadFile"
                name="image"
                onChange={() => onChange("UploadFile")}
              />
            </div>
            <ng-container className="imageUrlContainer">
              <input
                className="formInput"
                type="text"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {imageUrl === "ImageURL" && (
                <>
                  <p className="error">
                    {imageUrl.length < 5 && "ImageUrl is required!"}
                  </p>
                  <p className="error">
                    {!imageUrl.includes("http") &&
                      imageUrl.length >= 5 &&
                      "You must give a URL!"}
                  </p>
                </>
              )}
            </ng-container>
            <label className="formTitle">Description</label>
            <input
              className="formInput"
              type="text"
              name="description"
              required
              minLength="20"
              maxLength="150"
              value={orchid.description}
              onChange={() => {}}
            />
            
            <input
              type="submit"
              value="Edit Orchid"
              disabled={
                !orchid.make ||
                !orchid.type ||
                !orchid.description ||
                (imageUrl === "ImageURL" && !imageUrl.includes("http"))
              }
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default OrchidDetails;
