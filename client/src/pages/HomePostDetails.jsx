import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import "antd/dist/reset.css"; // Import Ant Design CSS
import Layout from "../components/Layout";

const HomePostDetails = () => {
  const params = useParams();
  const token = localStorage.getItem("token");
  const [singlePost, setSinglePost] = useState({});

  // Fetch single post data when component mounts
  useEffect(() => {
    getSingleHomePost();
  }, []);

  const getSingleHomePost = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/admin/singleHomePagePost",
        {
          params: params.id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.data.success) {
        setSinglePost(res.data.data);
      } else {
        message.error("Failed to fetch post details.");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while fetching post details.");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">
            {singlePost.title || "Post Title"}
          </h1>
          {singlePost.imgurl && (
            <img
              src={singlePost.imgurl}
              alt={singlePost.title || "Post Image"}
              className="w-full h-auto max-h-96 object-cover rounded-lg mb-4 mx-auto"
            />
          )}
          <p className="text-gray-700 text-lg">
            {singlePost.text || "Post content goes here..."}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default HomePostDetails;
