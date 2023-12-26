"use client";

import React, { useCallback, useState, FC } from "react";
import {
  useLocalParticipant,
  useDevices,
  useDaily,
  useDailyEvent,
  DailyVideo,
} from "@daily-co/daily-react";
import {
  useJoinedDailyApp,
  useLeaveDailyApp,
} from "@/components/providers/streaming-provider";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DailyEventObject } from "@daily-co/daily-js";
import { joinState } from "@/store/join-store";
import { playerState } from "@/store/player-store";
import { Input } from "../ui/input";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

type CharacterSelectProps = {
  options: {
    label: string;
    name: string;
    url: string;
  }[];
  onSelected: (label: string) => void;
  selected: string;
};

const CharacterSelect: FC<CharacterSelectProps> = ({
  options,
  onSelected,
  selected,
}) => {
  return (
    <div className="flex items-end justify-between">
      {options.map(({ url, name, label }, k) => (
        <div
          key={k}
          className={cn(
            {
              "h-64 w-48": selected === label,
              "h-48 w-36": selected !== label,
            },
            "relative flex cursor-pointer flex-col items-center justify-center gap-2 transition-all duration-500"
          )}
          onClick={() => onSelected(label)}
        >
          <Image
            fill
            className={cn(
              "h-full w-full rounded-2xl object-cover transition-all duration-200",
              {
                " border-8 border-blue-600": selected === label,
                " border-0": selected !== label,
              }
            )}
            src={url}
            alt={name}
          />
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
};

export const StreamingStartModal: FC = () => {
  const [player, setPlayerState] = useRecoilState(playerState);
  const setJoin = useSetRecoilState(joinState);
  const { joinCall } = useJoinedDailyApp();
  const { leaveCall } = useLeaveDailyApp();

  const localParticipant = useLocalParticipant();
  const {
    microphones,
    speakers,
    cameras,
    setMicrophone,
    setCamera,
    setSpeaker,
  } = useDevices();
  const callObject = useDaily();

  const [getUserMediaError, setGetUserMediaError] =
    useState<DailyEventObject | null>(null);

  useDailyEvent(
    "camera-error",
    useCallback((event) => {
      setGetUserMediaError(event);
    }, [])
  );
  const videoMediaError =
    getUserMediaError?.error?.blockedMedia.includes("video");
  const audioMediaError =
    getUserMediaError?.error?.blockedMedia.includes("audio");
  const mediaErrorMessages = getUserMediaError?.error?.msg;

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!callObject) return;
    callObject.setUserName(e.target.value);
    setPlayerState({
      ...player,
      name: e.target.value,
    });
  };

  const updateMicrophone = (value: string | undefined) => {
    setMicrophone(value || "");
  };

  const updateSpeakers = (value: string | undefined) => {
    setSpeaker(value || "");
  };

  const updateCamera = (value: string | undefined) => {
    setCamera(value || "");
  };

  const joinWithDaily = () => {
    joinCall();
    setJoin({
      isJoined: true,
      isDailyJoined: true,
    });
  };

  const joinWithoutDaily = () => {
    leaveCall();
    setJoin({
      isJoined: true,
      isDailyJoined: false,
    });
  };

  const inputLikeClassName =
    "flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm";

  return (
    <>
      <div className="relative -top-12 m-auto h-36 w-64 rounded-2xl bg-black shadow">
        <DailyVideo
          sessionId={localParticipant?.session_id || ""}
          mirror
          type="video"
        />
      </div>
      <CharacterSelect
        options={[
          {
            name: "Male",
            label: "male",
            url: "/player/male.jpg",
          },
          {
            name: "Female",
            label: "female",
            url: "/player/female.jpg",
          },
        ]}
        onSelected={(label) => {
          setPlayerState({
            ...player,
            useModelType: label as "male" | "female",
          });
        }}
        selected={player.useModelType}
      />

      <Input
        type="text"
        placeholder="Username"
        onChange={onNameChange}
        value={localParticipant?.user_name ?? " "}
      />

      {mediaErrorMessages && (
        <Alert color="red">
          Unable to access microphone or camera,
          <br />
          {mediaErrorMessages}
        </Alert>
      )}

      {!audioMediaError && (
        <Select onValueChange={updateMicrophone}>
          <SelectTrigger className={inputLikeClassName}>
            <SelectValue placeholder="Microphone" />
          </SelectTrigger>
          <SelectContent>
            {microphones?.map((mic) => (
              <SelectItem
                value={mic.device.deviceId}
                key={`mic-${mic.device.deviceId}`}
              >
                {mic.device.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Select onValueChange={updateSpeakers}>
        <SelectTrigger className={inputLikeClassName}>
          <SelectValue placeholder="Speakers" />
        </SelectTrigger>
        <SelectContent>
          {speakers?.map((speaker) => (
            <SelectItem
              key={`speaker-${speaker.device.deviceId}`}
              value={speaker.device.deviceId}
            >
              {speaker.device.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {!videoMediaError && (
        <Select onValueChange={updateCamera}>
          <SelectTrigger className={inputLikeClassName}>
            <SelectValue placeholder="Camera" />
          </SelectTrigger>
          <SelectContent>
            {cameras?.map((camera) => (
              <SelectItem
                key={`cam-${camera.device.deviceId}`}
                value={camera.device.deviceId}
              >
                {camera.device.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <div className=" flex justify-center gap-4">
        <Button variant="outline" onClick={joinWithDaily}>
          Join
        </Button>
        <Button variant="outline" onClick={joinWithoutDaily} color="green">
          Join without voice
        </Button>
      </div>
    </>
  );
};
