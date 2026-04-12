import Header from "../components/header";
import { useContext } from "react";
import { userContext } from "../context/userContext";

const Home = () => {
  const { user, isAuthenticated } = useContext(userContext);
  return (
    <>
      <Header />
      <section className="text-gray-200 pb-20 pt-28 px-10 flex flex-col items-center gap-8 ">
        <h1 className="text-3xl font-bold">
          {user ? `Hello ${user.name}👋🏼` : "Hello 👋🏼"}
        </h1>
        <h1 className="text-5xl font-bold text-center ">
          Welcome to Accounts & Partner
        </h1>
        <p className="max-w-full text-center text-xl text-gray-300 lg:max-w-5xl">
          Your trusted partner in financial management and accounting services.
          We provide expert solutions to help you navigate the complexities of
          finance, ensuring your business thrives with confidence and precision.
        </p>
        <button className="px-5 py-2 outline-1 outline-white rounded-full hover:bg-gray-700 transition-colors">
          Get Started
        </button>
      </section>
    </>
  );
};

export default Home;
