"use client";

import { joinState } from "@/store/join-store";
import {
  useDailyEvent,
  useScreenShare,
  useParticipantIds,
  useLocalParticipant,
  DailyAudio,
} from "@daily-co/daily-react";
import { useCallback, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { Tile } from "./streaming/tile";

export const Webcam = () => {
  const { isDailyJoined } = useRecoilValue(joinState);

  if (!isDailyJoined) return null;

  return <Call />;
};

const Call = () => {
  useDailyEvent(
    "camera-error",
    useCallback((error) => {
      toast.error(
        "Device acquisition problem. Please check the complete information in the developer tools."
      );
      console.error(error);
    }, [])
  );

  const { screens } = useScreenShare();
  const remoteParticipantIds = useParticipantIds({ filter: "remote" });

  const localParticipant = useLocalParticipant();
  const isAlone = useMemo(
    () => remoteParticipantIds?.length < 1 || screens?.length < 1,
    [remoteParticipantIds, screens]
  );

  return (
    <div className="fixed right-2 top-2 flex gap-4">
      <div className="hidden">
        {remoteParticipantIds.map((id) => (
          <Tile key={id} id={id} />
        ))}
      </div>
      {screens.map((screen) => (
        <Tile key={screen.screenId} id={screen.session_id} isScreenShare />
      ))}
      {localParticipant && (
        <Tile
          id={localParticipant.session_id}
          isScreenShare={false}
          isLocal
          isAlone={isAlone}
        />
      )}
      <DailyAudio />
    </div>
  );
};
