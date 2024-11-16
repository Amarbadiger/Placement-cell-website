import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { message } from "antd";

const UpdatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get the post ID from URL parameters

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/v1/singleposts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          const { title, content, author } = res.data.post;
          setTitle(title);
          setContent(content);
          setAuthor(author);
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        message.error("Failed to fetch post details");
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/posts/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success("Post updated successfully");
        navigate(`/user/profile/${author}`);
      } else {
        message.error("something went wrong");
      }
    } catch (error) {
      message.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="bg-white text-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full min-h-screen">
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Update Post</h1>
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
              Update Post
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdatePost;
