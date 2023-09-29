import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const { user } = useSelector((state) => state.auth);
  console.log(user);



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username :inputs.username, password: inputs.password });
      const data = await res.data
      console.log(data);
      dispatch(setCredentials({ ...res }));      
      navigate("/");
    } catch (err) {
      console.log(err);
    }

    
  
    // const res = await fetch(`http://localhost:5050/api/login`, {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(inputs),
    // });

    // const data = await res.json();
    // console.log(data);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className={"auth"}>
      <h1>Login</h1>
      <form className={"register"} onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={inputs.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      <p className="account">
        New user?
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
