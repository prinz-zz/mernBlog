import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
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
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/signin">
          <Button gradientDuoTone="cyanToBlue" outline>Sign in</Button>
        </Link>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
}
