import Posts from "../components/posts/Posts";
import { useState, useEffect } from "react";
import { useFetchAllPostsMutation } from "../slices/postsApiSlice";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [fetchAllPosts] = useFetchAllPostsMutation();
  const { search } = useLocation();

  const headerImg = {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  };

  useEffect(() => {
    const fetchPost = async () => {
      //const res = await fetchAllPosts();
      const res = await fetch(`http://localhost:5050/api/posts${search}`);
      const data = await res.json();
      setPosts(data);
    };
    fetchPost();
  }, [search]);

  return (
    <>
      <img
        style={headerImg}
        src="https://cdn.pixabay.com/photo/2023/04/28/19/12/stream-7957258_1280.jpg"
        alt=""
      />
      <Posts posts={posts} />
    </>
  );
}
