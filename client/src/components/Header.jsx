import { Button, Navbar, TextInput, Dropdown, Avatar } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";

export default function Header() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <Navbar className="border-b-2">
      <Button gradientDuoTone="pinkToOrange">Pink to Orange</Button>
      <TextInput
        type="text"
        placeholder="Search"
        rightIcon={AiOutlineSearch}
        className="hidden lg:inline"
      />
      <Button className="h-10 w-12 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-4 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}>
          {theme === "light" ? (
            <FaMoon className="focus:outline-none"/>
          ) : (
            <FaSun className="focus:outline-none" />
          )}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img={currentUser.photo} rounded />
            }>
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block truncate text-sm font-medium">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button gradientDuoTone="cyanToBlue" outline>
              Sign in
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
}
