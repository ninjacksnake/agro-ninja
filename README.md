# Agro Ninja

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
-

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

## License
ISC

## Author
Michael Fermin