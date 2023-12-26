"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Bot, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function HoverInfo() {
  const isActive = true;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className={cn(isActive && "bg-gray-300")}>
          <Bot className="h-4 w-4" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="text-center">
          {/* <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div> */}
          Chat with LLM
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function TextChannelHoverInfo() {
  const isActive = true;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className={"opacity-40"}>
          <Users className="h-4 w-4" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="text-center">
          {/* <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div> */}
          (Coming Soon) Text Channel
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
