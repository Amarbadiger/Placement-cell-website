import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { message } from "antd";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
  });
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

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
        const { name, email, phoneNumber, bio, skills } = res.data.user;
        setFormData({
          name,
          email,
          phoneNumber,
          bio,
          skills: skills.join(", "), // Convert array to comma-separated string for easier editing
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/user//edit-profile",
        { ...formData, userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success("Profile updated successfully!");
        navigate(`/user/profile/${params.id}`); // Navigate back to the profile page
      }
    } catch (error) {
      console.log(error);
      alert("Error updating profile.");
    }
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
              <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full mt-2 p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full mt-2 p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="block w-full mt-2 p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Bio:</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="block w-full mt-2 p-2 border rounded"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Skills (comma-separated):
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="block w-full mt-2 p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
