// src/pages/CreatePost.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { message } from "antd";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get the author ID from URL parameters

  useEffect(() => {
    // Set the author state with the ID from params
    if (id) {
      setAuthor(id);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/createPost",
        { title, content, author },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        navigate(`/user/profile/${id}`);
      } else {
        message.error(res.data.message);
      }
      // Redirect after successful creation
    } catch (error) {
      message.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="bg-white text-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full min-h-screen">
          <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded shadow-md"
            >
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create Post
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreatePost;
