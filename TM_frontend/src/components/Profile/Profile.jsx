import React, { useContext } from "react";
import profile from "../../../public/images/profile1.jpeg";
import { UserContext } from "../../store/userStore";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center max-w-xs">
          <img
            src={user?.imageUrl || profile}
            alt="Profile"
            className="w-15 h-15 rounded-full border-4 border-teal-400 object-cover"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {user?.name || "John Doe"}
          </h2>
          <p className="text-gray-500 text-md">
            {user?.email || "johndoe@gmail.com"}
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t"></div>

        {/* Info */}
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 text-lg">Role</span>
            <span className="font-medium text-lg text-gray-800">
              {user?.role || "User"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 text-lg">Joined</span>
            <span className="font-medium text-lg text-gray-800">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Jan 2025"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
