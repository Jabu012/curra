import React from "react";
import Image from "next/image";
import { doctorAgent } from "./DoctorsAgentCard";

type Props = {
  doctorAgent: doctorAgent;
  setSelectedDoctor: (doctor: doctorAgent) => void;
  selectedDoctor?: doctorAgent;
};

function SuggestedDoctorCard({
  doctorAgent,
  setSelectedDoctor,
  selectedDoctor,
}: Props) {
  const isSelected = selectedDoctor?.id === doctorAgent.id;

  return (
    <div
      onClick={() => setSelectedDoctor(doctorAgent)}
      className={`flex items-center gap-3 px-3 py-2 border rounded-md cursor-pointer transition
        ${
          isSelected
            ? "border-blue-600 bg-blue-50"
            : "border-gray-200 hover:border-gray-400"
        }`}
    >
      {/* Small Image */}
      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={32}
        height={32}
        className="rounded-full object-cover"
      />

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-medium text-gray-900">
          {doctorAgent.specialist}
        </span>
        <span className="text-xs text-gray-500 line-clamp-1">
          {doctorAgent.description}
        </span>
      </div>
    </div>
  );
}

export default SuggestedDoctorCard;
