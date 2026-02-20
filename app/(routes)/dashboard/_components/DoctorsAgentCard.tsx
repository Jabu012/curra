"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId?: string;
  subscriptionRequired: boolean;
};

type Props = {
  doctorAgent: doctorAgent;
};

function DoctorAgentCard({ doctorAgent }: Props) {
  const [loading, setLoading] = useState(false);
  const { has } = useAuth();
  const router = useRouter();

  const paidUser = has?.({ plan: "pro" }) ?? false;

  const onStartConsultation = async () => {
    try {
      setLoading(true);

      const result = await axios.post("/api/session-chat", {
        notes: "New Conversation",
        selectedDoctor: doctorAgent,
      });

      if (result.data?.sessionId) {
        router.push(
          "/dashboard/medical-agent/" + result.data.sessionId
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {doctorAgent.subscriptionRequired && (
        <Badge className="absolute m-2 right-0 z-10">
          Premium
        </Badge>
      )}

      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={300}
        className="w-full h-[250px] object-cover rounded-xl"
      />

      <h2 className="font-bold mt-2">
        {doctorAgent.specialist}
      </h2>

      <p className="line-clamp-2 text-sm text-gray-500">
        {doctorAgent.description}
      </p>

      <Button
        className="w-full mt-3"
        onClick={onStartConsultation}
        disabled={loading || (!paidUser && doctorAgent.subscriptionRequired)}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            Starting...
          </>
        ) : (
          <>
            Begin Consultation
            <IconArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}

export default DoctorAgentCard;