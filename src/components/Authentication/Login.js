import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as AuthLogin } from "../../features/authSlice";
import authservice from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Buttons";

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
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(loginUser)} className="space-y-4">
          <div>
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
          </div>
          <div>
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              id="password"
              {...register("password", { required: true })}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            label="Login"
          />
        </form>
        <p className="mt-4">
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
