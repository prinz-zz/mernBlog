import { useState } from "react";
import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
//import Editor from "../components/Editor";
import { useCreatePostMutation } from "../slices/usersApiSlice";
import { useSelector } from 'react-redux';

export default function CreatePost() {
  const [value, setValue] = useState("");
  const [inputs, setInputs] = useState({
    title: "",
    summary: "",
    content: "",
    files: "",
  });

  const { user }= useSelector((state)=> state.auth)
  console.log(user.username);
  const [createPost] = useCreatePostMutation();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const res = await createPost({
        username: user.username,
        title,
        summary,
        content,
      })
      
    } catch (error) {
      
    }
  };

  return (
    <form onSubmit={handleCreatePost}>
      <input
        type="text"
        value={inputs.title}
        onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
        placeholder="Title"
      />

      <input
        type="text"
        value={inputs.summary}
        onChange={(e) => setInputs({ ...inputs, summary: e.target.value })}
        placeholder="Summary"
      />

      <input
        type="file"
        onChange={(e) => setInputs({ ...inputs, files: e.target.files })}
      />

      <textarea
        rows="4"
        value={inputs.content}
        onChange={(e) => setInputs({ ...inputs, content: e.target.value })}
        placeholder="Write here..."></textarea>

      {/* <ReactQuill
      value={inputs.content}      
      onChange={(e)=> setInputs({...inputs, content: e.target.value})}
      />
       */}

      <button type="submit" className="btn">
        Create Post
      </button>
    </form>
  );
}
