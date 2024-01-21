"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const call_on_interval_1 = require("../utils/call-on-interval");
const PysicalIntervalTime = 1000 / 20;
const players = new Map();
const onUpdate = (players) => {
    const playersList = Array.from(players).map((player) => player[1]);
    server_1.default.emit("player:update", playersList);
};
call_on_interval_1.callOnInterval(onUpdate, players, PysicalIntervalTime);
const playerService = {
    join(newPlayer) {
        players.set(newPlayer.id, newPlayer);
    },
    leave(playerId) {
        players.delete(playerId);
    },
    updateState(data) {
        const player = players.get(data.id);
        if (!player)
            return;
        player.position = data.position;
        player.rotation = data.rotation;
        player.playAnimation = data.playAnimation;
        player.dailySessionId = data.dailySessionId;
    },
};
exports.default = playerService;
//# sourceMappingURL=player.service.js.map