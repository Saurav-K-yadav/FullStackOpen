import { useState } from "react";

const Blog = ({ blog,user }) => {
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
    console.log(blog)
  }

  const Displayer = () => {
    let currUser="SAURAV"; 
    if (blog.user==undefined) {
      currUser=user
    }
    else {
    currUser= blog.user.name 
    }
    return (<div>
    Added by : {currUser}
    </div>
    )
  }

  const viewbtn = {display:view?'none':''}
  return (
  <div style={blogStyle}>
      
      {blog.title} {'   '}
      <button onClick={toggler} style={viewbtn}>View Details</button>
      <div style={hideDetails}>
        Author : {blog.author}
        <br />
        URL : {blog.url}
       <br />
        Likes : {blog.likes}
        <br />
        <Displayer key={ Math.random()} />
        <br />
      <button onClick={toggler}>hideDetails</button>
      </div>
  </div>  
)}

export default Blog