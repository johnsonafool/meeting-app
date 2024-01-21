import { Socket } from "socket.io";
import { registerPlayerHandlers } from "./player.route";

const onConnection = (socket: Socket) => {
  registerPlayerHandlers(socket);
};

export default onConnection;
