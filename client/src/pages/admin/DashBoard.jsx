import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { message } from "antd";

const DashBoard = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState(""); // New state for title
  const [content, setContent] = useState(""); // New state for content
  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    console.log(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("text", text);
    formData.append("image", image);
    formData.append("link", link);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/v1/admin/postUpdate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  const handleImportantSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      title,
      content,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/v1/admin/addImportant",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Important content submitted successfully");
    } catch (error) {
      console.error("Error submitting important content:", error);
      message.error("Error submitting important content");
    } finally {
      setLoading(false);
    }
  };

  const fetchContactData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/v1/hero/contactData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setContactData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  return (
    <Layout>
      <div className="bg-white text-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full min-h-screen flex items-center justify-center">
        <div className="w-full flex flex-col gap-8">
          <div className="p-5 rounded-md border-2">
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
              <div className="mb-4">
                <label htmlFor="link" className="block mb-2 text-black">
                  Link
                </label>
                <input
                  type="text"
                  id="link"
                  className="w-full p-2 rounded border-2"
                  value={link}
                  onChange={handleLinkChange}
                />
              </div>
              <button
                type="submit"
                className="mt-4 p-2 bg-blue-500 text-white rounded w-full flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
          <div className="p-5 rounded-md border border-gray-300 bg-gray-50">
            <h1 className="text-2xl mb-6">Contact Us Submissions</h1>
            {contactData.length > 0 ? (
              <ul className="space-y-4">
                {contactData.map((contact, i) => (
                  <li key={i} className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-bold">{contact.name}</h2>
                    <p className="text-gray-600">{contact.email}</p>
                    <p className="text-gray-800">{contact.message}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No contact submissions available.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
