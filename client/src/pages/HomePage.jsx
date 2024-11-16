import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import HomePagePost from "../components/HomePagePost";
import { message } from "antd";

const HomePage = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserdata",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      message.error("Failed to fetch user data");
    }
  };

  // Fetch home posts
  const getHomepost = async () => {
    try {
      const res = await axios.get("/api/v1/admin/homePagePost", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch home posts:", error);
      message.error("Failed to fetch home posts");
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
      getHomepost();
    } else {
      message.error("No token found. Please log in.");
    }
  }, [token]);

  return (
    <Layout>
      <div className="text-gray-800 p-4 sm:p-8 rounded-lg  w-full min-h-screen">
        <div className="text-center text-2xl font-bold text-white mb-6">
          All Updates
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.length > 0 ? (
            data.map((item, index) => <HomePagePost key={index} post={item} />)
          ) : (
            <h1 className="text-gray-600 text-center col-span-full">
              Loading...
            </h1>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
