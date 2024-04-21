import '../css/createblog.css'
import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    setTitle("");
    setUrl("");
    setAuthor("");
    console.log(author);
    createBlog({
      title: title,
      author: author,
      url: url,
    });
  };

  return (
      <form onSubmit={addBlog} className="form-cointainer">
          <div>
              <div className="form-label">Title</div>

              <input
                  type="text"
                  name="title"
                  onChange={({ target }) => {
                      setTitle(target.value);
                  }}
                  id="title"
                  className="form-input"
              />
          </div>

          <div>
              <div className="form-label">Author</div>

              <input
                  type="text"
                  name="author"
                  onChange={({ target }) => {
                      setAuthor(target.value);
                  }}
                  id="author"
                  className="form-input"
              />
          </div>
          <div>
              <div className="form-label">url</div>
              <input
                  type="text"
                  name="url"
                  onChange={({ target }) => {
                      setUrl(target.value);
                  }}
                  id="url"
                  className="form-input"
              />
          </div>
          <button type="submit" id="create" className="form-submit">
              create
          </button>
      </form>
  );
};

export default BlogForm;
