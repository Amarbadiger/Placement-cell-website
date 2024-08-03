import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // Handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  // Handle delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong with notifications");
    }
  };

  return (
    <Layout>
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full min-h-screen border border-blue-500">
        <h4 className="p-3 text-center">Notification Page</h4>
        <Tabs>
          <Tabs.TabPane tab="Unread" key={0}>
            <div className="flex justify-end">
              <h4 className="p-2 cursor-pointer" onClick={handleMarkAllRead}>
                Mark All Read
              </h4>
            </div>
            {user?.notification.map((notificationMgs, index) => (
              <div
                key={index}
                className="card cursor-pointer mb-2"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                <div className="card-text p-2">{notificationMgs.message}</div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Read" key={1}>
            <div className="flex justify-end">
              <h4
                className="p-2 text-primary cursor-pointer"
                onClick={handleDeleteAllRead}
              >
                Delete All Read
              </h4>
            </div>
            {user?.seenNotification.map((notificationMgs, index) => (
              <div
                key={index}
                className="card cursor-pointer mb-2"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                <div className="card-text p-2">{notificationMgs.message}</div>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Notification;
