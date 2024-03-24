import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Signup() {
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
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="username" />
              </div>
              <TextInput
                id="username"
                type="username"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Email" />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput id="password1" type="password" required placeholder='Password'/>
            </div>
            {/* <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div> */}
            <Button type="submit" gradientMonochrome="purple">
              Submit
            </Button>
          </form>
          <div className="flex gap-2 mt-2">
            <span className="">Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
