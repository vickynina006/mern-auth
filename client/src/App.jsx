import { Form, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import VerifyEmail from "./pages/verifyEmail";
import ResetPassword from "./pages/resetPassword";
import FormLayout from "./layout/formLayout";
import UserProvider from "./context/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter([
    {
      element: <Home />,
      path: "/",
    },
    {
      element: <FormLayout />,
      children: [
        {
          element: <Login />,
          path: "/login",
        },
        { element: <VerifyEmail />, path: "/verify-email" },
        { element: <ResetPassword />, path: "/reset-password" },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;
