import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
const HomePage = () => {
  //Login User Data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/getUserdata",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <Layout>
        <div className="bg-white text-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full min-h-screen">
          hELLO THIS IS HOME PAGE
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
