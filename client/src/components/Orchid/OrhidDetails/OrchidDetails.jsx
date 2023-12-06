import { useContext, useReducer } from "react";
import "./OrchidDetails.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import * as orchidService from "../../../services/orchidService.jsx";
import Path from "../../../paths.js";
import { useEffect } from "react";
import { useOrchidsData } from "../../../hooks/useOrchidsData.js";
import { useForm } from "../../../hooks/useForm.js";
import reducer from "./reducer.js";
import * as commentService from "../../../services/commentService.js";

const OrchidDetails = () => {
  useEffect(() => {
    fetchOrchids();
  }, []);

  const navigate = useNavigate();
  const params = useParams();
  const { fetchOrchids, getOrchidById, isInEditMode } = useOrchidsData();
  const { email } = useContext(AuthContext);
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

  const addCommentHandler = async (values) => {
    const newComment = await commentService.create(id, values.comment);

    newComment.owner = { email };

    dispatch({
      type: "ADD_COMMENT",
      payload: newComment,
    });
  };

  const { values, onChange, onSubmit } = useForm(addCommentHandler, {
    comment: "",
  });

  const [comments, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    commentService.getAll(id).then((result) => {
      dispatch({
        type: "GET_ALL_COMMENTS",
        payload: result,
      });
    });
  }, [id]);
  console.log(comments);
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

          <article className="orchid">
            
            <form onSubmit={onSubmit}>
              <label htmlFor="summary">Comments:</label>
              <textarea
                name="comment"
                className=" add-form-input form-textarea add-comment"
                placeholder="Add comment..."
                value={values.comment}
                onChange={onChange}
              ></textarea>
            </form>
            <div>
            {comments.length === 0 ? "No comments" :
              comments.map(({ _id, text, owner: { email } }) => (
                <div key={_id} className="comment">
                  <h4>
                   
                    {email}: {text}
                  </h4>
                </div>
              ))
}
            </div>
            <div className="buttons">
              <button onClick={onSubmit}>Add Comment</button>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default OrchidDetails;
