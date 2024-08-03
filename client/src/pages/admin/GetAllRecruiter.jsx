import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table } from "antd";
import axios from "axios";

const GetAllRecruiter = () => {
  const [Recruiter, setRecruiter] = useState([]);
  const getRecruiter = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/allRecruiter",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        // Add a unique key to each user
        const usersWithKeys = res.data.data.map((user, index) => ({
          ...user,
          key: user._id || index, // Using _id or index as key
        }));
        setRecruiter(usersWithKeys);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecruiter();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex justify-center">
          <button className="bg-red-500 text-white py-2 px-4 rounded">
            Block
          </button>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <div className="bg-white text-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full min-h-screen border border-blue-500">
        <h1 className="text-center m-2 text-xl sm:text-2xl">Recruiter List</h1>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={Recruiter}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default GetAllRecruiter;