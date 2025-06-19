import React from "react";

function UserProfileCard({ onLogout, user }) {
  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-6 border border-blue-100">
      <div className="flex items-center space-x-4">
        <img
          src={`https://ui-avatars.com/api/?name=${user.username}&background=3b82f6&color=fff&size=128`}
          alt="User avatar"
          className="h-16 w-16 rounded-full border-2 border-blue-500 object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {user.username}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default UserProfileCard;
