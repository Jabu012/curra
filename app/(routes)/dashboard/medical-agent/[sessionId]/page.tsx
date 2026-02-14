"use client"

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { doctorAgent } from "../../_components/DoctorsAgentCard";
import { Circle, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";

/* -------------------- Types -------------------- */

type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: any;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

type Message = {
  role: string;
  text: string;
};

/* -------------------- Component -------------------- */

function MedicalVoiceAgent() {
  const params = useParams();
  const sessionId = params?.sessionId as string;

  const [sessionDetail, setSessionDetail] = useState<SessionDetail | undefined>();
  const [callStarted, setCallStarted] = useState(false);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const vapiRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  /* -------------------- Auto Scroll -------------------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, liveTranscript]);

  /* -------------------- Initialize Vapi -------------------- */
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_VAPI_API_KEY) return;

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
    vapiRef.current = vapi;

    vapi.on("call-start", () => setCallStarted(true));
    vapi.on("call-end", () => setCallStarted(false));
    vapi.on("speech-start", () => setCurrentRole("assistant"));
    vapi.on("speech-end", () => setCurrentRole("user"));

    vapi.on("message", (message: any) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;

        if (transcriptType === "partial") {
          setLiveTranscript(transcript);
          setCurrentRole(role);
        }

        if (transcriptType === "final") {
          setMessages((prev) => {
            const updated = [...prev, { role, text: transcript }];
            return updated.slice(-4);
          });

          setLiveTranscript("");
          setCurrentRole(null);
        }
      }
    });

    return () => {
      vapi.stop();
    };
  }, []);

  /* -------------------- Fetch Session -------------------- */

  useEffect(() => {
    if (sessionId) {
      GetSessionDetails();
    }
  }, [sessionId]);

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

  /* -------------------- Call Handlers -------------------- */

  const StartCall = () => {
    const vapi = vapiRef.current;
    if (!vapi || !process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID) return;
    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
  };

  const endCall = () => {
    const vapi = vapiRef.current;
    if (!vapi) return;
    vapi.stop();
    setCallStarted(false);
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="p-5 border rounded-3xl text-secondary">
      <div className="w-full min-h-screen bg-blue-50/50 rounded-t-[40px] shadow-inner px-12 pt-10">

        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <h2 className="px-4 py-1 border rounded-full flex gap-2 items-center text-sm text-gray-600">
            <Circle
              className={`h-4 w-4 ${
                callStarted ? "text-green-500" : "text-red-500"
              }`}
            />
            {callStarted ? "Connected" : "Not Connected"}
          </h2>

          <h2 className="font-semibold text-gray-400">00:00</h2>
        </div>

        {sessionDetail && (
          <div className="flex flex-col items-center mt-20">

            <Image
              src={sessionDetail.selectedDoctor.image}
              alt={sessionDetail.selectedDoctor.specialist ?? ""}
              width={160}
              height={160}
              className="w-[130px] h-[130px] rounded-full object-cover border-4 border-white shadow-lg"
            />

            <h2 className="mt-6 font-semibold text-2xl text-gray-800">
              {sessionDetail.selectedDoctor.specialist}
            </h2>

            <p className="text-sm text-gray-700">
              AI Medical Voice Agent
            </p>

            {/* Button locked in its own section */}
            <div className="mt-6">
              {!callStarted ? (
                <Button onClick={StartCall}>
                  <PhoneCall className="mr-2" />
                  Start Call
                </Button>
              ) : (
                <Button variant="destructive" onClick={endCall}>
                  <PhoneOff className="mr-2" />
                  Disconnect
                </Button>
              )}
            </div>

            {/* Transcript Container (Cannot overflow upward now) */}
            <div className="mt-10 h-[220px] w-full max-w-xl overflow-hidden flex flex-col justify-end items-center space-y-3">

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 rounded-xl max-w-[70%] text-sm font-medium
                    ${
                      msg.role === "assistant"
                        ? "bg-blue-100 text-blue-900"
                        : "bg-gray-200 text-gray-800"
                    }
                  `}
                >
                  {msg.text}
                </div>
              ))}

              {liveTranscript.length > 0 && (
                <div className="px-4 py-2 rounded-xl bg-green-100 text-green-900 text-sm font-semibold animate-pulse">
                  {liveTranscript}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalVoiceAgent;
