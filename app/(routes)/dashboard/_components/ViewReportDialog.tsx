"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { SessionDetail } from "../medical-agent/[sessionId]/page";

type Props = {
  record: SessionDetail;
};

function ViewReportDialog({ record }: Props) {
  const report = record.report;

  if (!report) {
    return (
      <Button variant="outline" disabled>
        No Report
      </Button>
    );
  }

  const getSeverityStyle = (severity: string) => {
    const value = severity?.toLowerCase();
    if (value === "mild")
      return "bg-green-100 text-green-700";
    if (value === "moderate")
      return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-700";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          View Report
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">

        {/* Header */}
        <div className="px-8 py-6 border-b bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Medical AI Voice Agent Report
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6 grid grid-cols-2 gap-y-4 gap-x-12 text-sm">

            <Info label="Doctor" value={report.agent} />
            <Info label="User" value={report.user} />

            <Info
              label="Consulted On"
              value={moment(report.timestamp).format(
                "MMMM Do YYYY, h:mm a"
              )}
            />

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Severity
              </p>
              <span
                className={`inline-block mt-1 px-3 py-1 text-xs font-medium rounded ${getSeverityStyle(
                  report.severity
                )}`}
              >
                {report.severity}
              </span>
            </div>

          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-8 space-y-8 bg-white text-gray-800">

          <Section title="Chief Complaint">
            {report.chiefComplaint}
          </Section>

          <Section title="Summary">
            {report.summary}
          </Section>

          {report.symptoms?.length > 0 && (
            <Section title="Symptoms">
              <ul className="list-disc list-inside space-y-1 mt-2">
                {report.symptoms.map((sym: string, i: number) => (
                  <li key={i}>{sym}</li>
                ))}
              </ul>
            </Section>
          )}

          <Section title="Duration">
            {report.duration}
          </Section>

          {report.medicationsMentioned?.length > 0 && (
            <Section title="Medications Mentioned">
              <ul className="list-disc list-inside space-y-1 mt-2">
                {report.medicationsMentioned.map(
                  (med: string, i: number) => (
                    <li key={i}>{med}</li>
                  )
                )}
              </ul>
            </Section>
          )}

          {report.recommendations?.length > 0 && (
            <Section title="Recommendations">
              <ul className="list-disc list-inside space-y-1 mt-2">
                {report.recommendations.map(
                  (rec: string, i: number) => (
                    <li key={i}>{rec}</li>
                  )
                )}
              </ul>
            </Section>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Reusable Components ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b pb-2">
        {title}
      </h2>
      <div className="mt-3 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-gray-900">
        {value}
      </p>
    </div>
  );
}

export default ViewReportDialog;
