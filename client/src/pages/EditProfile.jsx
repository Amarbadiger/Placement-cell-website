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
    image: "", // Add image to formData
  });

  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null); // To store new image file
  const [submitting, setSubmitting] = useState(false); // For the loading state
  const params = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`/api/v1/user/profile/${params.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (res.data.success) {
        const { name, email, phoneNumber, bio, skills, image } = res.data.user;
        setFormData({
          name,
          email,
          phoneNumber,
          bio,
          skills: skills.join(", "), // Convert array to comma-separated string for easier editing
          image, // Set the image URL
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

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Start loading

    const formImg = new FormData();
    formImg.append("image", imageFile);
    formImg.append("name", formData.name);
    formImg.append("email", formData.email);
    formImg.append("phoneNumber", formData.phoneNumber);
    formImg.append("bio", formData.bio);
    formImg.append("skills", formData.skills);
    formImg.append("userId", params.id);

    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/user/edit-profile",
        formImg,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
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
    } finally {
      setSubmitting(false); // Stop loading
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
                <label htmlFor="image" className="block mb-2 text-black">
                  Profile Image
                </label>
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Profile"
                    className="mb-4 w-32 h-32 rounded-full object-cover"
                  />
                )}
                <input
                  type="file"
                  id="image"
                  className="w-full border-2 p-2 rounded"
                  onChange={handleImageChange}
                />
              </div>
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
                className={`px-4 py-2 rounded transition ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
                disabled={submitting}
              >
                {submitting ? (
                  <svg
                    className="w-6 h-6 text-white animate-spin"
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
                  "Save Changes"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
