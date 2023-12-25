import React, { FC, MutableRefObject, useEffect } from "react";
import { Model as FemaleModel } from "./ModelFemale";
import { Model as MaleModel } from "./ModelMale";
import { Euler, useFrame, Vector3 } from "@react-three/fiber";
import { Player, PlayerActionName } from "@/types/player-type";

import { CameraControls } from "@react-three/drei";
import { socketClient } from "@/lib/socket-client";
import useCamaeraControl from "./hooks/useCamaeraControl";
import useControl from "./hooks/useControl";
import useAnimation from "./hooks/useAnimation";
import { useLocalParticipant } from "@daily-co/daily-react";
import { useRecoilValue } from "recoil";
import { match, P } from "ts-pattern";
import { ControlType } from "@/types/control-type";
import { playerState } from "@/store/player-store";
import { joinState } from "@/store/join-store";

type Props = {
  controlType: ControlType;
  CameraControlRef: MutableRefObject<CameraControls | null>;
};

const GameObject: FC<Props> = ({ controlType, CameraControlRef }) => {
  const socket = socketClient();
  const { name, useModelType } = useRecoilValue(playerState);
  const { isJoined, isDailyJoined } = useRecoilValue(joinState);
  const { motion, position, rotation, scale, playAnimation } = useControl(
    controlType,
    CameraControlRef
  );
  const localParticipant = useLocalParticipant();

  const {
    scale: startingScale,
    position: startingPosition,
    playAnimation: startingPlayAnimation,
    isPlaying,
  } = useAnimation(position[0], position[2]);

  useCamaeraControl(controlType, CameraControlRef, isPlaying, position, motion);

  // useEffect(() => {
  //   if (!isJoined) {
  //     return;
  //   }
  //   const newPlayer: Player = {
  //     id: socket.id,
  //     name: name,
  //     useModelType: useModelType,
  //     position: position as [number, number, number],
  //     rotation: rotation as [number, number, number],
  //     playAnimation: playAnimation as PlayerActionName,
  //     dailySessionId: localParticipant?.session_id ?? null,
  //   };
  //   socket.emit("player:join", newPlayer);
  // }, [isJoined]);

  useFrame(() => {
    if (!isJoined) {
      return;
    }
    const player: Player = {
      id: socket.id,
      name: name,
      useModelType: useModelType,
      position: position as [number, number, number],
      rotation: rotation as [number, number, number],
      playAnimation: playAnimation as PlayerActionName,
      dailySessionId: localParticipant?.session_id ?? null,
    };
    socket.emit("player:updateState", player);
  });

  return match(useModelType)
    .with("male", () => (
      <MaleModel
        visible={controlType === "ThirdPerson"}
        position={isPlaying ? startingPosition : (position as Vector3)}
        rotation={rotation as Euler}
        scale={isPlaying ? startingScale : scale}
        playAnimation={isPlaying ? startingPlayAnimation : playAnimation}
      />
    ))
    .with("female", () => (
      <FemaleModel
        visible={controlType === "ThirdPerson"}
        position={isPlaying ? startingPosition : (position as Vector3)}
        rotation={rotation as Euler}
        scale={isPlaying ? startingScale : scale}
        playAnimation={isPlaying ? startingPlayAnimation : playAnimation}
      />
    ))
    .otherwise(() => null);
};

export default GameObject;
