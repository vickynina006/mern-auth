import Header from "../components/header";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 py-4 px-4 bg-gray-800 text-white flex items-center justify-between smx:px-9 md:px-16">
        <h1 className="text-lg  font-bold smx:text-xl md:text-2xl">
          ACCOUNTS&<span className="text-amber-400">PARTNERS</span>
        </h1>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
