# 🌱 Agro Ninja

## Overview

Agro Ninja is a web-based system designed to help agricultural businesses manage operations, track production, and improve decision-making through digital tools.

This project simulates a real-world solution for managing agricultural workflows, replacing manual processes with a scalable and structured platform.

---

##  Problem

Many small and medium agricultural businesses still rely on manual tracking (Excel, paper), leading to:

* Poor visibility of production data
* Inefficient resource management
* Lack of centralized information

---

## 💡 Solution

Agro Ninja provides a centralized platform where users can:

* Manage products and agricultural assets
* Track operations and activities
* Organize data in a structured and scalable way
* Be used like a tool to understand the agricultural process
* Be used as a knowlegde transference platform for plants illness and medicine applied
  

---

##  Tech Stack

**Frontend**

*  Angular 

**Backend**

*  NestJS  

**Database**

* PostgreSQL / SQL Server

---

##  Features

* CRUD operations for agricultural entities
* RESTful API integration
* Scalable backend structure
* Modular frontend architecture

---

##  Architecture

This project follows a modular architecture separating:

* Controllers (request handling)
* Services (business logic)
* Data access layer

The goal is to ensure scalability and maintainability.

---

## 📸 Screenshots

<img width="1715" height="960" alt="image" src="https://github.com/user-attachments/assets/c0b9f263-ec53-412a-ba35-05b388940b7e" />

<img width="1715" height="960" alt="image" src="https://github.com/user-attachments/assets/f00a58cd-a5ba-4f07-9136-8ccac68e1fde" />

<img width="1715" height="960" alt="image" src="https://github.com/user-attachments/assets/2dfe8c3a-4016-4bc9-ab30-e02ce95d6b36" />

<img width="1715" height="960" alt="image" src="https://github.com/user-attachments/assets/4726102c-548d-46dd-a04c-3d2cdeac189e" />

---

##  Getting Started

### Backend

```bash
Add your environment variables
npm install
npm run start
```

### Frontend

```bash
Add your environment variables
npm install
npm start
```

---

##  Future Improvements

* Dashboard analytics
* Cloud deployment (AWS / Vercel /R ender)

---



Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.



Agro Ninja is a comprehensive agricultural management system that helps track and manage crops, diseases, chemicals, and products in the agricultural industry.

## Project Structure

This is a monorepo containing two main applications:

- `agro-ninja` - React frontend application
- `agro-ninja-api` - Node.js/Express backend API

## Features

- User authentication and authorization
- Crop management
- Disease tracking
- Chemical product management
- Product categorization
- File upload capabilities
- RESTful API endpoints

## Prerequisites

- Node.js (Latest LTS version recommended)
- PostgreSQL database
- npm or yarn package manager
- react

## Installation
git clone <repository-url>
cd agro-ninja/monorepo

# Install frontend dependencies
cd agro-ninja
npm install

# Install backend dependencies
cd ../agro-ninja-api
npm install

## Frontend Technologies
- Framework : React.js
- UI Library : Ant Design (antd)
- State Management : Redux Toolkit (with React Redux)
- HTTP Client : Axios
- Routing : React Router DOM
- Development Tools : Webpack

## Front End Estructure
src/
├── App.js                 # Main application component
├── app.config.js          # Application configuration
├── features/
│   └── auth/             # Authentication related components
├── services/
│   └── api.jsx           # API service configuration
└── routes/
    └── App.router.jsx    # Application routing

## Backend Technologies
- Framework : Express.js
- Database : PostgreSQL / sqlite3
- ORM : Sequelize

## Environment Variables

### Frontend (.env)



### Backend (.env)
# Server Configuration
PORT=3004
HTTP_MODE=development
CLIENT_URL=http://localhost:3000

# Database Configuration
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1h
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRATION=7d

# API Configuration
API_URL=http://localhost:3004
DBSYNC=true

##  Author

Michael Fermin
Full Stack Developer | Node.js | React | .NET


