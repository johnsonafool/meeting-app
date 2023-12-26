"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { MessageSquareText, LayoutPanelLeft, Settings2 } from "lucide-react";
import { useRecoilState } from "recoil";
import { boardState } from "@/store/board-store";
import { SystemSettingsDialog } from "./system-settings-dialog";
import { channelState } from "@/store/channel-store";

export const Sidebar = () => {
  const [isMiroOpen, setIsMiroOpen] = useRecoilState(boardState);
  const [isChannelOpen, setIsChannelOpen] = useRecoilState(channelState);

  return (
    <div className="fixed left-2 top-2">
      <div className="flex flex-col gap-4">
        <Button
          variant={"ghost"}
          size="lg"
          className={cn(
            "bg-white flex gap-2 rounded-full text-black border",
            isChannelOpen && "bg-gray-300"
          )}
          onClick={() => setIsChannelOpen(!isChannelOpen)}
        >
          <MessageSquareText className="h-4 w-4" />
          <span>Text Channel</span>
        </Button>

        <Button
          variant={"ghost"}
          size="lg"
          className={cn(
            "bg-white flex gap-2 rounded-full text-black border",
            isMiroOpen && "bg-gray-300"
          )}
          onClick={() => setIsMiroOpen(!isMiroOpen)}
        >
          <LayoutPanelLeft className="h-4 w-4" />
          <span>Drawing Board</span>
        </Button>

        <SystemSettingsDialog>
          <Button
            variant={"ghost"}
            size="lg"
            className={"bg-white flex gap-2 rounded-full text-black border"}
          >
            <Settings2 className="h-4 w-4" />
            <span>System Settings</span>
          </Button>
        </SystemSettingsDialog>

        {/* <Button
          variant={"ghost"}
          size="lg"
          className={cn("bg-white flex gap-2 rounded-full text-black border")}
        >
          <UserButton afterSignOutUrl="/" />
          <span>{user?.fullName}</span>
        </Button> */}
      </div>
    </div>
  );
};
