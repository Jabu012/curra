"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { doctorAgent } from "./DoctorsAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";

function AddNewSessionDialog() {
  const [note, setNote] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] =
    useState<doctorAgent[] | null>(null);

  const [selectedDoctor, setSelectedDoctor] =
    useState<doctorAgent | null>(null);

  const router = useRouter();

  const OnClickNext = async () => {
    try {
      setLoading(true);

      const result = await axios.post("/api/suggest-doctors", {
        notes: note,
      });

      setSuggestedDoctors(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onStartConsultation = async () => {
    if (!selectedDoctor) return;

    try {
      setLoading(true);

      const result = await axios.post("/api/session-chat", {
        notes: note,
        selectedDoctor: selectedDoctor,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4">
          ✚ Consult With a Doctor
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>

          <DialogDescription asChild>
            {!suggestedDoctors ? (
              <div>
                <h2 className="font-semibold mb-2">
                  Step 1: Describe Your Symptoms
                </h2>

                <Textarea
                  placeholder="Describe your symptoms in detail..."
                  className="h-[200px] mt-1"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <h2 className="font-bold text-lg mb-2">
                  Step 2: Select Your Doctor
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                  Please click on a doctor card below to select your
                  preferred specialist before beginning consultation.
                </p>

                <div className="grid grid-cols-3 gap-5">
                  {suggestedDoctors.map((doctor, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedDoctor(doctor)}
                      className={`cursor-pointer transition-all duration-200 rounded-xl ${
                        selectedDoctor?.id === doctor.id
                          ? "ring-2 ring-blue-500 scale-[1.02]"
                          : "hover:scale-[1.02]"
                      }`}
                    >
                      <SuggestedDoctorCard
                        doctorAgent={doctor}
                        setSelectedDoctor={() =>
                          setSelectedDoctor(doctor)
                        }
                        selectedDoctor={selectedDoctor ?? undefined}
                      />
                    </div>
                  ))}
                </div>

                {!selectedDoctor && (
                  <p className="text-sm text-red-500 mt-4 font-medium">
                    You must select a doctor before beginning consultation.
                  </p>
                )}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          {!suggestedDoctors ? (
            <Button
              disabled={!note.trim() || loading}
              onClick={OnClickNext}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : null}
              Next
              {!loading && <ArrowRight className="ml-2" />}
            </Button>
          ) : (
            <Button
              disabled={loading || !selectedDoctor}
              onClick={onStartConsultation}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : null}
              Begin Consultation
              {!loading && <ArrowRight className="ml-2" />}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
