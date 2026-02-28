import React, { useState } from "react";
import { addCommentToBlog } from "../reducers/blogs";
import { useDispatch } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Comments({ id, comments }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCommentToBlog(id, comment));

    setComment("");
  };
  return (
    <div>
      <h5>comments</h5>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            type="text"
            placeholder="i love this blog"
          />
        </Form.Group>
        <Form.Group>
          <Button variant="success" type="submit">
            Add Comment
          </Button>
        </Form.Group>
      </Form>
      <ListGroup className="mt-3">
        {comments.map((comment, index) => (
          <ListGroup.Item key={index}>{comment.message}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Comments;
