"use client";

import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const { user } = useAuth();
  if (!user) {
    return <></>;
  }
  return (
    <button
      onClick={async () => {
        if (!confirm("Are you sure?")) return;
        try {
          await toast.promise(signOut(auth), {
            error: (e) => e?.message,
            loading: "Loading...",
            success: "Successfully Logged out",
          });
        } catch (error) {
          toast.error(error?.message);
        }
      }}
      className="flex items-center justify-center h-5 w-5 rounded-full bg-gray-50 shadow-md hover:bg-purple-100 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
    >
      <LogOut size={24} className="text-gray-600 hover:text-purple-500" />
    </button>
  );
}
