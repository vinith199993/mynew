"use client"

import { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogOut, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await toast.promise(signOut(auth), {
        loading: (
          <div className="flex items-center">
            <span className="mr-2">Logging out...</span>
          </div>
        ),
        success: (
          <div className="flex items-center text-green-600">
            <span>Successfully logged out</span>
          </div>
        ),
        error: (e) => (
          <div className="flex items-center text-red-500">
            <span>Logout failed: {e?.message}</span>
          </div>
        ),
      });
    } catch (error) {
      toast.error(error?.message);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="group relative flex items-center justify-center 
          w-10 h-10 rounded-full 
          bg-white/10 hover:bg-purple-100/20 
          border border-white/20 
          shadow-sm hover:shadow-md 
          transition-all duration-300 
          focus:outline-none focus:ring-2 focus:ring-purple-400/50"
      >
        <LogOut 
          size={20} 
          className="text-gray-600 group-hover:text-purple-600 
            transition-colors duration-300 
            transform group-hover:scale-110"
        />
        <span className="absolute -top-2 -right-2 
          bg-purple-500 text-white 
          text-xs font-bold 
          w-5 h-5 rounded-full 
          flex items-center justify-center 
          opacity-0 group-hover:opacity-100 
          transition-all duration-300">
          ⤭
        </span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <div className="flex items-center mb-4">
              <AlertTriangle className="mr-3 text-yellow-500" size={24} />
              <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out? You'll need to sign in again to access your account.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}