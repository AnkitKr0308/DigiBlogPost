import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authservice from "../../appwrite/auth";
import { useState } from "react";
import { login } from "../../features/authSlice";
import Input from "../Input/Input";
import Button from "../Buttons/Button";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const createAccount = async (data) => {
    try {
      const userData = await authservice.createAccount(
        data.email,
        data.password,
        data.name
      );
      if (userData) {
        const user = await authservice.getCurrentUser();
        if (user) {
          dispatch(login(user));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(createAccount)} className="space-y-4">
          <div>
            <Input
              label="Name"
              placeholder="Enter your full name"
              type="text"
              id="emanameil"
              {...register("name", { required: true })}
            />
          </div>
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
            label="Sign Up"
          />
        </form>
      </div>
    </div>
  );
}

export default Signup;
