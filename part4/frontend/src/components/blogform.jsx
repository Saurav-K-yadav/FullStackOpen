import { useState } from "react";

const BlogForm = ({ createBlog }) => {
   const [title, setTitle] = useState("");
   const [author, setAuthor] = useState("");
   const [url, setUrl] = useState("");
  
    const addBlog = (event) => {
      event.preventDefault()
      setTitle("");
      setUrl("");
      setAuthor('')
      console.log(author)
      const newBlog = {
        title: title,
        author: author,
        url: url,
      };

      createBlog(newBlog)
    }

  return (
    <form onSubmit={addBlog}>
      <div>
        Title
        <input
          type="text"
          name="title"
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        />
      </div>
      <div>
        Author
        <input
          type="text"
          name="author"
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
        />
      </div>
      <div>
        URL
        <input
          type="text"
          name="url"
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm