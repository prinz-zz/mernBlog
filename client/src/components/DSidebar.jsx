import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import {useDispatch} from "react-redux";
import { signOutSuccess } from '../redux/user/userSlice.js';

export default function DSidebar() {

  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: 'POST',
      });
      const data = await res.json();

      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signOutSuccess());
      }
    
    } catch (error) {
      console.log(error.message);
    }
};

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if(tabFromUrl){
        setTab(tabFromUrl)
    }
  }, [location.search]);


  return (
    <Sidebar className='h-full w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
          <Sidebar.Item active={tab==="profile"} icon={HiUser} label={"user"} labelColor='dark' as={'div'}>
            Profile
          </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} as={'div'} onClick={handleSignout} className='cursor-pointer'>
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
