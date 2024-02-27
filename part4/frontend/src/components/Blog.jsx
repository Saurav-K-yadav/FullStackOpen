import { useState } from "react";

const Blog = ({ blog }) => {
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
}
  const viewbtn = {display:view?'none':''}
  return (
  <div style={blogStyle}>
      {blog.title} {'   '}
      <button onClick={toggler} style={viewbtn}>View Details</button>
      <div style={hideDetails}>
        Author : {blog.author}
        <br />
        URl : {blog.url}
       <br />
        Likes : {blog.likes} 
        <br />
      <button onClick={toggler}>hideDetails</button>
      </div>
  </div>  
)}

export default Blog