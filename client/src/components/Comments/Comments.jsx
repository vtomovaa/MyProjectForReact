import { useEffect, useReducer } from "react";
import { useForm } from "../../hooks/useForm.js";
import reducer from "./reducer.js";
import * as commentService from "../../services/commentService.js";
import "./Comments.css";
import { NavLink } from "react-router-dom";
import Path from "../../paths.js";

const Comments = ({ id, email, isAuthenticated }) => {
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

  return (
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
      <div className="comments-section">
        {comments.length === 0
          ? "No comments"
          : comments.map(({ _id, text, owner: { email } }) => (
              <div key={_id} className="comment">
                <h4>
                  {email}: {text}
                </h4>
              </div>
            ))}
      </div>
      <div className="buttons">
            {isAuthenticated ? (
              <button onClick={onSubmit}>Add Comment</button>
            ) : (
              <NavLink to={Path.Login}>
                <button>Log in first</button>
              </NavLink>
            )}
      </div>
    </article>
  );
};

export default Comments;
