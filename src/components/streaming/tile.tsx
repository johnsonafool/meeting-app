"use client";

import { DailyVideo } from "@daily-co/daily-react";
import { useParticipantProperty } from "@daily-co/daily-react";
import { FC, useState } from "react";
import { match } from "ts-pattern";

type TileType = {
  id: string;
  isScreenShare?: boolean;
  isLocal?: boolean;
  isAlone?: boolean;
};

export const Tile = ({ id, isScreenShare, isLocal, isAlone }: TileType) => {
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <>
      {fullScreen && (
        <div className=" fixed left-0 top-0 z-10 h-screen w-screen bg-black/50" />
      )}
      <div
        className={`flex cursor-pointer flex-col items-center gap-2 transition-all duration-100 ${match(
          fullScreen
        )
          .with(true, () => "fixed left-0 top-1 z-20 h-screen w-screen ")
          .otherwise(() => "z-10 ")}`}
        onClick={() => setFullScreen(!fullScreen)}
      >
        <div
          className={`flex flex-col items-center gap-2 rounded-lg bg-black ${match(
            fullScreen
          )
            .with(true, () => "h-[90%] w-[90%]")
            .otherwise(() => "h-18 w-32")}  ${match(isScreenShare)
            .with(true, () => " border-2 border-red-500 p-1")
            .otherwise(() => "")}`}
        >
          <DailyVideo
            id={`${id}-DailyVideo`}
            automirror
            sessionId={id}
            type={isScreenShare ? "screenVideo" : "video"}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <Username id={id} isLocal={isLocal} />
      </div>
    </>
  );
};

type UsernameType = {
  id: string;
  isLocal?: boolean;
};

const Username: FC<UsernameType> = ({ id, isLocal }) => {
  const username = useParticipantProperty(id, "user_name");

  return (
    <div className=" text-white w-max rounded-full border border-white bg-black/50 px-2">
      {username || id} {isLocal && "(you)"}
    </div>
  );
};

export default Username;
