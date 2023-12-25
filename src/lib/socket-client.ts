import { io } from "socket.io-client";

export const socketClient = () => {
  const PORT = parseInt(process.env.PORT || "3000", 10);

  const socket = io(`:${PORT + 1}`, {
    path: "/api/socket",
    addTrailingSlash: false,
  });

  socket.on("connect", () => {
    console.log("Connected");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });

  socket.on("connect_error", async (err) => {
    console.log(`connect_error due to ${err.message}`);
    await fetch("/api/socket");
  });

  return socket;
};
