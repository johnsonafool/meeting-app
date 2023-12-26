"use client";

import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bot, Users } from "lucide-react";
import { useState } from "react";

export function ChannelToggleGroup() {
  const [value, setValue] = useState("left");

  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(value) => {
        if (value) setValue(value);
      }}
    >
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bot className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Users className="h-4 w-4" />
      </ToggleGroupItem>
      {/* <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <UnderlineIcon className="h-4 w-4" />
      </ToggleGroupItem> */}
    </ToggleGroup>
  );
}
