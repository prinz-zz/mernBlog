import { useState } from "react";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  console.log(inputs);
  const handleLogin = (e) => {
    e,preventDefault()

  };

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
    </div>
  );
}
