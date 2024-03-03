import { useState } from "react";

const Blog = ({ blog ,addLikes,removeBlog}) => {
  const [view,setView]=useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
const hideDetails = { display:view?'':'none'}

  const toggler = () => {
    setView(!view)
    // console.log(blog)
  }

  const Displayer = () => {
    let currUser="SAURAV"; 
    if (blog.user==undefined) {
      currUser=""
    }
    else {
    currUser= blog.user.name 
    }
    return (<div>
    Added by : {currUser}
    </div>
    )
  }

  const viewbtn = { display: view ? 'none' : '' }
  const increaseLike = () => {
    console.log(blog.user)
   addLikes(blog)
  }
  const deleteItem = () => {
   const confirm= window.confirm(`Delete '${blog.title}' ?`)
    if(confirm)
    {removeBlog(blog)}
  }
  return (
    <div style={blogStyle} className="displayedBlog">
      {blog.title} {"   "}
      <button onClick={toggler} style={viewbtn} id="view">
        View Details
      </button>
      <div style={hideDetails} className="view">
        Author : {blog.author}
        <br />
        URL : {blog.url}
        <br />
        Likes : {blog.likes}
        <button onClick={increaseLike} id="like">like</button>
        <br />
        <Displayer key={Math.random()} />
        <br />
        <button onClick={deleteItem}>delete blog</button>
        <br />
        <button onClick={toggler}>hideDetails</button>
      </div>
    </div>
  );}

export default Blog