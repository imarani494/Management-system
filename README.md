

## Overview

A full-stack web application for managing candidate referrals, built with the MERN stack (MongoDB, Express, React, Node.js). This system allows users to:

- Refer new candidates
- View and filter existing candidates
- Update candidate status (Pending/Reviewed/Hired)
- Search candidates by job title or status

## Features

### Frontend (React)
- Dashboard displaying all referred candidates
- Search and filter functionality
- Candidate referral form with validation
- Status update interface
- Responsive design with Material-UI

### Backend (Node.js/Express)
- RESTful API endpoints
- MongoDB database integration
- File upload handling (PDF resumes)
- Data validation
- Error handling

## Technologies Used

- **Frontend**: React, Material-UI, Axios, Formik, Yup
- **Backend**: Node.js, Express, Mongoose, Multer
- **Database**: MongoDB (with MongoDB Atlas for cloud deployment)
- **Build Tools**: Vite (or Create React App)
- **Deployment**: Vercel (frontend), Render/Heroku (backend)
<img src="./client/src/assets/Screenshot(1524).png" width="600">
![Dashboard Screenshot](./client/src/assets/dashboard-screenshot.png)
![Referral Form Screenshot](./client/src/assets/referral-form-screenshot.png)
### Referral Form
<img src="./client/src/assets/Screenshot(1522).png" width="600">
## Prerequisites

Before running the project, ensure you have installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas cluster)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/candidate-referral-system.git
cd candidate-referral-system
