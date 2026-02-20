"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mic, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser, SignUpButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const words = [
  "Elevate",
  "Healthcare",
  "Delivery",
  "with",
  "Smart",
  "AI",
  "Voice",
  "Solutions",
];

function AuthAwareCTA() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // Don't render anything until Clerk has loaded
  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return (
            <Button
        variant="cta"
        size="lg"
        onClick={() => router.push('/dashboard')}
        className="bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white shadow-lg"
      >
        Go to Dashboard
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    );
  }

  return (
    <SignUpButton>
      <Button
        variant="cta"
        size="lg"
        asChild
        className="bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white shadow-lg"
      >
        <a>
          Get Started Free
          <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </Button>
    </SignUpButton>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f1425]">
      
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* darker tint for contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f35]/80 to-[#0f1425]/80 pointer-events-none" />

      {/* Grid Lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(hsl(185,85%,50%) 1px, transparent 1px), linear-gradient(90deg, hsl(185,85%,50%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-indigo-500/8 blur-[80px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 pt-32 pb-20 text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Trusted by Leading Healthcare Providers
        </motion.div>

        {/* AI Voice Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-teal-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Mic className="w-9 h-9 text-white" />
            </div>

            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse-ring" />

            <div className="absolute top-1/2 -translate-y-1/2 left-full ml-3 flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`left-${i}`}
                  className="w-1 bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-full"
                  animate={{
                    height: [4, 16, 4],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            {/* Sound waves (right) */}
            <div className="absolute top-1/2 -translate-y-1/2 right-full mr-3 flex items-center gap-1">
              {[4, 3, 2, 1, 0].map((i) => (
                <motion.div
                  key={`right-${i}`}
                  className="w-1 bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-full"
                  animate={{
                    height: [4, 16, 4],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold text-white drop-shadow-2xl leading-[1.1] mb-6 max-w-4xl mx-auto"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
              className={`inline-block mr-[0.3em] ${
                word === "AI" || word === "Voice"
                  ? "bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent"
                  : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Enable intelligent voice-powered healthcare that delivers accurate
          guidance instantly while automating appointments, symptom assessment,
          and continuous care — 24/7.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.95 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          {/* main CTA changes based on auth state */}
          <AuthAwareCTA />

          <Button variant="outline" size="lg" asChild className="border border-indigo-400/50 text-indigo-300 hover:bg-indigo-500/10">
            <a href="#features">See How It Works</a>
          </Button>
        </motion.div>

        {/* Stats */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10"
        >
          {[
            { icon: Shield, text: "HIPAA Compliant" },
            { icon: Clock, text: "99.9% Uptime SLA" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 text-white/40 text-sm"
            >
              <Icon className="w-4 h-4 text-indigo-400" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
