import Header from "../components/header";
import { Outlet } from "react-router-dom";
import logo from "../assets/authra_logo.png";
const Layout = () => {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 py-4 px-4 bg-gray-800 text-white flex items-center justify-between smx:px-9 md:px-16">
        <img className="h-8 w-28 md:h-11 md:w-36" src={logo} alt="AUTHRA" />
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
