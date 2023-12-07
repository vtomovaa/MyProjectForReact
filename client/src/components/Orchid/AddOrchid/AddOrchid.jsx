import { useNavigate } from "react-router-dom";
import * as orchidService from "../../../services/orchidService.js";
import "./AddOrchid.css";
import Path from "../../../paths.js";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext.jsx";

const AddOrchird = () => {
  const { email } = useContext(AuthContext);

  const navigate = useNavigate();

  const addOrchidHandler = async (e) => {
    e.preventDefault();
    const randomId = Math.random().toString(36).substr(2, 9);

    const orchidData = {
      _id: randomId,
      owner: email,
      ...Object.fromEntries(new FormData(e.currentTarget)),
    };

    try {
      await orchidService.create(orchidData);
      navigate(Path.AllOrchids);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-orchid-container">
      <div className="add-orchid-form">
        <h1 className="add-orchid-label">Add Orchid</h1>
        <form onSubmit={addOrchidHandler}>
          <label className="add-form-title">Make</label>
          <input
            className="add-form-input"
            type="text"
            name="make"
            placeholder="Enter orchid make..."
            required
            minLength="3"
            maxLength="15"
          />

          <label className="sign-label">Image(optional)</label>
          <input className="add-form-input" type="text" name="imageUrl" placeholder="Enter orchid imageUrl..."/>

          <label className="add-form-title">Orchid Type</label>
          <input
            className="add-form-input"
            type="text"
            name="type"
            placeholder="Enter orchid type..."
            required
            minLength="3"
            maxLength="20"
          />

          <label htmlFor="summary">Description:</label>
          <textarea
            name="description"
            className=" add-form-input form-textarea"
            placeholder="Enter orchid summary..."
          ></textarea>

          <input className="add-form-input" type="submit" value="Add Orchid" />
        </form>
      </div>
    </div>
  );
};

export default AddOrchird;
