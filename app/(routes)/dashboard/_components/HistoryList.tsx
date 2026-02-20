"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import AddNewSessionDialog from "./AddNewSessionDialog";
import HistoryTable from "./HistoryTable";
import { SessionDetail } from "../medical-agent/[sessionId]/page";

function HistoryList() {
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);

  useEffect(() => {
    GetHistoryList();
  }, []);

  const GetHistoryList = async () => {
    const result = await axios.get("/api/session-chat?sessionId=all");
    setHistoryList(result.data);
  };

  return (
    <div>
      {historyList.length === 0 ? (
        <div className="flex items-center flex-col justify-center gap-5">
          <Image
            src="/medical-assistance.png"
            alt="empty"
            width={150}
            height={150}
          />

          <h2 className="font-bold text-xl">No Recent Consultations</h2>
          <p>You haven't consulted with any doctors yet.</p>

          <AddNewSessionDialog />
        </div>
      ) : (
        <HistoryTable historyList={historyList} />
      )}
    </div>
  );
}

export default HistoryList;
