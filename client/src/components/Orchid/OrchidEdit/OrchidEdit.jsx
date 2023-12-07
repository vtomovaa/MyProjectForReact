import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as orchidService from "../../../services/orchidService.js";
import "../OrhidDetails/OrchidDetails.jsx";
import AuthContext from "../../../context/AuthContext.jsx";

const OrchidEdit = () => {
  const params = useParams();

  const navigate = useNavigate();

  const { email } = useContext(AuthContext);

  const orchidId = params.orchidId;

  const [orchid, setOrchid] = useState({
    make: "",
    description: "",
    type: "",
    imageUrl: "",
    owner: "test",
  });

  useEffect(() => {
    orchidService.getOne(orchidId).then((result) => {
      setOrchid(result);
    });
  }, [orchidId]);

  const editOrchidSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.set("owner", email);
    const values = Object.fromEntries(formData);
    console.log(values);

    try {
      await orchidService.edit(orchidId, values);
      navigate("/all-orchids");
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setOrchid((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {orchid && (
        <div className="orchid-details-container">
          <div className="form">
            <h1 className="h1">Edit Orchid</h1>
            <form onSubmit={editOrchidSubmitHandler}>
              <label className="formTitle">Make</label>
              <input
                className="formInput"
                type="text"
                name="make"
                required
                minLength="3"
                maxLength="15"
                value={orchid.make}
                onChange={onChange}
              />
              <label className="formTitle">Type</label>
              <input
                className="formInput"
                type="text"
                name="type"
                required
                minLength="3"
                maxLength="20"
                value={orchid.type}
                onChange={onChange}
              />
              <label className="formTitle">ImageUrl</label>
              <input
                className="formInput"
                type="text"
                name="imageUrl"
                value={orchid.imageUrl}
                onChange={onChange}
              />

              <label className="formTitle">Description</label>
              <input
                className="formInput"
                type="text"
                name="description"
                required
                value={orchid.description}
                onChange={onChange}
              />

              <input
                type="submit"
                value="Edit Orchid"
                disabled={!orchid.make || !orchid.type || !orchid.description}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default OrchidEdit;
