"use client"
import { Heart, Search, ShoppingCart, UserCircle2, Menu } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AuthContextProvider from "@/contexts/AuthContext";
import HeaderClientButtons from "./HeaderClientButtons";
import AdminButton from "./AdminButton";
import { useState } from "react";
import "./logo.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuList = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about-us" },
    { name: "Contact", link: "/contact-us" },
  ];

  return (
    <nav className="header-container sticky top-0 z-50 bg-white bg-opacity-75 backdrop-blur-lg py-3 px-4 md:py-4 md:px-16 border-b flex items-center justify-between shadow-sm">
      <Link href={"/"}>
        <img
          className="logo h-6 md:h-8 transform hover:scale-105 transition-all"
          src="/logo.png"
          alt="Logo"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 items-center font-semibold text-gray-700">
        {menuList.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            target={item.name === "Contact" ? "_blank" : "_self"}
            rel={item.name === "Contact" ? "noopener noreferrer" : undefined}
          >
            <button className="text-lg tracking-wide hover:text-blue-400 transition-all duration-300">
              {item.name}
            </button>
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger Menu */}
      <button
        className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-gray-50 shadow-md hover:bg-blue-100 hover:shadow-lg transition-all"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-lg z-50 md:hidden">
          <div className="flex flex-col gap-4 p-4">
            {menuList.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                target={item.name === "Contact" ? "_blank" : "_self"}
                rel={item.name === "Contact" ? "noopener noreferrer" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <button className="text-lg font-semibold text-gray-700 hover:text-blue-400 transition-all duration-300">
                  {item.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Desktop and Mobile User Actions */}
      <div className="flex items-center gap-7">
        <AuthContextProvider>
          <AdminButton />
        </AuthContextProvider>
        <Link href={`/search`}>
          <button
            title="Search Products"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-50 shadow-md hover:bg-blue-100 hover:shadow-lg transition-all"
          >
            <Search size={18} />
          </button>
        </Link>
        <AuthContextProvider>
          <HeaderClientButtons />
        </AuthContextProvider>
        <Link href={`/account`}>
          <button
            title="My Account"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-50 shadow-md hover:bg-purple-100 hover:shadow-lg transition-all"
          >
            <UserCircle2 size={24} className="text-gray-600 hover:text-purple-500" />
          </button>
        </Link>
        <AuthContextProvider>
          <LogoutButton />
        </AuthContextProvider>
      </div>
    </nav>
  );
}
