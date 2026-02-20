"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (800) 287-2644",
    sub: "Mon–Fri, 8am–6pm EST",
    href: "tel:+18002872644",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@curaai.health",
    sub: "We respond within 2 hours",
    href: "mailto:hello@curaai.health",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "350 Fifth Avenue, Suite 6400",
    sub: "New York, NY 10118, USA",
    href: "https://maps.google.com",
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "24/7 Technical Support",
    sub: "Critical incidents covered always",
    href: "#contact",
  },
];

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    org: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-24 bg-gradient-to-br from-indigo-950 via-indigo-900 to-teal-900 text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-sora font-bold text-white mb-4">
            Ready to Transform{" "}
            <span className="text-gradient-to-r from-indigo-400 to-teal-400">Your Practice?</span>
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Schedule a personalized demo or reach out to our team — we'll show
            you CuraAI in action within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-indigo-500/30 bg-[#1a1f35]/80 backdrop-blur-sm hover:border-indigo-500/50 hover:bg-[#1a1f35]/90 transition-all duration-300 text-white"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-white font-medium text-sm">
                    {item.value}
                  </div>
                  <div className="text-white/60 text-xs mt-0.5">
                    {item.sub}
                  </div>
                </div>
              </a>
            ))}

            {/* Social */}
            <div className="pt-4 flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-500/50 bg-indigo-600 text-white hover:bg-indigo-500 hover:border-indigo-400 transition-all text-sm font-medium"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-500/50 bg-indigo-600 text-white hover:bg-indigo-500 hover:border-indigo-400 transition-all text-sm font-medium"
              >
                <Twitter className="w-4 h-4" />
                Twitter / X
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-teal-600 flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/20">
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-sora font-bold text-white mb-2">
                  Message Received!
                </h3>
                <p className="text-white/60">
                  Our team will reach out within 2 business hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#0f1425]/80 backdrop-blur-sm border border-indigo-500/50 rounded-2xl p-7 space-y-5 text-white"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Dr. Jane Smith"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1a1f35] border border-indigo-500/30 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-indigo-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-2">
                      Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@clinic.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1a1f35] border border-indigo-500/30 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-indigo-400 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    placeholder="City Medical Center"
                    value={formState.org}
                    onChange={(e) => setFormState({ ...formState, org: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1f35] border border-indigo-500/30 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-2">
                    How can we help? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your organization's needs..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1f35]/90 border border-indigo-500/50 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-indigo-400 transition-colors resize-none"
                  />
                </div>
                <Button type="submit" variant="cta" className="w-full" size="lg">
                  Send Message
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <p className="text-center text-xs text-white/35">
                  By submitting you agree to our Privacy Policy. Your data is never sold.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
