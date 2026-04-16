import Header from "../components/header";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <header className="py-4 px-10 bg-gray-800 text-white flex items-center justify-between md:px-16">
        <h1 className="text-2xl font-bold">
          ACCOUNTS&<span className="text-amber-400">PARTNERS</span>
        </h1>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
