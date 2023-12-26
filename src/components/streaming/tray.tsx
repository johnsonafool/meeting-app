import React, { useCallback, useState } from "react";
import {
  useDaily,
  useScreenShare,
  useLocalParticipant,
  useVideoTrack,
  useAudioTrack,
} from "@daily-co/daily-react";

import { match } from "ts-pattern";
import {
  Mic,
  MicOff,
  ScreenShare,
  ScreenShareOff,
  VideoIcon,
  VideoOff,
} from "lucide-react";
import { Button } from "../ui/button";

export function Tray() {
  const callObject = useDaily();
  const { isSharingScreen, startScreenShare, stopScreenShare } =
    useScreenShare();

  const localParticipant = useLocalParticipant();
  const localVideo = useVideoTrack(localParticipant?.session_id || "");
  const localAudio = useAudioTrack(localParticipant?.session_id || "");
  const mutedVideo = localVideo.isOff;
  const mutedAudio = localAudio.isOff;

  const toggleVideo = useCallback(() => {
    if (!callObject) return;
    callObject.setLocalVideo(mutedVideo);
  }, [callObject, mutedVideo]);

  const toggleAudio = useCallback(() => {
    if (!callObject) return;
    callObject.setLocalAudio(mutedAudio);
  }, [callObject, mutedAudio]);

  const toggleScreenShare = () =>
    isSharingScreen ? stopScreenShare() : startScreenShare();

  return (
    <ul className="mb-0 mt-0 flex flex-row items-center gap-2">
      <Button onClick={toggleAudio} className="rounded-full" variant="ghost">
        {match(mutedAudio)
          .with(true, () => <MicOff className="h-4 w-4" />)
          .otherwise(() => (
            <Mic className="h-4 w-4" />
          ))}
      </Button>
      {/* <MenuItem className="rounded-full">
        {match(isHeadphoneOpen)
          .with(true, () => <MdHeadset />)
          .otherwise(() => (
            <MdHeadsetOff />
          ))}
      </MenuItem> */}
      <Button onClick={toggleVideo} className="rounded-full" variant="ghost">
        {match(mutedVideo)
          .with(true, () => <VideoOff className="h-4 w-4" />)
          .otherwise(() => (
            <VideoIcon className="h-4 w-4" />
          ))}
      </Button>
      <Button
        onClick={toggleScreenShare}
        className="rounded-full"
        variant="ghost"
      >
        {match(isSharingScreen)
          .with(true, () => <ScreenShareOff className="h-4 w-4" />)
          .otherwise(() => (
            <ScreenShare className="h-4 w-4" />
          ))}
      </Button>
    </ul>
  );
}
