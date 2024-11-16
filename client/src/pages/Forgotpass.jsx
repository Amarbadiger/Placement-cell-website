import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Forgotpass = () => {
  const navigate = useNavigate();

  const onFinishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/forgot-password", values);
      if (res.data.success) {
        message.success("Password reset link sent to your email.");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong. Please try again later.");
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
            Forgot Password
          </h1>
          <Form layout="vertical" onFinish={onFinishHandler}>
            <Form.Item
              label={<span className="text-gray-200">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                type="email"
                className="w-full bg-gray-700 border-gray-600"
              />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Send Reset Link
              </button>
            </Form.Item>
          </Form>
          <p className="text-center mt-4 text-gray-400">
            Remembered your password?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forgotpass;
