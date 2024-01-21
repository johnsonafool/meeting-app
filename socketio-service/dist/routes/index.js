"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_route_1 = require("./player.route");
const onConnection = (socket) => {
    player_route_1.registerPlayerHandlers(socket);
};
exports.default = onConnection;
//# sourceMappingURL=index.js.map