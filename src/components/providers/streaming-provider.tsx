"use client";

import DailyIframe, { DailyCall, DailyEvent } from "@daily-co/daily-js";
import { DailyProvider, useDaily } from "@daily-co/daily-react";
import { useCallback, useEffect, useState, FC, ReactNode } from "react";

const ROOM_URL = process.env.NEXT_PUBLIC_ROOM_URL as string;

export function useJoinedDailyApp() {
  const callObject = useDaily();
  const joinCall = useCallback(() => {
    if (!ROOM_URL || !callObject) {
      return;
    }
    callObject.join({ url: ROOM_URL });
  }, [callObject]);

  return { joinCall };
}

export function useLeaveDailyApp() {
  const callObject = useDaily();
  const leaveCall = useCallback(() => {
    if (!ROOM_URL || !callObject) {
      return;
    }
    callObject.leave();
  }, [callObject]);

  return { leaveCall };
}

type DailyAppType = {
  children: ReactNode;
};

export const StreamingProvider: FC<DailyAppType> = ({ children }) => {
  const [callObject, setCallObject] = useState<DailyCall | null>(null);

  const startHairCheck = useCallback(async (url: string) => {
    const newCallObject = DailyIframe.createCallObject();
    await newCallObject.preAuth({ url });
    await newCallObject.startCamera();
    setCallObject(newCallObject);
  }, []);

  useEffect(() => {
    startHairCheck(ROOM_URL);
  }, [startHairCheck]);

  useEffect(() => {
    if (!callObject) return;

    const events: DailyEvent[] = [
      "joined-meeting",
      "left-meeting",
      "error",
      "camera-error",
    ];

    function handleNewMeetingState() {
      if (!callObject) return;

      switch (callObject.meetingState()) {
        case "joined-meeting":
          console.log("setIsJoined");
          break;
        case "left-meeting":
          callObject.destroy().then(() => {
            setCallObject(null);
          });
          break;
        case "error":
          console.log("error");
          break;
        default:
          break;
      }
    }

    handleNewMeetingState();

    events.forEach((event) => callObject.on(event, handleNewMeetingState));

    return () => {
      events.forEach((event) => callObject.off(event, handleNewMeetingState));
    };
  }, [callObject]);

  return (
    <DailyProvider callObject={callObject as DailyCall}>
      {children}
    </DailyProvider>
  );
};
