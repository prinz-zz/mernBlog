import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Alert,
  Spinner,
  Avatar
} from "flowbite-react";
import { useSelector } from 'react-redux';


export default function DProfile() {

    const {photo, username, email} = useSelector(state => state.user.currentUser)
    console.log(username);

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>


      <form className='flex flex-col gap-6'>       
        <Avatar alt="User settings" img={photo} rounded bordered color="gray" size="xl"/>        
        <TextInput
          id="username"
          type="text"
          placeholder="Username"
          defaultValue={username}          
        />
        <TextInput
          id="email"
          type="email"
          placeholder="Email"
          defaultValue={email}        
        />
        <TextInput
          id="password"
          type="password"
          placeholder="Password"   
        />
        <Button gradientDuoTone="purpleToBlue" outline>Update</Button>
      </form>
      <div className="text-red-500 flex justify-between mt-2">
        <div className="cursor-pointer">Delete Account</div>
        <div className="cursor-pointer">Sign Out</div>
      </div>
    </div>
  );
}
