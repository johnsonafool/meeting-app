"use client";

import { Joystick } from "react-joystick-component";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { useEffect, useState } from "react";
import { useJoyStickControllerProvider } from "./providers/player-controller-provider";
import { isTouchDevice } from "@/lib/isTouchDevice";

export const PlayerController = () => {
  const { setForward, setBackward, setLeft, setRight } =
    useJoyStickControllerProvider();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleMove = (event: IJoystickUpdateEvent) => {
    console.log(event.x, event.y);
    if (event.x && event.x > 0.5) {
      setRight(true);
      setLeft(false);
    } else if (event.x && event.x < -0.5) {
      setRight(false);
      setLeft(true);
    } else {
      setRight(false);
      setLeft(false);
    }
    if (event.y && event.y > 0.5) {
      setForward(true);
      setBackward(false);
    } else if (event.y && event.y < -0.5) {
      setForward(false);
      setBackward(true);
    } else {
      setForward(false);
      setBackward(false);
    }
  };

  if (!isTouchDevice()) return null;

  return (
    <div className="fixed bottom-24 left-auto right-16 md:bottom-16 md:left-16">
      <Joystick
        size={100}
        baseColor="#f5f5f5"
        stickColor="#616161"
        move={handleMove}
        stop={handleMove}
      ></Joystick>
    </div>
  );
};
