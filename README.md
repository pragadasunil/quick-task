# QuickTask – Task Management App (MERN + Python)

This repository contains **QuickTask**, a simple personal task management application built as part of a full‑stack assessment. The focus of this project is on **clean architecture, correct authentication flow, and clear separation between frontend, backend, and analytics logic**.


---

## 📌 Project Overview

QuickTask allows users to:

* Register and log in securely
* Create, view, update, and delete tasks
* Filter and search tasks
* View basic task statistics and productivity insights

The project is split into three main parts:

* **Frontend** – React (user interface)
* **Backend** – Node.js + Express (API, auth, task logic)
* **Analytics Service** – Python (task statistics & productivity)

MongoDB is used as the database for persistence.

---

## 🧱 Tech Stack

### Frontend

* React (with Hooks)
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (JSON Web Tokens)

### Analytics Service

* Python
* Flask / FastAPI
* PyMongo

---

## 📂 Folder Structure

```
root/
├── frontend/          # React application
├── backend/           # Node.js + Express API
├── analytics/         # Python analytics service
└── README.md
```

Each part runs independently and communicates via HTTP APIs.

---

## 🔐 Authentication Flow

* Users register with email and password
* Passwords are hashed before storing in MongoDB
* On login, the backend generates a **JWT token**
* The token is sent by the frontend in the `Authorization` header
* Protected routes use middleware to verify the token and identify the user

User identity is **never passed manually from the frontend**. All user context comes from the verified JWT.

---

## ✅ Core Features Implemented

### User Authentication

* Register
* Login
* JWT‑based protected routes
* Logout (client‑side)

### Task Management

* Create tasks
* View user‑specific tasks
* Edit tasks
* Delete tasks
* Update task status

Each task contains:

* Title
* Description (optional)
* Priority (Low / Medium / High)
* Status (Todo / In Progress / Completed)
* DueDate

### Task Organization

* Filter by status
* Filter by priority
* Search by title

### Dashboard & Analytics

* Total task count
* Completed vs pending tasks
* Basic productivity insights via Python service

---

## 🧪 Python Analytics Service

The analytics service is implemented as a **separate Python service**.

It provides two main endpoints:

1. **User Statistics**

   * Aggregated task counts for a user

2. **Productivity Analysis**

   * Task completion trends over time

The backend either queries MongoDB directly for analytics or integrates with the Python service depending on the use case.

---

## 🔌 API Overview (Backend)

### Auth Routes

```
POST /api/auth/register
POST /api/auth/login
```

### Task Routes (Protected)

```
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

All task routes require a valid JWT token.

---


## ▶️ Running the Project Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Python Analytics Service

```bash
cd analytics
pip install -r requirements.txt
python app.py
```

Make sure MongoDB is running locally or use MongoDB Atlas.

---

**Author:** Sunil Pragada
