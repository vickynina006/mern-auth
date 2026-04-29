import Header from "../components/header";
import { useContext } from "react";
import { userContext } from "../context/userContext";

const Home = () => {
  const { user, isAuthenticated } = useContext(userContext);
  return (
    <>
      <Header />
      <section className="text-gray-200 pb-20 pt-28 px-10 flex flex-col items-center gap-8 ">
        <h1 className="text-[1.8rem] font-bold md:text-3xl text-center">
          {user ? `Hello ${user.name}👋🏼` : "Hello Developer👋🏼"}
        </h1>
        <h2 className="text-4xl font-bold text-center md:text-5xl">
          Welcome to Authra 
        </h2>
        <p className="max-w-full text-center text-xl text-gray-300 lg:max-w-5xl">
          Your trusted partner in authentication and user security. Authra provides reliable and scalable solutions to help you manage identities, protect user data, and build with confidence, so your applications run smoothly and securely at every step.
        </p>
        <button className="px-5 py-2 outline-1 outline-white rounded-full hover:bg-gray-700 transition-colors">
          Get Started
        </button>
      </section>
    </>
  );
};

export default Home;
