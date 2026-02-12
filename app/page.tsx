"use client";
import { motion } from "motion/react";
import { Link, Stethoscope } from "lucide-react";
import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function HeroSectionOne() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-white dark:bg-[#050814]">
      <Navbar />

      {/* Decorative Lines */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/60 dark:bg-white/10" />
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/60 dark:bg-white/10" />
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/60 dark:bg-white/10" />

      <div className="relative px-6 pt-36 pb-24 md:pt-44 md:pb-32">

        {/* Strong AI Glow */}
        <div className="absolute inset-0 -z-10 flex justify-center">
          <div className="h-[32rem] w-[32rem] rounded-full 
          bg-gradient-to-br from-blue-600/30 via-cyan-500/30 to-emerald-500/30 
          blur-3xl dark:from-blue-700/30 dark:via-cyan-600/30 dark:to-emerald-600/30" />
        </div>

        {/* AI Healthcare Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-14 flex justify-center"
        >
          <div
            className="relative flex items-center justify-center w-24 h-24 rounded-2xl 
            bg-gradient-to-br from-blue-700 via-blue-800 to-cyan-600
            shadow-2xl shadow-blue-800/50"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/25 to-transparent" />
            <Stethoscope className="w-12 h-12 text-white relative z-10" />
            <div className="absolute inset-0 rounded-2xl ring-4 ring-emerald-400/40 animate-pulse" />
          </div>
        </motion.div>

        {/* Heading */}
        <h1 className="relative z-10 mx-auto max-w-4xl text-center 
          text-4xl font-extrabold tracking-tight 
          text-slate-900 md:text-6xl lg:text-7xl 
          dark:text-white leading-tight"
        >
          {"Elevate Healthcare Delivery with Smart AI Voice Solutions"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                }}
                className="mr-3 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="relative z-10 mx-auto mt-8 max-w-2xl text-center 
          text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
        >
  Enable intelligent voice-powered healthcare that delivers accurate
  guidance instantly while automating appointments, symptom assessment,
  and continuous care 24/7.
</motion.p>

<Link href={"/sign-in"}>
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.9 }}
    className="relative z-10 mt-14 flex flex-wrap items-center justify-center gap-6"
  >
    <button
      className="w-56 rounded-xl 
        bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-500
        px-6 py-3 text-sm font-semibold text-white 
        shadow-xl shadow-blue-800/40
        transition hover:-translate-y-1 hover:shadow-2xl"
    >
      Get Started
    </button>
  </motion.div>
</Link>
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="relative z-10 mt-32 rounded-3xl border border-neutral-200 
          bg-neutral-100 p-6 shadow-2xl 
          dark:border-white/10 dark:bg-[#0B1120]"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="https://assets.aceternity.com/pro/aceternity-landing.webp"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>

      </div>

      <FeatureBentoGrid />
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-[#050814]/80 border-b border-neutral-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Cura Logo"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-700 dark:ring-cyan-500"
          />
          <h1 className="text-lg font-semibold text-slate-800 dark:text-white">
            Cura
          </h1>
        </div>

        {!user ? (
          <Link href="/sign-in">
            <button className="rounded-xl bg-blue-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-900 dark:bg-cyan-500 dark:hover:bg-cyan-400">
              Login
            </button>
          </Link>
        ) : (
          <div className="flex gap-5 items-center">
            <UserButton />
            <Button>Dashboard</Button>
          </div>
        )}

      </div>
    </nav>
  );
};
