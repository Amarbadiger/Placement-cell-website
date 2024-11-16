import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroImg from "../assets/images/hero.jpg";
import logo from "../assets/images/logo.png";
import about from "../assets/images/about.jpg";
import axios from "axios";
import "../styles/HeroPage.css";
import { message } from "antd";

const HeroPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation regex to check for .com or .in domains
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/;
    // Phone number validation regex (Indian format example)
    const phoneRegex = /^[6-9]\d{9}$/;
    // name validation
    const namevali = /^[a-zA-Z\s]+$/;

    if (!namevali.test(formData.firstname)) {
      message.error("Firstname can only contain letters");
      return;
    }
    if (!namevali.test(formData.lastname)) {
      message.error("Lastname can only contain letters");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      message.error(
        "Please enter a valid email address ending with .com or .in"
      );
      return;
    }

    if (!phoneRegex.test(formData.phone)) {
      message.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const response = await axios.post("/api/v1/hero/contact-form", formData);
      console.log(response.data);
      message.success(
        "The data is sent to admin. We will reach out to you soon."
      );
      // Optionally, reset form data after successful submission
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      message.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 to-black p-10">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div>
          <img src={logo} alt="logo" className="w-48" />
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 lg:px-6 rounded-lg transition duration-300 ease-in-out"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 lg:px-6 rounded-lg transition duration-300 ease-in-out"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row justify-center items-center px-6 lg:px-16 py-10 lg:py-24">
        <div className="lg:w-1/2 text-white space-y-6 lg:space-y-8">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Welcome to Placement Cell
          </h1>
          <h2 className="text-2xl lg:text-3xl font-semibold">
            Gogte College of Commerce (BCA)
          </h2>
          <p className="text-lg lg:text-xl">
            The website will serve as a centralized platform for students,
            faculty, and recruiters, facilitating efficient communication and
            coordination. It will provide students with the opportunity to
            register, create profiles, and highlight their skills and
            achievements, thereby enhancing their visibility to potential
            recruiters.
          </p>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-end">
          <img
            src={HeroImg}
            alt="Hero"
            className="w-80 h-auto max-w-md lg:max-w-lg rounded-lg animate-bounce-slow"
          />
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col lg:flex-row justify-center items-center px-6 lg:px-16 py-12 lg:py-24 bg-gradient-to-l from-gray-900 via-gray-800 to-black text-white rounded-lg">
        <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-start">
          <img
            src={about}
            alt="About"
            className="w-full h-auto max-w-md lg:max-w-lg rounded-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-12">
          <h2 className="text-2xl lg:text-3xl font-semibold">About BCA:</h2>
          <p className="text-lg lg:text-xl mt-4">
            BCA is a three years full-time degree course consisting of six
            semesters. The course is affiliated to Rani Channamma University,
            Belagavi, and recognized by the Government of Karnataka. Gogte BCA
            provides a pertinent platform for students to transcend to new
            heights by nurturing an individual, imbibing confidence, enhancing
            communication skills, and developing quick thinking abilities among
            them. Our graduates have the distinction of obtaining reputed
            positions in the IT industry. The faculty is diverse, committed, and
            aptly qualified. The training imparted @gogtebca aims to prepare
            young minds for the challenging opportunities in the IT industry
            with a vast outreach, nourished and supported by experts in the IT
            field.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gradient-to-l from-gray-900 via-gray-800 to-black text-white rounded-lg px-4 md:px-6 py-8 md:py-12 shadow-md mb-10 mt-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">Contact Us</h2>
        <form className="space-y-4 text-black" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 text-white">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="w-full md:w-1/2 p-2 border rounded-lg bg-gray-700  border-gray-600"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="w-full md:w-1/2 p-2 border rounded-lg bg-gray-700  border-gray-600"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded-lg bg-gray-700  border-gray-600 text-white"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-2 border rounded-lg bg-gray-700  border-gray-600 text-white"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            className="w-full p-2 border rounded-lg bg-gray-700  border-gray-600 text-white"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-l from-gray-900 via-gray-800 to-black text-white p-6 mt-5 rounded-md relative">
        <div className="container mx-auto flex flex-col md:flex-row justify-evenly items-start md:items-center space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="flex-shrink-0 mb-4 md:mb-0 w-full md:w-1/4 flex justify-center md:justify-start">
            <img src={logo} alt="Logo" className="w-60 md:w-72" />
          </div>

          {/* Footer Content */}
          <div className="flex flex-col md:flex-row w-full md:w-3/4 justify-between space-y-6 md:space-y-0 gap-5">
            {/* Map */}
            <div className="flex-grow md:w-1/4 flex justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.4400323163627!2d74.50655587471078!3d15.833453584812428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf668668f8f17f%3A0x39290ecdca6354f1!2sKLS%20Platinum%20Jubilee%20building%2C%20R%20L%20Law%20College%20Belagavi%20%26%20Gogte%20College%20of%20Commerce!5e0!3m2!1sen!2sin!4v1722247398254!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="College Location"
                className="rounded"
              ></iframe>
            </div>

            {/* Contact Information */}
            <div className="flex-grow md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p>Principal</p>
              <p className="mt-2">Gogte College of Commerce</p>
              <p>Tilakwadi, Belagavi, Karnataka 590006</p>
              <p className="mt-2">Phone: (0831) 2405500</p>
              <p>
                Email:{" "}
                <a href="mailto:principal@gccbgm.org" className="underline">
                  principal@gccbgm.org
                </a>
              </p>
            </div>
          </div>

          {/* Send Feedback Link as a Small Button in the Bottom-Right Corner */}
          <div className="absolute bottom-4 right-4">
            <Link
              to="/Feedback"
              className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-1 px-3 rounded-full text-sm shadow-md transition duration-300 ease-in-out"
            >
              Send Feedback
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroPage;
