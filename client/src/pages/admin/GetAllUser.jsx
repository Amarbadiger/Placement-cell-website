import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const GetAllUser = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        const usersWithKeys = res.data.data.map((user, index) => ({
          ...user,
          key: user._id || index, // Using _id or index as key
        }));
        setUsers(usersWithKeys);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleBlockStatus = async (id, isBlocked) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/admin/block",
        { id, isBlocked },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(
          `User ${isBlocked ? "blocked" : "unblocked"} successfully`
        );
        getUsers(); // Refresh the user list
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while updating the block status.");
    }
  };

  useEffect(() => {
    getUsers();
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
      title: "Status",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (text, record) => (
        <span>{record.isBlocked ? "Blocked" : "Active"}</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex justify-center">
          <button
            className={`py-2 px-4 rounded ${
              record.isBlocked ? "bg-green-500" : "bg-red-500"
            } text-white`}
            onClick={() => toggleBlockStatus(record.key, !record.isBlocked)}
          >
            {record.isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="bg-white text-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full min-h-screen border border-blue-500">
        <h1 className="text-center m-2 text-xl sm:text-2xl">Users List</h1>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={users}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default GetAllUser;
