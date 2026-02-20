"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Designed to structure symptom conversations into clear summaries",
  "Built to support — not replace — professional medical evaluation",
  "Focused on clarity, usability, and patient confidence",
  "Developed with input from clinicians and health technology builders",
  "Continuously refined to improve guidance quality and safety",
];

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-24 bg-[#0f1425]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-lg shadow-indigo-500/20">
              <img
                src="/hero-bg.jpg"
                alt="AI-powered symptom support platform interface"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0f1425]/70 to-transparent" />

              {/* Floating card — honest version */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#1a1f35]/80 backdrop-blur-sm rounded-xl p-4 border border-indigo-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-teal-600 flex items-center justify-center">
                    <span className="text-white text-sm font-bold font-sora">
                      AI
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      Conversation-Based Symptom Support
                    </div>
                    <div className="text-white/50 text-xs">
                      Designed to help users prepare before seeking care
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">
              About the Platform
            </span>

            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-5 leading-tight">
              Built Around Real Conversations,{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
                Not Complex Forms
              </span>
            </h2>

            <p className="text-white/70 text-base leading-relaxed mb-6">
              This platform was created to make early health conversations
              clearer and more structured. Instead of overwhelming users with
              medical terminology, it starts with something simple — describing
              how you feel.
            </p>

            <p className="text-white/70 text-base leading-relaxed mb-8">
              Using modern language models, the system organizes symptom input
              into structured summaries and practical next-step guidance. It is
              designed to support informed decision-making — not to diagnose or
              replace healthcare professionals.
            </p>

            <ul className="space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}