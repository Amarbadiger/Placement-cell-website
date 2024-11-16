import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { message } from "antd";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null); // State for image
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();
  const { id } = useParams(); // Get the author ID from URL parameters

  useEffect(() => {
    // Set the author state with the ID from params
    if (id) {
      setAuthor(id);
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post("/api/v1/createPost", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        navigate(`/user/profile/${id}`);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when request is finished
    }
  };

  return (
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
            <div className="mb-4">
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-96 max-w-full object-contain rounded" // Set height to 400 pixels and maintain aspect ratio
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white transition ${
                loading
                  ? "bg-blue-400 cursor-wait"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="w-5 h-5 mx-auto animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z"
                  />
                </svg>
              ) : (
                "Create Post"
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
