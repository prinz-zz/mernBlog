import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Alert,
  Spinner,
  Avatar,
} from "flowbite-react";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';

export default function DProfile() {
  const [profileImg, setProfileImg] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const fileRef = useRef();
  const [profileImgUploadProgress, setProfileImgUploadProgress] = useState(null);
  const [profileImgUploadError, setProfileImgUploadError] = useState(null);
  console.log(profileImgUploadProgress, profileImgUploadError);

  const { photo, username, email } = useSelector(
    (state) => state.user.currentUser
  );
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() =>{
    if(profileImg){
      uploadImg()
    }
  },[profileImg])


  //////
  const uploadImg = async()=>{
   
    setProfileImgUploadError(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + profileImg.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, profileImg);

    uploadTask.on('state_changed', 
      (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProfileImgUploadProgress(progress.toFixed(0));
      },
      (error)=> {
        setProfileImgUploadError('Could not upload image (File must be less than 2MB)');
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        })
      }
    )  
  }


  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form className="flex flex-col gap-6">
        <input type="file" accept="image/*" onChange={handleImageChange} ref={fileRef} hidden/>
        <Avatar
          alt="User settings"
          img={imageFileUrl || photo}
          rounded
          bordered
          color="gray"
          size="xl"
          className="cursor-pointer"
          onClick={()=> fileRef.current.click()}
        />
        {profileImgUploadError && <Alert color="failure">{profileImgUploadError}</Alert>}
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
        <TextInput id="password" type="password" placeholder="Password" />
        <Button gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-2">
        <div className="cursor-pointer">Delete Account</div>
        <div className="cursor-pointer">Sign Out</div>
      </div>
    </div>
  );
}
