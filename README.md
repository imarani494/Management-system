Candidate Referral Management System - MERN Stack
Overview
A full-stack web application for managing candidate referrals, built with the MERN stack (MongoDB, Express, React, Node.js). This system allows users to:

Refer new candidates

View and filter existing candidates

Update candidate status (Pending/Reviewed/Hired)

Search candidates by job title or status

Features
Frontend (React)
Dashboard displaying all referred candidates

Search and filter functionality

Candidate referral form with validation

Status update interface

Responsive design with Material-UI

Backend (Node.js/Express)
RESTful API endpoints

MongoDB database integration

File upload handling (PDF resumes)

Data validation

Error handling

Technologies Used
Frontend: React, Material-UI, Axios, Formik, Yup

Backend: Node.js, Express, Mongoose, Multer

Database: MongoDB (with MongoDB Atlas for cloud deployment)

Build Tools: Vite (or Create React App)

Deployment: Vercel (frontend), Render/Heroku (backend)

Prerequisites
Before running the project, ensure you have installed:

Node.js (v14 or higher)

npm or yarn

MongoDB (local or Atlas cluster)

Installation
1. Clone the repository
bash
git clone https://github.com/yourusername/candidate-referral-system.git
cd candidate-referral-system
2. Install dependencies
Backend
bash
cd server
npm install
Frontend
bash
cd ../client
npm install
3. Set up environment variables
Create a .env file in the server directory:
- ![alt text](./client/src/assets/)

- Management-system\client\src\assets\Screenshot(1524).png

env
MONGODB_URI=mongodb://localhost:27017/candidate_referral
PORT=5000
For production, use your MongoDB Atlas connection string.

4. Start the development servers
Backend
bash
cd server
npm run dev
Frontend
bash
cd ../client
npm run dev
The application should now be running:

Backend: http://localhost:5000

Frontend: http://localhost:3000

Deployment
Backend Deployment (Render/Heroku)
Create a new account on Render or Heroku

Create a new web service

Connect your GitHub repository

Set environment variables:

MONGODB_URI

PORT

NODE_ENV=production

Deploy

Frontend Deployment (Vercel/Netlify)
Create a new account on Vercel or Netlify

Import your GitHub repository

Set root directory to client

Add environment variable:

REACT_APP_API_URL (pointing to your deployed backend)

Deploy

API Endpoints
Method	Endpoint	Description
POST	/api/candidates	Create a new candidate
GET	/api/candidates	Get all candidates (filterable)
PUT	/api/candidates/:id/status	Update candidate status
DELETE	/api/candidates/:id	Delete a candidate
Project Structure
text
candidate-referral-system/
├── client/                  # React frontend
│   ├── public/              # Static assets
│   ├── src/                 # Application source
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service functions
│   │   ├── App.js           # Main application component
│   │   └── index.js         # Entry point
│   └── package.json         # Frontend dependencies
├── server/                  # Node.js backend
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── app.js               # Express application
│   ├── server.js            # Server entry point
│   └── package.json         # Backend dependencies
└── README.md                # Project documentation
Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request
