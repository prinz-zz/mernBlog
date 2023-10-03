import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Register() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  //console.log(inputs);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await register({
        name: inputs.name,
        email: inputs.email,
        username: inputs.username,
        password: inputs.password,
      }).unwrap();
      toast.success("Registration Success, Please Login");
      navigate('/login')
    
    } catch (err) {
      toast.error(err?.data?.message || err);
    }

    // const res = await fetch("http://localhost:5050/api/users/register", {
    //   method: "POST",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify(inputs),
    // });

    // const data = await res.json();
    // console.log(data);

    // if (res.status === 200) {
    //   alert("Registration successfull");
    // } else {
    //   alert("Registration failed");
    // }
  };

  return (
    <div className={"auth"}>
      <h1>Register</h1>
      <form className={"register"} onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={inputs.name}
          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />
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
        <button className="btn" type="submit">
          Register
        </button>
      </form>

      <p className="account">
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
