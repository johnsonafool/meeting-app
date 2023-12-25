import { atom } from "recoil";

export const joinState = atom<{
  isJoined: boolean;
  isDailyJoined: boolean;
}>({
  key: "isJoined",
  default: {
    isJoined: false,
    isDailyJoined: false,
  },
});
