import { useState } from "react";

export default function Register() {
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });

  return (
    <div className={"auth"}>
      <h1>Register</h1>
      <form className={"register"}>
        <input type="text" placeholder="Full name" value />
        <input type="text" placeholder="email" />
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
