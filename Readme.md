# Backend Overview

This project is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application includes user registration, login, and protected routes using JWT (JSON Web Token) for authentication. Below are the steps and components involved in building this project.

## Project Structure

```
backend
├── config
│   └── db.js
├── controllers
│   └── userController.js // Contains loginController, registerController,authController
├── middleware
│   └── authMiddleware.js
├── models
│   └── userModel.js
├── routes
│   └── userRoute.js
├── client
│   └── src
│       ├── pages
│       │   └── Register.jsx
│       │   └── Login.jsx
│       └── App.js
├── .env
├── server.js
└── package.json
```

# Project Setup

## Prerequisites

```
Node.js
MongoDB Atlas account
```

## Installation

`Clone the repository:`

```
git clone <repository-url>
cd backend
```

`Install backend dependencies:`

```
npm install
```

`Install client dependencies:`

```
cd client
npm install
```

`Environment Variables`

```
Create a .env file in the root of the backend directory and add the following environment variables:

MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT=8000
NODE_MODE=development
```

## Running the Server

`To start the server, run:`

```
npm run server
```

`This will start the server with Nodemon, which will automatically restart the server when file changes are detected.`

## Backend Details

```
MongoDB Connection: Configured in config/db.js.
Models: Defined in models/userModel.js.
Controllers: All user-related controllers (register, login, auth) are in controllers/userController.js.
Middleware: Authorization middleware in middleware/authMiddleware.js.
Routes: User routes are defined in routes/userRoute.js.
Server Entry Point: server.js.
```

## Frontend Details

```
Register Page: client/src/pages/Register.jsx.
Login Page: client/src/pages/Login.jsx.
Main App Component: client/src/App.js.
```
