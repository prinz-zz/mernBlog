import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Alert,
  Spinner,
  Avatar,
} from "flowbite-react";

import { useState, useEffect, useRef } from "react";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DProfile() {
  const [profileImg, setProfileImg] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const fileRef = useRef();
  const [profileImgUploadProgress, setProfileImgUploadProgress] = useState(null);
  const [profileImgUploadError, setProfileImgUploadError] = useState(null);
  const [profileImgUploading, setProfileImgUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(false);
  const [updateUserError, setUpdateUserError] = useState(false);
  const { currentUser, error, loading } = useSelector(state => state.user)
  console.log(profileImgUploadProgress, profileImgUploadError);

  console.log(currentUser);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (profileImg) {
      uploadImg();
    }
  }, [profileImg]);

  //////
  const uploadImg = async () => {
    setProfileImgUploading(true);
    setProfileImgUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + profileImg.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, profileImg);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProfileImgUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setProfileImgUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setProfileImgUploadProgress(null)
        setProfileImgUploading(false);
        setProfileImg(null);
        setImageFileUrl(null);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, photo: downloadURL });
          setProfileImgUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes were made')
      return;
    }
    if(profileImgUploading){
      setUpdateUserError('Please wait image to upload')
      return;
    }
    
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message)
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileRef}
          hidden
        />
        <Avatar
          alt="User settings"
          img={imageFileUrl || currentUser.photo}
          rounded
          bordered
          color="gray"
          size="xl"
          className="cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        {profileImgUploadError && (
          <Alert color="failure">{profileImgUploadError}</Alert>
        )}
        <TextInput
          id="username"
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          id="email"
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-2">
        <div className="cursor-pointer">Delete Account</div>
        <div className="cursor-pointer">Sign Out</div>
      </div>
      {updateUserSuccess && <Alert color="success" className='mt-5'>{updateUserSuccess}</Alert>}
      {updateUserError && <Alert color="failure" className='mt-5'>{updateUserError}</Alert>}
    </div>
  );
}
