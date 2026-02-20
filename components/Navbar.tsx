"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Menu,
  X,
  Home,
  History,
  DollarSign,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const navLinks = [
  { label: "Home", path: "/", icon: Home },
  { label: "History", path: "/dashboard/history", icon: History },
  { label: "Pricing", path: "/dashboard/billing", icon: DollarSign },
  
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f1425]/95 backdrop-blur-md shadow-lg border-b border-indigo-500/10"
          : "bg-[#0f1425]/70 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-sora font-bold text-white tracking-tight">
            Cura
            <span className="bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
              AI
            </span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                onClick={() => handleNavigation(link.path)}
                className={`p-2 rounded-lg transition-all duration-200 hover:bg-indigo-500/20 ${
                  scrolled
                    ? "text-white/70 hover:text-indigo-400"
                    : "text-white/80 hover:text-indigo-400 drop-shadow"
                }`}
                title={link.label}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-3">
          <SignedOut>
            <SignInButton>
              <button className="text-sm font-medium text-white/80 hover:text-indigo-400 transition-colors">
                Log In
              </button>
            </SignInButton>

            <SignUpButton>
              <Button
                size="sm"
                className="bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white shadow-lg"
              >
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-3">
              {/* Get Started Button */}
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 text-sm font-medium rounded-lg 
                           bg-gradient-to-r from-indigo-600 to-teal-600 
                           hover:from-indigo-500 hover:to-teal-500 
                           text-white shadow-md transition-all duration-200"
              >
                Get Started
              </button>

              {/* Clerk User Button */}
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0f1425]/98 border-t border-indigo-500/10 overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavigation(link.path)}
                    className="flex items-center gap-3 text-base font-medium transition-colors p-2 rounded-lg hover:bg-indigo-500/20 text-white/80 hover:text-indigo-400"
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </button>
                );
              })}

              <SignedOut>
                <SignUpButton>
                  <Button className="mt-2 w-full bg-gradient-to-r from-indigo-600 to-teal-600 text-white">
                    Get Started Free
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="mt-2 w-full px-4 py-2 rounded-lg 
                             bg-gradient-to-r from-indigo-600 to-teal-600 
                             text-white"
                >
                  Go to Dashboard
                </button>

                <div className="mt-4 flex justify-center">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}