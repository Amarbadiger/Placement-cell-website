import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PostPage from "./Post/PostPage";

const Profile = () => {
  const [user, setUser] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  // Hardcoded followers and following data
  const [followers, setFollowers] = useState([
    { name: "John Doe", id: "1" },
    { name: "Jane Smith", id: "2" },
  ]);
  const [following, setFollowing] = useState([
    { name: "Alice Johnson", id: "3" },
    { name: "Bob Brown", id: "4" },
  ]);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/profile",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [params.id]);

  return (
    <Layout>
      <div className=" min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {user ? (
            <div className="space-y-8">
              {/* Profile Section */}
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <div className="flex flex-col sm:flex-row items-center mb-6">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-blue-500 mb-4 sm:mb-0">
                    <img
                      src={user.image || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="sm:ml-6 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                      {user.name}
                    </h1>
                    <p className="text-lg text-gray-600">{user.email}</p>
                    <div className="flex justify-center sm:justify-start mt-4">
                      <button
                        className="px-4 py-2 sm:px-5 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mx-2"
                        onClick={() => navigate(`/user/followers/${user._id}`)}
                      >
                        Followers ({followers.length})
                      </button>
                      <button
                        className="px-4 py-2 sm:px-5 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mx-2"
                        onClick={() => navigate(`/user/following/${user._id}`)}
                      >
                        Following ({following.length})
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                    Phone Number
                  </h2>
                  <p className="text-lg text-gray-600">
                    {user.phoneNumber || "No phone number available"}
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                    Bio
                  </h2>
                  <pre className="text-lg text-gray-600">
                    {user.bio || "No bio available"}
                  </pre>
                </div>
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.length ? (
                      user.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold capitalize"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-lg text-gray-600">No skills listed</p>
                    )}
                  </div>
                </div>
                <Link
                  className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  to={`/user/edit-profile/${user?._id}`}
                >
                  Edit Profile
                </Link>
              </div>

              {/* Post Page Section */}
              <div className="bg-gray-100 p-6 sm:p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <PostPage userId={user._id} />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-screen">
              <svg
                className="w-10 h-10 text-blue-500 animate-spin"
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
  );
};

export default Profile;
