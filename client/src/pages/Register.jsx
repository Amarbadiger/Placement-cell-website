import React, { useState } from "react";
import { Form, Input, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import logo from "../assets/images/logo.png";

const { Option } = Select;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    setLoading(true);
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());

      if (res.data.success) {
        message.success("Registered Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-gradient-to-r from-gray-900 to-black p-10">
      <nav className="flex justify-between items-center px-6 py-4 ">
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
            Sign Up
          </h1>
          <Form layout="vertical" onFinish={onFinishHandler}>
            <Form.Item
              label={<span className="text-gray-200">Name</span>}
              name="name"
              rules={[
                { required: true, message: "Please enter your name!" },
                { min: 3, message: "Name must be at least 3 characters long." },
                {
                  pattern: /^[a-zA-Z\s]+$/,
                  message: "Name can only contain letters and spaces.",
                },
              ]}
            >
              <Input
                type="text"
                className="w-full bg-gray-700 border-gray-600"
              />
            </Form.Item>
            <Form.Item
              label={<span className="text-gray-200">Email</span>}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter a valid email!",
                },
                {
                  type: "email",
                  message: "Invalid email address!",
                },
                {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                type="email"
                className="w-full bg-gray-700 border-gray-600"
              />
            </Form.Item>
            <Form.Item
              label={<span className="text-gray-200">Password</span>}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
                {
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters, including one letter, one number, and one special character!",
                },
              ]}
            >
              <Input
                type="password"
                className="w-full bg-gray-700 border-gray-600"
              />
            </Form.Item>
            <Form.Item
              label={<span className="text-gray-200">Role</span>}
              name="role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select
                placeholder="Select your role"
                className="w-full bg-gray-700 border-gray-600"
              >
                <Option value="student">Student</Option>
                <Option value="recruiter">Recruiter</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
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
                  "Sign Up"
                )}
              </button>
            </Form.Item>
          </Form>

          <p className="text-center mt-4 text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
