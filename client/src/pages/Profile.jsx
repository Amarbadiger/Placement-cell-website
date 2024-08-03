import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PostPage from "./Post/PostPage";

const Profile = () => {
  const [user, setUser] = useState(null);
  const params = useParams();

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
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-4xl mx-auto  p-6 ">
          {user ? (
            <div>
              {/* Profile Section */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
                    {/* Placeholder for user profile image */}
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                      {user.name}
                    </h1>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Phone Number
                  </h2>
                  <p className="text-gray-600">
                    {user.phoneNumber || "No phone number available"}
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Bio
                  </h2>
                  <p className="text-gray-600">
                    {user.bio || "No bio available"}
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Skills
                  </h2>
                  <p className="text-gray-600">
                    {user.skills.length
                      ? user.skills.join(", ")
                      : "No skills listed"}
                  </p>
                </div>
                <Link
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  to={`/user/edit-profile/${user?._id}`}
                >
                  Edit Profile
                </Link>
              </div>

              {/* Post Page Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <PostPage userId={user._id} />
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Loading...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
