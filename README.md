# Candidate Referral Management System

![Dashboard Preview](./client/src/assets/dashboard-screenshot.png)
![Form Preview](./client/src/assets/form-screenshot.png)

## Features Implemented

### Frontend
- **Dashboard**: View all candidates with filtering by job title/status
- **Referral Form**: Submit new candidates with PDF resume upload
- **Status Management**: Update candidate status (Pending → Reviewed → Hired)
- **Search**: Find candidates by name or job title
- **Responsive Design**: Works on mobile and desktop

### Backend
- **REST API**: CRUD operations for candidates
- **File Handling**: Secure PDF uploads
- **Validation**: Email, phone, and file type validation
- **MongoDB**: Persistent data storage

## How to Run Locally

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas cluster)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/candidate-referral-system.git
   cd candidate-referral-system
