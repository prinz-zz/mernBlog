import { useState } from "react";

export default function Register() {
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });
  //console.log(inputs);

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5050/api/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(inputs),
    });

    const data = await res.json();
    console.log(data);

    
    if (res.status === 200) {
      alert("Registration successfull");
    } else {
      alert("Registration failed");
    }

  };

  return (
    <div className={"auth"}>
      <h1>Register</h1>
      <form className={"register"} onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full name"
          value={inputs.fullname}
          onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
