import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";

const MessagingPage = () => {
  const { id } = useParams(); // Get the profile ID from the URL
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const { user: currentUser } = useSelector((state) => state.user);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`/api/v1/user/profile/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/api/v1/messege/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (res.data.success) {
        setMessages(res.data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchMessages();
  }, [id]);

  // Send a message
  const sendMessage = async () => {
    if (message) {
      try {
        await axios.post(
          `/api/v1/messege/send`,
          { recipientId: id, content: message },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setMessage("");
        fetchMessages(); // Refresh messages after sending
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px- lg:px-8">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
            {user && (
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 mr-4">
                  <img
                    src={user.image || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user.name}
                  </h2>
                  <p className="text-lg text-gray-600">{user.email}</p>
                </div>
              </div>
            )}
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="h-80 overflow-auto mb-4">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`p-2 mb-2 rounded-lg ${
                      msg.sender === currentUser._id
                        ? "bg-blue-500 text-white ml-auto"
                        : "bg-gray-300 text-gray-800"
                    }`}
                    style={{
                      maxWidth: "80%",
                      alignSelf:
                        msg.sender === currentUser._id
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    <p>{msg.content}</p>
                  </div>
                ))}
              </div>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2"
                rows="3"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MessagingPage;
