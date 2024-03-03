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
      createBlog({
        title: title,
        author: author,
        url: url,
      })
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
         id="title"/>
      </div>
      <div>
        Author
        <input
          type="text"
          name="author"
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
        id="author"/>
      </div>
      <div>
        URL
        <input
          type="text"
          name="url"
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        id="url"/>
      </div>
      <button type="submit" id="create">create</button>
    </form>
  );
};

export default BlogForm