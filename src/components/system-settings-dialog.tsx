import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AudioLinesIcon,
  JoystickIcon,
  Settings,
  VideoIcon,
} from "lucide-react";
import { ReactNode } from "react";

type SystemSettingsDialogProps = {
  children: ReactNode;
};

export const SystemSettingsDialog = ({
  children,
}: SystemSettingsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogHeader>
          <DialogTitle>(Coming Soon) Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="flex flex-row items-center">
              <JoystickIcon className="h-4 w-4 mr-2" />
              Joystick
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">off</Label>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="flex flex-row items-center">
              <AudioLinesIcon className="h-4 w-4 mr-2" />
              Audio
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">off</Label>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="flex flex-row items-center">
              <VideoIcon className="h-4 w-4 mr-2" />
              Video
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">off</Label>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="flex flex-row items-center">
              <Settings className="h-4 w-4 mr-2" />
              General
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">off</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
