# GigFlow Smart Leads Dashboard

A robust, production-ready Full-Stack Lead Management Dashboard built using the **MERN Stack** and strictly typed with **TypeScript**. This project features a clean, scalable architecture with secure JWT authentication, advanced real-time query filtering, debounced search, role-based access control (RBAC), and professional CSV export capabilities.

---

## 🚀 Features Implemented

### 1. Authentication System
* **Secure Flow:** JWT-based stateless authentication.
* **Password Security:** Salted and hashed passwords using `bcrypt`.
* **Route Protection:** Custom frontend & backend auth middleware to secure private dashboard data.

### 2. Leads Management (CRUD)
* **Data Fields:** Captures Name, Email, Status (`New`, `Contacted`, `Qualified`, `Lost`), and Source (`Website`, `Instagram`, `Referral`).
* **Interactive UI:** Complete view list, lead creation, updates, and secure deletions.

### 3. Advanced Filtering, Search & Pagination
* **Combined Queries:** Multi-filter capability (filter by Status, Source, and Search simultaneously).
* **Debounced Search:** Optimizes API performance by introducing debouncing on Name/Email searches.
* **Server-Side Pagination:** Strict limit of 10 records per page using MongoDB `skip` and `limit` metadata.

### 4. Mandatory Professional Extras
* **Role-Based Access Control (RBAC):** Distinct permissions and UI states for `Admin` and `Sales User`.
* **CSV Export:** Dynamic generation and local downloading of data directly to a `.csv` file.

---

## 🛠️ Tech Stack Used

* **Frontend:** React.js, TypeScript, TailwindCSS, React Router DOM
* **Backend:** Node.js, Express.js, TypeScript
* **Database:** MongoDB, Mongoose ODM

---

## 📦 Project Structure

```text
smart-leads-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # Request handlers (Lead & Auth controllers)
│   │   ├── middlewares/  # Authentication & RBAC Middlewares
│   │   ├── models/       # Mongoose TypeScript Schemas
│   │   ├── routes/       # Express REST API endpoints
│   │   └── server.ts     # Application Entry point
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI Components
    │   ├── hooks/        # Custom utility hooks (e.g., useDebounce)
    │   ├── pages/        # Dashboard, Login, and Register screens
    │   └── App.tsx       # Routing and Protected Routes setup

🔧 Installation & Setup Instructions
​Prerequisites
​Node.js v16+
​MongoDB Local or MongoDB Atlas Account

Step 1: Clone the Repository
git clone https://github.com/ramteketrupti2604-creator
cd smart-leads-dashboard

Step 2: Backend Configuration
Navigate to the backend folder:
cd backend

Install dependencies:
npm install

Create a .env file based on .env.example:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart-leads
JWT_SECRET=your_super_secret_jwt_key_here

Start the development server:
npm run dev

Step 3: Frontend Configuration
Open a new terminal and navigate to the frontend folder:
cd ../frontend

Install dependencies:
npm install

Start the Vite React app:
npm run dev
Open your browser and navigate to http://localhost:5173

🐳 Docker Setup
To spin up the entire application container locally, make sure you have Docker installed and execute:
docker-compose up --build
The frontend will be accessible at http://localhost:3000 or http://localhost:5173 based on mapped ports.

API Documentation Summary
Endpoint Method Description Auth Required
/api/auth/register POST Register a new user (Admin / Sales User) Public
/api/auth/login POST Authenticate user and return JWT Token Public
/api/leads GET Get paginated leads with filtering/sorting Private (All)
/api/leads POST Create a new lead record Private (All)
/api/leads/:id PUT Update existing lead status or info Private (All)
/api/leads/:id DELETE Remove a lead from the system Private (Admin Only)
/api/leads/export/csv GET Export all leads data into CSV format Private (All)