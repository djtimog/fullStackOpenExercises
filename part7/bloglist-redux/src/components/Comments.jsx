import React, { useState } from "react";
import { addCommentToBlog } from "../reducers/blogs";
import { useDispatch } from "react-redux";

function Comments({id, comments }) {
  const [comment, setComment] = useState();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCommentToBlog(id, comment));
    console.log("Adding comment:", comment);
  };
  return (
    <div>
      <h4>comments</h4>

      <form onSubmit={handleSubmit}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button>Add Comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment}</li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
