"use client";

import { SignIn } from "@clerk/nextjs";
import { Stethoscope } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen bg-black">

      {/* LEFT SIDE */}
      <div className="relative hidden lg:flex w-1/2 items-center justify-center overflow-hidden bg-[#0a0f1c]">

        {/* Ambient glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-teal-500/25 rounded-full blur-[150px]" />

        {/* Main Content */}
        <div className="relative flex flex-col items-center">

          {/* Massive circle frame */}
          <div className="relative w-[480px] h-[480px] rounded-full 
                          bg-gradient-to-br from-indigo-600/20 to-teal-500/20
                          border border-white/10
                          backdrop-blur-xl
                          flex items-center justify-center
                          shadow-[0_0_120px_rgba(45,212,191,0.35)]">

            {/* Large Stethoscope */}
            <Stethoscope
              className="w-60 h-60 text-teal-400 drop-shadow-[0_0_50px_rgba(45,212,191,0.8)]"
              strokeWidth={1.5}
            />

          </div>

          {/* Branding */}
          <h1 className="mt-16 text-5xl font-semibold tracking-tight text-white">
            Cura
            <span className="bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
              AI
            </span>
          </h1>

          <p className="mt-4 text-xs tracking-[0.3em] uppercase text-gray-400">
            A production of Clever Names
          </p>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <SignIn />
      </div>

    </div>
  );
}