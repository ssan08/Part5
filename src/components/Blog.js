import React from 'react'
import TogglableHide from './TogglableHide'
import blogService from '../services/blogs'

const Blog = (props) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const viewDetails = () => (
    <TogglableHide buttonLabel='view'>
      <ViewDetails />
    </TogglableHide>
  )

  function removeBlog(id) {
    if (window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}?`)) { 
      blogService.delBlog(id)
      window.alert(`${props.blog.title} by ${props.blog.author} deleted`);
      setTimeout(function () {
        document.location.reload()
      }, 2000)
    }
 
  }

  function likes() {
    var like = props.blog.likes + 1
    var uBlog = {
      author: props.blog.author,
      title: props.blog.title,
      likes: like,
      url: props.blog.url
    }
    blogService.updateBlog(props.blog.id, uBlog)
    setTimeout(function () {
      document.location.reload()
    }, 2000)
  }

  const ViewDetails = () => {
    return (
      <div style={blogStyle}>
        <p>{props.blog.title} </p>
        <p>{props.blog.url}</p>
        <p>{props.blog.likes} <button id = "like-button" onClick={() => likes()}>like</button></p>
        <p>{props.blog.author}</p>
        <button onClick={() => removeBlog(props.blog.id)}>remove</button>
      </div>
    )
  }

  const ShowBlog = (props) => {
    return (
      <div>{props.blog.title} {props.blog.author} {props.viewD}</div>
    )
  }



  return (
    <div style={blogStyle}>
      <ShowBlog blog={props.blog} viewD={viewDetails()} />
    </div>
  )
}

export default Blog 
