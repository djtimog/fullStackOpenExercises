import React from "react";
import { useState } from "react";

function CreateBlog({ createBlog, ref }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    await createBlog(newBlog);
    ref.current.toggleVisibility();
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateBlog;
