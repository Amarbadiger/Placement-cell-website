import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import logo from "../assets/images/logo.png";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    setLoading(true);
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/admin/dashboard");
        message.success("Login successfully");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 to-black p-10">
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-2xl font-semibold text-gray-200">
              <img src={logo} alt="logo" className="w-48" />
            </h1>
          </Link>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 p-8 shadow-lg rounded-lg m-4">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-200">
            Login
          </h1>
          <Form layout="vertical" onFinish={onFinishHandler}>
            <Form.Item
              label={<span className="text-gray-200">Email</span>}
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                type="email"
                className="w-full bg-gray-700  border-gray-600"
              />
            </Form.Item>
            <Form.Item
              label={<span className="text-gray-200">Password</span>}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input
                type="password"
                className="w-full bg-gray-700  border-gray-600"
              />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Login"
                )}
              </button>
            </Form.Item>
          </Form>
          <div className="flex justify-between mt-4 text-gray-400">
            <Link to="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
