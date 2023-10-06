import { Link } from "react-router-dom";
import "./singlePost.css";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'

export default function SinglePost() {

    const [post, setPost] = useState({})
    const location = useLocation()
    const path = location.pathname.split("/")[2];


    useEffect(()=>{
        const getPosts = async ()=>{
        const res = await fetch(`http://localhost:5050/api/posts/${path}`)
        const data = await res.json()
        setPost(data)
        console.log(data);
        }
        getPosts()
    },[path])
    

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (<img
          className="singlePostImg"
          src={post.photo}
          alt=""
        />)}
        
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author: 
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
            {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {post.content}
        </p>
      </div>
    </div>
  );
}