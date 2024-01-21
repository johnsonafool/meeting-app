"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const port = Number(process.env.BACKEND_PORT) || 6543;
const httpServer = http_1.createServer();
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: frontendUrl,
    },
});
httpServer.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
exports.default = io;
//# sourceMappingURL=server.js.map