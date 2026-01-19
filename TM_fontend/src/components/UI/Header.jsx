import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../store/userStore";
import { useContext } from "react";

function Header() {
  const { user } = useContext(UserContext);
  console.log("Header User", user);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await fetch("http://localhost:3200/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-indigo-50 border-b border-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <p className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Task Management System
        </p>

        {/* Navigation */}
        <ul className="flex items-center gap-3 text-l font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full cursor-pointer no-underline transition ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "bg-orange-400 text-white hover:bg-orange-500"
              }`
            }
          >
            My Tasks
          </NavLink>

          {/* Only render if user exists */}
          {user?.userType === "user" && (
            <>
              <NavLink
                to="/completed"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full cursor-pointer transition no-underline ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "bg-orange-400 text-white hover:bg-orange-500"
                  }`
                }
              >
                Completed
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full cursor-pointer transition no-underline ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "bg-orange-400 text-white hover:bg-orange-500"
                  }`
                }
              >
                Profile
              </NavLink>
            </>
          )}

          {user?.userType === "host" && (
            <>
              <NavLink
                to="/host-tasks"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full cursor-pointer transition no-underline ${
                    isActive
                      ? "bg-orange-600 text-white"
                      : "bg-orange-400 text-white hover:bg-orange-500"
                  }`
                }
              >
                Host Tasks
              </NavLink>
              <NavLink
                to="/add-task"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full cursor-pointer transition no-underline ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "bg-orange-400 text-white hover:bg-orange-500"
                  }`
                }
              >
                Assign Task
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full cursor-pointer transition no-underline ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "bg-orange-400 text-white hover:bg-orange-500"
                  }`
                }
              >
                Profile
              </NavLink>
            </>
          )}
        </ul>

        {/* Login / Logout */}
        {!user ? (
          <Link
            to="/login"
            className="px-4 py-2 rounded-full cursor-pointer bg-teal-400 hover:bg-teal-500 no-underline text-white transition"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={logoutHandler}
            className="px-4 py-2 rounded-full cursor-pointer bg-teal-400 hover:bg-teal-500 text-white transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;
