"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Built with clinical-grade AI trained on 50M+ patient interactions",
  "Seamless EHR integration — Epic, Cerner, Athenahealth & more",
  "Deployed across 500+ healthcare facilities in 30 countries",
  "Average 40% reduction in administrative workload",
  "Continuous model updates without service interruption",
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
                alt="CuraAI healthcare technology platform"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0f1425]/70 to-transparent" />

              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#1a1f35]/80 backdrop-blur-sm rounded-xl p-4 border border-indigo-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-teal-600 flex items-center justify-center">
                    <span className="text-white text-lg font-bold font-sora">
                      98
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      Patient Satisfaction Score
                    </div>
                    <div className="text-white/50 text-xs">
                      Based on 120,000+ interactions this quarter
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
              About CuraAI
            </span>
<h2 className="text-3xl md:text-4xl font-sora font-bold text-blue-600 mb-5 leading-tight">
  Built by Clinicians,{" "}
              <span className="text-gradient-to-r from-indigo-400 to-teal-400">Powered by AI</span>
            </h2>

            <p className="text-white/70 text-base leading-relaxed mb-6">
              CuraAI was founded by a team of physicians, data scientists, and
              healthcare technologists who saw firsthand how administrative
              burden was eroding the quality of patient care. Our mission is
              simple: let clinicians focus on what matters most — their
              patients.
            </p>

            <p className="text-white/70 text-base leading-relaxed mb-8">
              Our platform uses state-of-the-art large language models
              fine-tuned on de-identified clinical data, ensuring accurate,
              context-aware interactions that feel natural and trustworthy to
              patients.
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
