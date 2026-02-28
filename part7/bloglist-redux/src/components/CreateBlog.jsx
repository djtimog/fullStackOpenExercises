import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CreateBlog({ ref }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    dispatch(createBlog(newBlog));
    ref.current.toggleVisibility();
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create New</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Button variant="outline-secondary" type="submit">
            Create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CreateBlog;
