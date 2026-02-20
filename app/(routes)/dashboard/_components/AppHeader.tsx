"use client";

import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  LayoutDashboard, // ✅ Added
  History,
  DollarSign,
  User,
  LogOut,
  Stethoscope,
} from "lucide-react";

const menuOptions = [
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    id: 2,
    name: "Dashboard", // ✅ New
    path: "/dashboard", // ✅ Goes to dashboard
    icon: LayoutDashboard, // ✅ Dashboard icon
  },
  {
    id: 3,
    name: "History",
    path: "/dashboard/history",
    icon: History,
  },
  {
    id: 4,
    name: "Pricing",
    path: "/dashboard/billing",
    icon: DollarSign,
  },
  {
    id: 5,
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

function AppHeader() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    setShowProfileMenu(false);
  };

  return (
    <div
      className="flex items-center justify-between px-10 md:px-20 lg:px-40 py-4 
                 bg-[#0f1425]/95 backdrop-blur-md 
                 border-b border-indigo-500/10 shadow-lg"
    >
      {/* Logo */}
      <button
        onClick={() => handleNavigation("/")}
        className="flex items-center gap-2 group"
      >
        <div
          className="w-9 h-9 rounded-xl bg-gradient-to-br 
                     from-indigo-500 to-teal-500 
                     flex items-center justify-center 
                     shadow-lg shadow-indigo-500/20"
        >
          <Stethoscope className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">
          Cura
          <span className="bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
            AI
          </span>
        </span>
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6 items-center">
        {menuOptions.map((option) => {
          const IconComponent = option.icon;
          const isProfile = option.name === "Profile";

          if (isProfile) {
            return (
              <div key={option.id} className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg 
                             text-white/80 hover:text-indigo-400 
                             hover:bg-indigo-500/20 
                             transition-all duration-200"
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {option.name}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && isLoaded && user && (
                  <div
                    className="absolute right-0 mt-3 w-80 
                               bg-[#151b2f] rounded-xl 
                               shadow-2xl border border-indigo-500/10 
                               p-6 z-50"
                  >
                    {/* User Info */}
                    <div
                      className="flex items-center gap-4 pb-4 
                                 border-b border-indigo-500/10"
                    >
                      <div
                        className="w-14 h-14 rounded-full 
                                   bg-gradient-to-br 
                                   from-indigo-600 to-teal-600 
                                   flex items-center justify-center 
                                   text-white font-bold text-lg"
                      >
                        {user.firstName?.[0]}
                        {user.lastName?.[0]}
                      </div>

                      <div>
                        <h3 className="font-semibold text-white">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm text-white/60">
                          {user.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                    </div>

                    {/* Member Since */}
                    <div className="mt-4">
                      <p className="text-xs text-white/50 uppercase tracking-wide">
                        Member Since
                      </p>
                      <p className="text-sm text-white/80">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>

                    {/* Logout */}
                    <button
                      onClick={() => signOut({ redirectUrl: "/" })}
                      className="mt-6 flex items-center gap-2 px-4 py-2 
                                 bg-red-500/10 hover:bg-red-500/20 
                                 text-red-400 rounded-lg 
                                 transition-colors w-full justify-center"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={option.id}
              onClick={() => handleNavigation(option.path)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg 
                         text-white/80 hover:text-indigo-400 
                         hover:bg-indigo-500/20 
                         transition-all duration-200"
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-sm font-medium">
                {option.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default AppHeader;