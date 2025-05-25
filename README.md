# Chat Application Backend

A real-time chat application backend built with Express.js and MongoDB.

## 🚀 Features

- Real-time messaging using Socket.io
- User authentication and authorization
- Profile management with image upload
- Secure password hashing
- JWT-based authentication
- RESTful API endpoints
- Swagger API documentation

## 🛠️ Tech Stack

- **Backend Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose v8.15.0
- **Real-time Communication**: Socket.io v4.8.1
- **Authentication**: JWT with jsonwebtoken v9.0.2
- **Image Storage**: Cloudinary
- **Development Tools**:
  - Nodemon for development
  - dotenv for environment variables
  - Swagger for API documentation

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/    # API controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── lib/           # Utility functions
│   ├── index.js       # Main application file
│   └── swagger.yaml   # API documentation
├── .env               # Environment variables
├── package.json       # Project dependencies
└── package-lock.json  # Dependency versions
```

## 📥 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Shourov98/chat-app-express-backend.git
```

2. Navigate to the project directory:
```bash
cd chat-app-express-backend
```

3. Install dependencies:
```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following parameters:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/chatapp

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### How to Get Environment Variables

1. **MongoDB URI**: 
   - For local MongoDB: `mongodb://localhost:27017/chatapp`
   - For MongoDB Atlas: Sign up at https://www.mongodb.com/cloud/atlas and get your connection string

2. **JWT_SECRET**: 
   - Generate a strong secret key using tools like `openssl rand -base64 32`
   - Keep this secret and never commit it to version control

3. **Cloudinary Credentials**:
   - Sign up at https://cloudinary.com/
   - Go to your dashboard
   - Copy your Cloud Name, API Key, and API Secret
   - These credentials are used for image uploads

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Access the API documentation:
```bash
http://localhost:5000/api-docs
```

## 🏗️ API Documentation

The application includes Swagger UI documentation that can be accessed at:
```
http://localhost:5000/api-docs
```

## 📝 Note

- Never commit your `.env` file to version control
- Keep your JWT secret and Cloudinary credentials secure
- Always use HTTPS in production
- Regularly backup your MongoDB database

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.
