"use client";

import { cn } from "@/lib/utils";
import { joinState } from "@/store/join-store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { StreamingStartModal } from "./modals/streaming-start-modal";
import { Tray } from "./streaming/tray";
import { UserButton } from "@clerk/nextjs";

export const Footer = () => {
  const { isJoined } = useRecoilValue(joinState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-0 w-full">
      <div
        className={cn(
          "mx-auto p-2 transition-all duration-300 h-[47rem] max-w-md rounded-3xl",
          isJoined && "h-14 max-w-sm rounded-full pl-6"
        )}
      >
        {isJoined ? <JoinedMenu /> : <StartedMenu />}
      </div>
    </div>
  );
};

const StartedMenu = () => {
  return (
    <div className="ga relative mx-auto flex w-full flex-col gap-4 p-4 text-blue-gray-800">
      <StreamingStartModal />
    </div>
  );
};

const JoinedMenu = () => {
  return (
    <div className="relative mx-auto flex items-center text-blue-gray-900 p-2 rounded-md bg-white">
      <Link href="#" className="ml-2 mr-4 cursor-pointer py-1.5">
        Room #0
      </Link>
      <Tray />
      <div className="ml-4">
        <UserButton />
      </div>
    </div>
  );
};
