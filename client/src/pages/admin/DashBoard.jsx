import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

const DashBoard = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/postUpdate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Form submitted successfully:", response.data);
      // Handle success response
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error response
    }
  };

  return (
    <Layout>
      <div className="bg-white text-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full min-h-screen flex items-center justify-center">
        <div className="border border-black w-full sm:w-3/4 lg:w-1/2 p-5 rounded-md">
          <h1 className="text-2xl mb-6">Add Opportunities</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="text" className="block mb-2 text-black">
                Text
              </label>
              <input
                type="text"
                id="text"
                className="w-full p-2 rounded border-2"
                value={text}
                onChange={handleTextChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block mb-2 text-black">
                Image
              </label>
              <input
                type="file"
                id="image"
                className="w-full border-2 p-2 rounded"
                onChange={handleImageChange}
              />
            </div>
            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
