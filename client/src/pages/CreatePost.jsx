import { useState } from "react";
import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
//import Editor from "../components/Editor";
import { useCreatePostMutation } from "../slices/postsApiSlice";
import { useSelector } from "react-redux";
import axios from "axios";

export default function CreatePost() {
  const [inputs, setInputs] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });

  const file = inputs.file;

  const headerImg = {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  };

  const { user } = useSelector((state) => state.auth);

  const [createPost] = useCreatePostMutation();

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title: inputs.title,
      summary: inputs.summary,
      content: inputs.content,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("http://localhost:5050/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
   

    try {
      const res = await createPost(newPost);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <img
        style={headerImg}
        src="https://cdn.pixabay.com/photo/2023/04/28/19/12/stream-7957258_1280.jpg"
        alt=""
      />
      <h2>Create Post</h2>
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
          onChange={(e) => setInputs({ ...inputs, file: e.target.files[0] })}
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
          Submit
        </button>
      </form>
    </>
  );
}
