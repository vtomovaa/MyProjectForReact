import { useContext, useEffect, useReducer, useState } from "react";
import { useForm } from "../../hooks/useForm.js";
import reducer from "./reducer.js";
import * as commentService from "../../services/commentService.js";
import * as orchidService from "../../services/orchidService.js";
import "./Comments.css";
import { NavLink, useParams } from "react-router-dom";
import Path from "../../paths.js";
import AuthContext from "../../context/AuthContext.jsx";

const Comments = ({ id, loggedInUser, isAuthenticated }) => {
  const { email } = useContext(AuthContext);

  const [comments, dispatch] = useReducer(reducer, []);
  const { orchidId } = useParams();
  const [orchid, setOrchid] = useState({});

  useEffect(() => {
    orchidService.getOne(orchidId).then(setOrchid);
    commentService.getAll(orchidId).then((result) => {
      dispatch({
        type: "GET_ALL_COMMENTS",
        payload: result,
      });
    });
  }, [orchidId]);

  const addCommentHandler = async (values) => {
    try {
      const newComment = await commentService.create(orchidId, values.comment);
      newComment.owner = { email };
      dispatch({
        type: "ADD_COMMENT",
        payload: newComment,
      });
      values.comment = "";
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCommentButtonOnClick = async (commentId) => {
    try {
      const hasConfirmedDeleteComment = confirm(
        `Are you sure you want to delete this comment?`
      );

      if (hasConfirmedDeleteComment) {
        await commentService.delComment(commentId);

        dispatch({
          type: "DELETE_COMMENT",
          payload: commentId,
        });

        const filtered = comments.filter((c) => c._id !== commentId);
        return filtered;
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw Error(error);
    }
  };

  const editCommentButtonOnClick = async (commentId, idOrchid) => {
    try {
      const hasConfirmedEditComment = confirm(
        `Are you sure you want to edit this comment?`
      );

      if (hasConfirmedEditComment) {
        const newCommentText = prompt("Enter the new comment:");
        if (newCommentText !== null) {
          const editedComment = await commentService.editComment(
            idOrchid,
            commentId,
            newCommentText
          );
          dispatch({
            type: "EDIT_COMMENT",
            payload: { commentId, newCommentText },
          });
          window.location.reload(true);
          return editedComment;
        }
      }
    } catch (error) {
      console.error("Error editing comment:", error);
      throw Error(error);
    }
  };

  const { values, onChange, onSubmit } = useForm(addCommentHandler, {
    comment: "",
  });

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
                  {loggedInUser}: {text}
                </h4>
                {(email === loggedInUser || loggedInUser === orchid.owner) && (
                  <>
                    <button onClick={() => editCommentButtonOnClick(_id, id)}>
                      Edit Comment
                    </button>
                    <button onClick={() => deleteCommentButtonOnClick(_id)}>
                      Delete Comment
                    </button>
                  </>
                )}
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
