"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { doctorAgent } from "../../_components/DoctorsAgentCard";
import { PhoneCall, PhoneOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

/* -------------------- Types -------------------- */

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: any;
  selectedDoctor: doctorAgent;
  createdOn: string;
  voiceId?: string;
};

type Message = {
  role: string;
  text: string;
};

/* -------------------- Component -------------------- */

function MedicalVoiceAgent() {
  const params = useParams();
  const sessionId = params?.sessionId as string;
  const router = useRouter();

  const [sessionDetail, setSessionDetail] =
    useState<SessionDetail | null>(null);

  const [callStarted, setCallStarted] = useState(false);
  const [connecting, setConnecting] = useState(false); // ✅ NEW
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const vapiRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  /* -------------------- Auto Scroll -------------------- */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, liveTranscript]);

  /* -------------------- Initialize Vapi -------------------- */

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;

    if (!publicKey) {
      console.error("Missing VAPI Public Key");
      return;
    }

    const vapi = new Vapi(publicKey);
    vapiRef.current = vapi;

    vapi.on("call-start", () => {
      setCallStarted(true);
      setConnecting(false); // ✅ stop connecting when live
    });

    vapi.on("call-end", () => {
      setCallStarted(false);
      setConnecting(false);
      setCurrentRole(null);
      setLiveTranscript("");
    });

    vapi.on("message", (message: any) => {
      if (!message || message.type !== "transcript") return;

      let { role, transcriptType, transcript } = message;
      
      // Normalize role names
      if (role === "user") role = "user";
      if (role === "assistant") role = "assistant";

      if (!transcript || transcript.trim() === "") return;

      if (transcriptType === "partial") {
        setLiveTranscript(transcript);
        setCurrentRole(role);
      }

      if (transcriptType === "final") {
        // Add message to conversation
        setMessages((prev) => {
          const newMessage = { role, text: transcript };
          return [...prev, newMessage].slice(-15); // Keep last 15 messages
        });
        setLiveTranscript("");
        setCurrentRole(null);
      }
    });

    vapi.on("error", () => {
      setCallStarted(false);
      setConnecting(false);
      setCurrentRole(null);
      setLiveTranscript("");
    });

    return () => {
      try {
        vapi.stop();
      } catch {}
    };
  }, []);

  /* -------------------- Fetch Session -------------------- */

  useEffect(() => {
    if (!sessionId) return;

    const GetSessionDetails = async () => {
      try {
        const result = await axios.get(
          "/api/session-chat?sessionId=" + sessionId
        );
        setSessionDetail(result.data);
      } catch (error) {
        console.error("Failed to fetch session:", error);
      }
    };

    GetSessionDetails();
  }, [sessionId]);

  /* -------------------- Call Handlers -------------------- */

  const StartCall = async () => {
    const assistantId =
      process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID;

    if (!assistantId || !vapiRef.current) {
      console.error("Missing Vapi configuration");
      return;
    }

    try {
      setConnecting(true);

      // ✅ Pre-warm microphone to avoid first sentence cut-off
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      stream.getTracks().forEach((track) => track.stop());

      await vapiRef.current.start(assistantId);
    } catch (error) {
      console.error("Start call failed:", error);
      setConnecting(false);
      toast.error("Failed to start call");
    }
  };

  const GenerateReport = async () => {
    if (!sessionDetail) return;

    try {
      const result = await axios.post("/api/medical-report", {
        messages,
        sessionDetail,
        sessionId,
      });

      return result.data;
    } catch (error) {
      console.error("Report generation failed:", error);
      throw error;
    }
  };

  const endCall = async () => {
    if (!vapiRef.current) return;

    try {
      setLoading(true);

      vapiRef.current.stop();
      setCallStarted(false);

      toast.info("Generating medical report...");

      await GenerateReport();

      toast.success("Report generated successfully");

      router.replace("/dashboard/history");
    } catch (error) {
      toast.error("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="p-5 border rounded-3xl">
      <div className="w-full min-h-screen bg-blue-50/50 rounded-t-[40px] shadow-inner px-12 pt-10">

        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 py-4 bg-white border rounded-xl shadow-sm">
          <div
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
              callStarted
                ? "bg-green-50 text-green-700 border border-green-200"
                : connecting
                ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                callStarted
                  ? "bg-green-500"
                  : connecting
                  ? "bg-yellow-500 animate-pulse"
                  : "bg-red-500"
              }`}
            />
            {callStarted
              ? "Connected"
              : connecting
              ? "Connecting..."
              : "Not Connected"}
          </div>

          <div className="text-sm font-medium text-gray-500">
            {callStarted
              ? "Live Consultation"
              : connecting
              ? "Establishing secure connection..."
              : "Ready to Connect"}
          </div>
        </div>

        {sessionDetail && (
          <div className="flex flex-col items-center mt-20">

            <Image
              src={sessionDetail.selectedDoctor?.image}
              alt={sessionDetail.selectedDoctor?.specialist ?? ""}
              width={160}
              height={160}
              className="w-[130px] h-[130px] rounded-full object-cover border-4 border-indigo-200 shadow-lg"
            />

            <h2 className="mt-6 font-semibold text-2xl text-gray-800">
              {sessionDetail.selectedDoctor?.specialist}
            </h2>

            <p className="text-sm text-gray-600">
              AI Medical Voice Agent
            </p>

            <div className="mt-10">
              {!callStarted ? (
                <Button
                  onClick={StartCall}
                  disabled={loading || connecting}
                  className="bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500"
                >
                  {connecting ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    <PhoneCall className="mr-2" />
                  )}
                  {connecting ? "Connecting..." : "Start Call"}
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  onClick={endCall}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    <PhoneOff className="mr-2" />
                  )}
                  End Consultation
                </Button>
              )}
            </div>

            {/* Enhanced Conversation Display */}
            <div className="mt-12 w-full max-w-3xl bg-gradient-to-b from-white to-indigo-50/30 rounded-3xl shadow-xl p-8 border border-indigo-100">
              <div className="h-[500px] overflow-y-auto flex flex-col space-y-4 pr-4">
                {messages.length === 0 && !liveTranscript && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm">No messages yet</p>
                      <p className="text-gray-300 text-xs mt-1">Start the call to begin consultation</p>
                    </div>
                  </div>
                )}

                {messages.map((msg, index) => {
                  const isAssistant = msg.role === "assistant";
                  const isUser = msg.role === "user" || msg.role === "patient";
                  
                  return (
                    <div
                      key={index}
                      className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {isAssistant && (
                        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-teal-600 flex items-center justify-center shadow-md">
                          <span className="text-white text-xs font-bold">Dr</span>
                        </div>
                      )}
                      <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                        isAssistant
                          ? "bg-indigo-50 text-gray-800 border border-indigo-200 rounded-bl-3xl shadow-sm"
                          : "bg-gradient-to-r from-indigo-600 to-teal-600 text-white rounded-br-3xl shadow-md"
                      }`}>
                        {msg.text}
                      </div>
                      {isUser && (
                        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md">
                          <span className="text-white text-xs font-bold">You</span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {(currentRole === "assistant" || currentRole === "user") && liveTranscript && (
                  <div className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                    currentRole === "user" ? "justify-end" : "justify-start"
                  }`}>
                    {currentRole === "assistant" && (
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-teal-600 flex items-center justify-center shadow-md">
                        <span className="text-white text-xs font-bold">Dr</span>
                      </div>
                    )}
                    <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-5 py-3 rounded-2xl text-sm ${
                      currentRole === "assistant"
                        ? "bg-indigo-50 text-gray-800 border-2 border-indigo-400 rounded-bl-3xl"
                        : "bg-gradient-to-r from-indigo-600 to-teal-600 text-white rounded-br-3xl"
                    }`}>
                      <div className="flex gap-2 items-center mb-2">
                        <span className="inline-block w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: "0s"}} />
                        <span className="inline-block w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: "0.1s"}} />
                        <span className="inline-block w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: "0.2s"}} />
                      </div>
                      <span className="text-xs opacity-75">{liveTranscript}</span>
                    </div>
                    {currentRole === "user" && (
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md">
                        <span className="text-white text-xs font-bold">You</span>
                      </div>
                    )}
                  </div>
                )}

                <div ref={messagesEndRef} className="mt-2" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalVoiceAgent;
