# Task Management System

A full-featured **Task Management System** built with **MERN stack** (MongoDB, Express, React, Node.js) to manage tasks for users and hosts. The system includes authentication, task assignment, task filtering, and profile management.

---

## Features

### Authentication

- User signup and login using **sessions**.
- Passwords are securely hashed using **bcryptjs**.
- Persistent login using session cookies.

### User Roles

- **User**: Can view their assigned tasks, mark tasks as completed, and see their profile.
- **Host**: Can assign tasks, edit tasks, and view all tasks.

### Task Management

- Add, edit, and delete tasks (host only).
- Filter tasks based on user assignment.
- Track task status: **Pending** or **Completed**.
- View task details including due date and assignee.

### Profile

- Users can view their profile including name, email, and role.

### UI

- Built with **React** and **Tailwind CSS**.
- Responsive design and modern interface.
- Navigation bar with conditional links based on user role.

---

## Screenshots

![Dashboard Screenshot]
![Task List Screenshot]
![Profile Screenshot]

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** Express-session, bcryptjs
- **State Management:** React Context API

---

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x
- MongoDB Atlas account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/task-management-system.git
cd task-management-system
```

2. Install server dependencies:

```bash
cd backend
npm install
```

3. Install client dependencies:

```bash
cd ../frontend
npm install
```

4. Create a `.env` file in `backend` with the following:

```env
MONGO_URI=your-mongodb-connection-string
SESSION_SECRET=your-secret-key
PORT=3200
```

---

### Running the App

1. Start the backend:

```bash
cd backend
npm start
```

2. Start the frontend:

```bash
cd frontend
npm run dev
```

3. Open `http://localhost:5173` in your browser.

---

## API Endpoints

### Auth

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| POST   | /api/auth/signup | Signup a new user          |
| POST   | /api/auth/login  | Login an existing user     |
| POST   | /api/auth/logout | Logout the user            |
| GET    | /api/auth/me     | Get current logged-in user |

### Tasks

| Method | Endpoint            | Description                   |
| ------ | ------------------- | ----------------------------- |
| GET    | /api/user/tasks     | Get tasks for logged-in user  |
| GET    | /api/host/tasks     | Get all tasks (host only)     |
| POST   | /api/host/tasks     | Create a new task (host only) |
| PUT    | /api/host/tasks/:id | Edit task (host only)         |
| DELETE | /api/host/tasks/:id | Delete task (host only)       |

---

## Project Structure

```
backend/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── server.js
frontend/
├── src/
│   ├── components/
│   ├── store/
│   ├── App.jsx
│   └── main.jsx
```

---

## License

This project is licensed under the MIT License.

---

## Author

**Priyanshu Singh**
[GitHub](https://github.com/priyanshu1664) | [LinkedIn](https://linkedin.com/in/priyanshu1664)
