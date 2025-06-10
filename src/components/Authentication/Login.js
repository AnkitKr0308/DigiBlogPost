import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as AuthLogin } from "../../features/authSlice";
import authservice from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import Button from "../Buttons/Button";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const loginUser = async (data) => {
    try {
      const userData = await authservice.login(data.email, data.password);
      if (userData) {
        const user = await authservice.getCurrentUser();
        if (user) {
          dispatch(AuthLogin(userData));
          navigate("/");
        } else {
          navigate("/Signup");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className=" w-screen flex  justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md   items-center">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form
          onSubmit={handleSubmit(loginUser)}
          className="space-y-4 flex flex-col items-center w-full"
        >
          <Input
            className="w-72"
            label="Email"
            placeholder="Enter your email"
            type="email"
            id="email"
            {...register("email", { required: true })}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            id="password"
            {...register("password", { required: true })}
            required
          />
          <Button
            type="submit"
            className="bg-blue-600 text-white py-1.5 px-3 rounded-md hover:bg-blue-700 transition duration-200 w-20"
            label="Login"
          >
            Login
          </Button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/Signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
