import React from "react";
import { useNavigate } from "react-router-dom";

const HomePagePost = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full max-w-[400px] mx-auto p-4 border rounded-lg shadow-md bg-gray-50 cursor-pointer"
      onClick={() => navigate(`/Homepost/${post._id}`)}
    >
      <div className="flex flex-col items-center">
        <img
          src={post.imgurl}
          alt="Home"
          className="w-full h-auto rounded-md mb-4 "
          style={{ maxHeight: "200px", objectFit: "cover" }}
        />
        <p className="text-base text-center">{post.text}</p>
      </div>
    </div>
  );
};

export default HomePagePost;
