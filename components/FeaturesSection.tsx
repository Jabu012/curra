"use client";


import { motion } from "framer-motion";
import {
  Mic,
  CalendarCheck,
  HeartPulse,
  Brain,
  Lock,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Start With a Simple Conversation",
    description:
      "No medical jargon. No complex forms. Just describe what you're feeling, and the system turns your words into structured health insights.",
    badge: "Experience",
  },
  {
    icon: HeartPulse,
    title: "Signals That Matter",
    description:
      "The platform detects meaningful symptom patterns and highlights areas that may require closer attention.",
    badge: "Clarity",
  },
  {
    icon: Brain,
    title: "Guidance — Not Guesswork",
    description:
      "Receive informed next-step suggestions to help you prepare before speaking to a healthcare professional.",
    badge: "Support",
  },
  {
    icon: CalendarCheck,
    title: "Know What to Do Next",
    description:
      "Whether it’s self-care, booking an appointment, or seeking urgent evaluation — you leave with direction.",
    badge: "Direction",
  },
  {
    icon: Lock,
    title: "Private by Default",
    description:
      "Your health information stays protected with secure storage practices and controlled access.",
    badge: "Trust",
  },
  {
    icon: BarChart3,
    title: "From Symptoms to Summary",
    description:
      "Every conversation becomes a clean, structured health summary you can download or share with a clinician.",
    badge: "Prepared",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-24 py-24 bg-[#0f1425]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Platform Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-sora font-bold text-white mb-4">
            Everything You Need to <br />
            <span className="text-gradient-to-r from-indigo-400 to-teal-400">Transform Patient Care</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            A complete AI voice platform built specifically for modern healthcare
            organizations — from solo practices to large hospital networks.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feat) => (
            <motion.div
              key={feat.title}
              variants={item}
              className="group bg-[#1a1f35] rounded-2xl p-7 border border-indigo-500/30 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-teal-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                  <feat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-primary bg-accent px-2.5 py-1 rounded-full">
                  {feat.badge}
                </span>
              </div>
              <h3 className="text-lg font-sora font-semibold text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
