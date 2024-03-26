import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Alert,
  Spinner,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { HiInformationCircle } from "react-icons/hi";
import OAuth from '../components/OAuth';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMsg("Please enter all fields");
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data.message);
      if (data.success === false) {
        return setErrorMsg(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/signin')
      }
      
    } catch (error) {
      setErrorMsg(data.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-8">
        {/* left */}
        <div className="flex-1">
          <Button gradientDuoTone="pinkToOrange">Pink to Orange</Button>
          <p className="mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            itaque repellendus omnis unde nulla. Debitis laudantium ducimus
            delectus distinctio nostrum veniam aut vel nulla illo eos. Nisi
            minima architecto a!
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="username" />
              </div>
              <TextInput
                id="username"
                type="username"
                placeholder="Username"
                //required
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                // required
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            {/* <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div> */}
            <Button
              type="submit"
              gradientMonochrome="purple"
              disabled={loading}>
              {loading ? (
                <>
                <Spinner aria-label="Medium sized spinner example" size="md" />
                <span className="p-1">Loading</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 mt-2">
            <span className="">Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Signin
            </Link>
          </div>
          {errorMsg && (
            <Alert color="failure" icon={HiInformationCircle} className="mt-5">
              {errorMsg}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
