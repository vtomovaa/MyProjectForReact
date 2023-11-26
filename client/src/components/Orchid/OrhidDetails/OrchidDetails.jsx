import { useState } from "react";
import "./OrchidDetails.css";
import { useAuthContext } from "../../../context/AuthContext.jsx";

import orchids from "../../../../../server/data/orchids.json";
import { useParams } from "react-router-dom";

const OrchidDetails = ({
  isAuthor,
  errors,
  editOrchid,
  deleteOrchid,
  addToFavourite,
  removeFromFavourites,
}) => {
  const params = useParams();
  const { userEmail } = useAuthContext();

  console.log(params.orchidId);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (event) => {
    setImageUrl(event.target.value);
  };

  const orchid = orchids.filter((orchid) => orchid._id === params.orchidId);
  // const inEditMode = orchid[0]?.owner === userEmail;
  const inEditMode = true;
  const alreadyFavourite = true;
  return (
    <div className="orchid-details-container">
      {orchid && (
        <div className="title">
          <h1>Details Page</h1>
        </div>
      )}

      {orchid && (
        <article className="orchid">
          <div className="image">
            { <img src={orchid.imageUrl} alt="no-img" />}
          </div>
          <div className="info">
            {alreadyFavourite && <span className="added">&check;</span>}
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
                  <button onClick={() => deleteOrchid(orchid._id)}>
                    Delete
                  </button>
                </>
              )}
              {!alreadyFavourite && (
                <button onClick={() => addToFavourite()}>
                  Add to favourite
                </button>
              )}
              {alreadyFavourite && (
                <>
                  {/* <button id="added">Added to favourites</button> */}
                  <button id="remove" onClick={() => removeFromFavourites()}>
                    Remove from favourites
                  </button>
                </>
              )}
            </div>
            <p className="mainError">{errors}</p>
          </div>
        </article>
      )}

      {inEditMode && orchid && (
        <div className="title">
          <h1>Edit Orchid</h1>
        </div>
      )}

      {/* {inEditMode && orchid && (
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
            <p className="mainError">{errors}</p>
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
      )} */}
    </div>
  );
};

export default OrchidDetails;
