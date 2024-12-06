"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { Badge } from "@nextui-org/react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function HeaderClientButtons() {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });
  return (
    <div className="flex items-center gap-7">
      <Link href={`/favorites`}>
        {(data?.favorites?.length ?? 0) != 0 && (
          <Badge
            variant="solid"
            size="sm"
            className="text-white bg-red-500 text-[8px]"
            content={data?.favorites?.length ?? 0}
          >
            <button
              title="My Favorites"
              className="flex items-center justify-center h-5 w-5 rounded-full bg-gray-50 shadow-md hover:bg-purple-100 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <Heart size={24} className="text-gray-600 hover:text-purple-500" />
            </button>
          </Badge>
        )}
        {(data?.favorites?.length ?? 0) === 0 && (
          <button
            title="My Favorites"
            className="flex items-center justify-center h-5 w-5 rounded-full bg-gray-50 shadow-md hover:bg-purple-100 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <Heart size={24} className="text-gray-600 hover:text-purple-500" />
          </button>
        )}
      </Link>
      <Link href={`/cart`}>
        {(data?.carts?.length ?? 0) != 0 && (
          <Badge
            variant="solid"
            size="sm"
            className="text-white bg-red-500 text-[8px]"
            content={data?.carts?.length ?? 0}
          >
            <button
              title="My Cart"
              className="flex items-center justify-center h-5 w-5 rounded-full bg-gray-50 shadow-md hover:bg-purple-100 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <ShoppingCart size={24} className="text-gray-600 hover:text-purple-500" />
            </button>
          </Badge>
        )}
        {(data?.carts?.length ?? 0) === 0 && (
          <button
            title="My Cart"
            className="flex items-center justify-center h-5 w-5 rounded-full bg-gray-50 shadow-md hover:bg-purple-100 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <ShoppingCart size={24} className="text-gray-600 hover:text-purple-500" />
          </button>
        )}
      </Link>
    </div>
  );
}
