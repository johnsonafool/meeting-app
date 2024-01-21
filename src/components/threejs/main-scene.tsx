"use client";

import { ControlType } from "@/types/control-type";
import { socket } from "@/lib/socket-client";
import { CameraControls, OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { match } from "ts-pattern";
import FloorBlock from "@/components/threejs/floorBlock";
import Player from "@/components/threejs/player";
import OtherPlayer from "@/components/threejs/otherPlayer";
import { Player as TPlayer } from "@/types/player-type";
import { Gallery } from "@/components/threejs/gallery";

const useControlType = () => {
  const [controlType, setControlType] = useState<ControlType>("ThirdPerson");

  useEffect(() => {
    function keydown(e: KeyboardEvent) {
      if (e.key === "e") {
        setControlType((prev) =>
          prev === "FirstPerson" ? "ThirdPerson" : "FirstPerson"
        );
      }
    }

    window.addEventListener("keydown", keydown);

    return () => {
      window.removeEventListener("keydown", keydown);
    };
  }, []);

  return controlType;
};

const useOtherPlayersUpdate = () => {
  const [otherPlayers, setOtherPlayers] = useState<TPlayer[]>([]);

  useEffect(() => {
    function playerUpdate(playersList: TPlayer[]) {
      const players = playersList.filter((player) => player.id !== socket.id);

      setOtherPlayers(players);
    }

    socket.on("player:update", playerUpdate);

    return () => {
      socket.off("player:update", playerUpdate);
    };
  }, []);

  return otherPlayers;
};

const View = dynamic(
  () => import("@/components/canvas/view").then((mod) => mod.View),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-96 w-full flex-col items-center justify-center">
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-black"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    ),
  }
);

const Common = dynamic(
  () => import("@/components/canvas/view").then((mod) => mod.Common),
  { ssr: false }
);

export const MainScene = () => {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const otherPlayers = useOtherPlayersUpdate();
  const controlType = useControlType();

  return (
    <>
      <View className="flex h-screen w-screen flex-col items-center justify-center">
        <Suspense fallback={null}>
          <Common />
          {match(process.env.ENV)
            .with("DEV", () => <OrbitControls target={[4, 0, 4]} />)
            .otherwise(() => (
              <CameraControls ref={cameraControlRef} makeDefault />
            ))}
          {Array.from({ length: 8 }, (_, x) =>
            Array.from({ length: 8 }, (_, y) => (
              <FloorBlock key={`${x}${y}`} x={x} y={y} />
            ))
          )}
          <Gallery />

          <Player
            CameraControlRef={cameraControlRef}
            controlType={controlType}
          />

          {otherPlayers.map(
            ({
              id,
              position,
              rotation,
              playAnimation,
              dailySessionId,
              name,
              useModelType,
            }) => (
              <OtherPlayer
                key={id}
                position={position}
                rotation={rotation}
                name={name}
                playAnimation={playAnimation}
                dailySessionId={dailySessionId}
                CameraControlRef={cameraControlRef}
                useModelType={useModelType ?? ""}
              />
            )
          )}
        </Suspense>
      </View>
    </>
  );
};
