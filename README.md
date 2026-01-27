# QuickTask – Full-Stack Task Management Application (MERN + Python)

This repository contains **QuickTask**, a full-stack task management application built as part of a technical assessment. The project demonstrates a **clean MERN architecture**, secure authentication, RESTful API design, and a **decoupled Python analytics microservice**.

---

## 📌 Project Overview

QuickTask enables users to manage daily tasks efficiently while providing insights into productivity through analytics.

Users can:

- Register and log in securely
- Create, view, update, and delete tasks
- Filter and search tasks
- Track task completion and productivity statistics

The system is composed of **three independent services**:

1. **Frontend** – React (User Interface)
2. **Backend API** – Node.js + Express (Authentication & Task Management)
3. **Analytics Service** – Python + Flask (Statistics & Productivity Analysis)

All services connect to a shared **MongoDB Atlas** database.

---

## 🧱 Technology Stack

### Frontend
- React (Vite)
- Axios
- Tailwind CSS

### Backend API
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)

### Analytics Service
- Python
- Flask
- PyMongo

---

## 📂 Repository Structure

```
quick-task/
├── frontend/           # React frontend
├── backend/            # Node.js + Express backend API
├── analytics-service/  # Python analytics microservice
├── README.md
└── .gitignore
```

Each service is developed, deployed, and scaled independently.

---

## 🔐 Authentication & Authorization

- Users register using email and password
- Passwords are hashed before being stored in MongoDB
- On successful login, the backend generates a **JWT**
- The frontend sends the JWT in the `Authorization` header
- Protected routes verify the token using middleware

✅ User identity is **always derived from the JWT**, never from client-provided IDs.

---

## ✅ Core Features

### 👤 User Authentication
- User registration
- User login
- JWT-protected routes
- Client-side logout

---

### 📝 Task Management

Each task includes:
- Title
- Description (optional)
- Priority (Low / Medium / High)
- Status (Todo / In Progress / Completed)
- Created timestamp

Users can:
- Create tasks
- View their own tasks
- Update tasks
- Delete tasks
- Update task status

---

### 🔎 Task Organization
- Filter by status
- Filter by priority
- Search tasks by title

---

## 🔌 Backend API Endpoints (Node.js + Express)

### Authentication Routes

```
POST /api/auth/register
POST /api/auth/login
```

---

### Task Routes (Protected – JWT Required)

```
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
PATCH  /api/tasks/:id/status
DELETE /api/tasks/:id
```

---

## 📊 Python Analytics Service

The analytics service is implemented as a **standalone Python microservice**.  
It connects directly to MongoDB and performs aggregation queries without affecting the main backend API.

This separation ensures:
- Cleaner architecture
- Better scalability
- No analytics logic inside core business APIs

---

### 📈 Analytics Endpoints

#### 1️⃣ User Task Statistics

Returns overall task statistics for a user.

```
GET /analytics/user-stats?userId=<user_id>
GET https://quicktask-analytics-912y.onrender.com/analytics/user-stats?userId=69770c99ad6e5bdf52ff8e9b
```

**Response Includes:**
- Total tasks
- Completed tasks
- Pending tasks
- Completion rate (%)
- Priority-wise task distribution

---

#### 2️⃣ Productivity Analysis

Returns task completion trends over time.

```
GET /analytics/productivity?userId=<user_id>
GET https://quicktask-analytics-912y.onrender.com/analytics/productivity?userId=69770c99ad6e5bdf52ff8e9b
```

**Response Includes:**
- Daily completed task count
- Productivity trend grouped by date

> ⚠️ Note: For simplicity, `userId` is passed as a query parameter.  
> In production systems, this would typically be derived from a validated JWT.

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

### Frontend (`frontend/.env` – optional for local development)

```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

### Analytics Service (`analytics-service/.env`)

```
MONGO_URI=your_mongodb_connection_string
```

⚠️ All `.env` files are ignored via `.gitignore`.

---

## ▶️ Running the Project Locally

### Backend API

```
cd backend
npm install
npm run dev
```

Runs on:
```
http://localhost:5000
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

Runs on:
```
http://localhost:5173
```

---

### Analytics Service

```
cd analytics-service
pip install -r requirements.txt
python app.py
```

Runs on:
```
http://localhost:10000
```

---

## 🚀 Deployment

- **Frontend**: Vercel
- **Backend API**: Render
- **Analytics Service**: Render
- **Database**: MongoDB Atlas

All environment variables are configured directly in the respective deployment dashboards.

---

## 🌐 Live Demo Links

- **Frontend Website**  
  https://quick-task-two.vercel.app/login

- **Backend API Base URL**  
  https://quick-task-backend.onrender.com

- **Analytics Service Base URL**  
  https://quicktask-analytics-912y.onrender.com


---

## 🧠 Design Decisions & Notes

- Analytics logic is fully decoupled from the main backend
- JWT authentication ensures secure data access
- Backend APIs are REST-compliant
- Code prioritizes clarity, modularity, and explainability
- Architecture is suitable for real-world scaling

---

## 📝 Final Notes

This project demonstrates:

- Clean full-stack architecture
- Secure authentication and authorization
- RESTful backend API design
- Python microservice integration
- Clear separation of concerns

All implementation decisions are intentional and explainable.

---

**Author:**  
**Sunil Pragada**  
Full-Stack Developer  
Building scalable, production-ready systems 🚀
