import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = `http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}`;

export const socket = io(URL);
