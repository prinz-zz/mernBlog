import Posts from "../components/post/Post";
import { useState, useEffect } from "react";
import { useFetchAllPostsMutation } from "../slices/postsApiSlice";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [fetchAllPosts] = useFetchAllPostsMutation();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetchAllPosts();      
      //setPosts(res);
      console.log(Object.keys(res.data));
    };
    fetchPost();
  }, []);
  console.log(posts);

  return (
    <h1>Home</h1>
  )
}
