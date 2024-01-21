import { PlayerModels } from "@/types/player-type";
import { atom } from "recoil";

export const playerState = atom<{
  name: string;
  useModelType: keyof typeof PlayerModels;
}>({
  key: "player",
  default: {
    name: "No name",
    useModelType: "male",
  },
});
