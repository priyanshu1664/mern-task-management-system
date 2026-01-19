import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../store/userStore";
function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const nameRef = useRef();
  const userTypeRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  // handleSubmit function in AuthForm
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const API_URL = "http://localhost:3200/api/auth";

    if (!isLogin) {
      const confirmPassword = confirmPasswordRef.current.value;
      const name = nameRef.current.value;
      const userType = userTypeRef.current.value;
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/signup`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, userType }),
        });
        const data = await res.json();
        alert(data.message);
        if (res.ok) setIsLogin(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (user) {
          navigate("/");
        }
        alert(data.message);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                placeholder="John"
                ref={nameRef}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="john@gmail.com"
              ref={emailRef}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="Enter Password"
              ref={passwordRef}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Confirm Password"
                  ref={confirmPasswordRef}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">User Type</label>
                <select
                  ref={userTypeRef}
                  className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="user">User</option>
                  <option value="host">Host</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-500 font-semibold hover:underline"
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
