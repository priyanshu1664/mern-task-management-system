import Header from "./components/UI/Header";
import { Route, Routes } from "react-router-dom";
import DisplayTask from "./components/DisplayTask/DisplayTask";
import HostTask from "./components/DisplayHostTask/HostTask";
import AddTask from "./components/AddTask/AddTask";
import TaskDetails from "./components/DisplayTask/TaskDetails";

import AuthForm from "./components/Auth/AuthForm";
import Completed from "./components/Completed/Completed";
import { TaskContextProvider } from "./store/taskStore";
import { UserProvider } from "./store/userStore";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./components/ProtectRoute/ProtectRoute";

function App() {
  return (
    <UserProvider>
      <TaskContextProvider>
        <center className="task-container">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DisplayTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/host-tasks"
              element={
                <ProtectedRoute>
                  <HostTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-task"
              element={
                <ProtectedRoute>
                  <AddTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/completed"
              element={
                <ProtectedRoute>
                  <Completed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/task/:id"
              element={
                <ProtectedRoute>
                  <TaskDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-task/:id"
              element={
                <ProtectedRoute>
                  <AddTask />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/signup" element={<AuthForm />} />
          </Routes>
        </center>
      </TaskContextProvider>
    </UserProvider>
  );
}

export default App;
