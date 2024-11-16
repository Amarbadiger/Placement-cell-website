import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { message } from "antd";

const PostPage = ({ userId, isCurrentUser }) => {
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState(new Set());

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`/api/v1/posts/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setPosts(res.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const res = await axios.delete(`/api/v1/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchPosts();
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };

  const togglePostContent = (postId) => {
    setExpandedPosts((prev) => {
      const newExpandedPosts = new Set(prev);
      if (newExpandedPosts.has(postId)) {
        newExpandedPosts.delete(postId);
      } else {
        newExpandedPosts.add(postId);
      }
      return newExpandedPosts;
    });
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Posts</h2>
        {isCurrentUser && (
          <Link
            to={`/user/create-post/${userId}`} // Adjust this path if necessary
            className="px-4 py-2  bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Create New Post
          </Link>
        )}
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

            {post.image && (
              <div className="mt-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full max-h-[400px] object-cover rounded-lg"
                />
              </div>
            )}

            <p className="mt-4 text-gray-600">
              {expandedPosts.has(post._id)
                ? post.content
                : `${post.content.slice(0, 100)}...`}
              {post.content.length > 100 && (
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => togglePostContent(post._id)}
                >
                  {expandedPosts.has(post._id) ? " Show less" : " Show more"}
                </span>
              )}
            </p>

            {isCurrentUser && (
              <>
                <Link
                  to={`/user/update-post/${post._id}`} // Adjust this path if necessary
                  className="absolute top-2 right-12 text-blue-500 hover:text-blue-700"
                >
                  <i className="fas fa-edit"></i>
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No posts available</p>
      )}
    </div>
  );
};

export default PostPage;
