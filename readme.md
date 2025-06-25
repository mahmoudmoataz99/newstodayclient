# Blogs - Full-Stack Blog Platform

A full-stack blogging platform that allows users to create, read, update, and delete blog posts. Users can register, log in, and manage their blog posts. Admins can manage all blog posts and users.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Overview

This is a full-stack blog platform built with **Node.js** and **MongoDB** on the backend, and **React.js** on the frontend. It allows:

- **User Authentication**: Register and log in to the platform.
- **Blog Creation**: Users can create, update, and delete their own blog posts.
- **Admin Panel**: Admins can manage all blog posts and users.
- **Responsive Design**: Optimized for desktop views with a clean, modern UI.

## Tech Stack

### Frontend:
- **React.js**: For building the user interface.
- **React Router**: For handling navigation between different pages (Home, Login, Register, etc.).
- **Axios**: For making HTTP requests to the backend.
- **TailwindCSS**: For styling the application.

### Backend:
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the RESTful API.
- **MongoDB**: NoSQL database for storing users, blog posts, and comments.
- **Cross-Origin Resource Sharing (CORS)**: It is extension needed for authorized resource sharing with external third parties

### Optional Enhancements:
- **Role-based Access Control**: Admin and User roles for access control.
- **File Uploads**: Option to add images or media to blog posts (optional).
- **Pagination**: For loading blog posts efficiently.
- **Unit Testing**: Testing API routes and frontend components.

## Features

### User Features:
- **User Authentication**: Register, login, and manage account settings.
- **Blog Management**: Create, read, and delete your own blog posts.
- **Blog Feed**: View a list of all blog posts in a paginated feed.

## Installation

### Prerequisites:
- **Node.js** (v14 or above)
- **MongoDB** (either local or hosted on MongoDB Atlas)

### Step-by-Step Guide:

1. **Clone the repository**:
   -git clone https://github.com/mahmoudmoataz99/Blogs.git
   -cd Blogs

2. **Install backend dependencies**:
Copy
Edit
cd backend
npm install

3. **Install frontend dependencies**:
cd ../frontend
npm install

4. **Run the backend server**:
cd backend
npm start
The backend will run on http://localhost:5000.

5. **Run the frontend development server**:
cd frontend
npm start
