import { Socket } from "socket.io";
import playerService from "../services/player.service";
import { Player, playerSchema } from "../schema/player";
import isValid from "../utils/is-valid";

export const registerPlayerHandlers = (socket: Socket) => {
  socket.on("player:join", (data: Player) => {
    if (!isValid(data, playerSchema)) {
      socket.emit("error", `Invalid data format for player:join`);
    } else {
      playerService.join(data);
    }
  });
  socket.on("player:updateState", (data: Player) => {
    if (!isValid(data, playerSchema)) {
      socket.emit("error", `Invalid data format for player:join`);
    } else {
      playerService.updateState(data);
    }
  });

  socket.on("disconnect", () => {
    playerService.leave(socket.id);
  });
};
