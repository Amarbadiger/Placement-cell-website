import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { message } from "antd";

const PostPage = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/posts/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setPosts(res.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchPosts();
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      message.error("something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Posts</h2>
        <Link
          to={`/user/create-post/${userId}`} // Adjust this path if necessary
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Create New Post
        </Link>
      </div>
      {posts.length ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-4 mb-4 rounded-lg shadow-md relative"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {post.title}
            </h3>
            <p className="text-gray-600">{post.content}</p>
            <div className="absolute top-2 right-2 flex space-x-2">
              <Link
                to={`/user/update-post/${post._id}`}
                className="text-blue-500 hover:text-blue-700 transition"
                title="Edit Post"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 14l2 2 5-5-2-2-5 5zM14.828 7.172a4 4 0 00-5.656 0l-1.414 1.414a2 2 0 002.828 2.828L14.828 10a4 4 0 000-5.656z"
                  />
                </svg>
              </Link>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Delete Post"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L6 6M18 18L18 6M5 6H19M10 11V17M14 11V17"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No posts available.</p>
      )}
    </div>
  );
};

export default PostPage;
