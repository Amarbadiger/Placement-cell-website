import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table } from "antd";
import axios from "axios";

const GetAllStudents = () => {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    try {
      const res = await axios.get("/api/v1/admin/allStudent", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        // Add a unique key to each user
        const usersWithKeys = res.data.data.map((user, index) => ({
          ...user,
          key: user._id || index, // Using _id or index as key
        }));
        setStudents(usersWithKeys);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
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
  ];

  return (
    <Layout>
      <div className="bg-white text-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full min-h-screen border border-blue-500">
        <h1 className="text-center m-2 text-xl sm:text-2xl">Students List</h1>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={students}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default GetAllStudents;
