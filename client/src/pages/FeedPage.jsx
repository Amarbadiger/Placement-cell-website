import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaHeart as HeartRegular,
  FaHeart as HeartSolid,
  FaComment as CommentIcon,
  FaUserPlus as FollowIcon, // Add icon for Follow button
} from "react-icons/fa";
import { message } from "antd";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [visibleComments, setVisibleComments] = useState(new Set());
  const [newComment, setNewComment] = useState({});
  const [expandedPosts, setExpandedPosts] = useState(new Set());
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/v1/feeds/allPosts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setPosts(res.data.allPost);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      if (likedPosts.has(postId)) {
        setLikedPosts(new Set([...likedPosts].filter((id) => id !== postId)));
        await axios.post(
          `/api/v1/posts/unlike/${postId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        setLikedPosts(new Set([...likedPosts, postId]));
        await axios.post(
          `/api/v1/posts/like/${postId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentChange = (postId, event) => {
    setNewComment({
      ...newComment,
      [postId]: event.target.value,
    });
  };

  const handleAddComment = async (postId) => {
    try {
      await axios.post(
        `/api/v1/posts/comment/${postId}`,
        { text: newComment[postId] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewComment({
        ...newComment,
        [postId]: "",
      });
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComments = (postId) => {
    if (visibleComments.has(postId)) {
      setVisibleComments(
        new Set([...visibleComments].filter((id) => id !== postId))
      );
    } else {
      setVisibleComments(new Set([...visibleComments, postId]));
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

  const handleFollow = async (authorId) => {
    try {
      if (followedUsers.has(authorId)) {
        setFollowedUsers(
          new Set([...followedUsers].filter((id) => id !== authorId))
        );
        await axios.post(
          `/api/v1/user/unfollow/${authorId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        message.success("User unfollowed successfully");
      } else {
        setFollowedUsers(new Set([...followedUsers, authorId]));
        await axios.post(
          `/api/v1/user/follow/${authorId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        message.success("User followed successfully");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while following/unfollowing the user");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Layout>
        <div className="min-h-screen py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-2 lg:px-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white p-6 rounded-lg shadow-md mb-6 transition-transform transform hover:scale-105 cursor-pointer"
                >
                  <div className="flex items-center mb-4">
                    {post.author.image && (
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 mr-4"
                        onClick={() =>
                          navigate(`/user/profile/${post.author._id}`)
                        }
                      />
                    )}
                    <div
                      onClick={() =>
                        navigate(`/user/profile/${post.author._id}`)
                      }
                      className="cursor-pointer"
                    >
                      <h3 className="text-xl font-semibold text-gray-800">
                        {post.author.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleFollow(post.author._id)}
                      className="ml-auto text-blue-500 hover:text-blue-600"
                    >
                      {followedUsers.has(post.author._id)
                        ? "Unfollow"
                        : "Follow"}
                      <FollowIcon className="inline ml-1" />
                    </button>
                  </div>
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 object-cover rounded-t-lg mb-4"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-2xl font-semibold text-gray-800 truncate">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm md:text-base">
                      {expandedPosts.has(post._id)
                        ? post.content
                        : `${post.content.slice(0, 100)}...`}
                      {post.content.length > 100 && (
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={() => togglePostContent(post._id)}
                        >
                          {expandedPosts.has(post._id)
                            ? " Show less"
                            : " Show more"}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 p-4">
                    <button
                      onClick={() => handleLike(post._id)}
                      className={`text-2xl ${
                        likedPosts.has(post._id)
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {likedPosts.has(post._id) ? (
                        <HeartSolid className="text-red-500" />
                      ) : (
                        <HeartRegular />
                      )}
                    </button>
                    <button
                      onClick={() => toggleComments(post._id)}
                      className="text-2xl text-gray-500 hover:text-blue-500"
                    >
                      <CommentIcon />
                    </button>
                  </div>
                  {visibleComments.has(post._id) && (
                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <div className="mb-4 flex items-center">
                        <textarea
                          id={`comment-input-${post._id}`}
                          value={newComment[post._id] || ""}
                          onChange={(e) => handleCommentChange(post._id, e)}
                          rows="2"
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Add a comment..."
                        />
                        <button
                          onClick={() => handleAddComment(post._id)}
                          className="ml-2 text-blue-500 hover:text-blue-600"
                        >
                          <i className="fa-solid fa-paper-plane text-2xl"></i>
                        </button>
                      </div>
                      <div>
                        {post.replies.map((reply) => (
                          <div
                            key={reply._id}
                            className="flex items-start mb-2"
                          >
                            {reply.userProfilePic && (
                              <img
                                src={reply.userProfilePic}
                                alt={reply.username}
                                className="w-8 h-8 rounded-full object-cover border-2 border-blue-500 mr-2"
                              />
                            )}
                            <div>
                              <p className="font-semibold">{reply.username}</p>
                              <p className="text-gray-600">{reply.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center min-h-screen">
                <svg
                  className="w-8 h-8 text-blue-500 animate-spin"
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
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default FeedPage;
