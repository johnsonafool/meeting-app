"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPlayerHandlers = void 0;
const player_service_1 = __importDefault(require("../services/player.service"));
const player_1 = require("../schema/player");
const is_valid_1 = __importDefault(require("../utils/is-valid"));
const registerPlayerHandlers = (socket) => {
    socket.on("player:join", (data) => {
        if (!is_valid_1.default(data, player_1.playerSchema)) {
            socket.emit("error", `Invalid data format for player:join`);
        }
        else {
            player_service_1.default.join(data);
        }
    });
    socket.on("player:updateState", (data) => {
        if (!is_valid_1.default(data, player_1.playerSchema)) {
            socket.emit("error", `Invalid data format for player:join`);
        }
        else {
            player_service_1.default.updateState(data);
        }
    });
    socket.on("disconnect", () => {
        player_service_1.default.leave(socket.id);
    });
};
exports.registerPlayerHandlers = registerPlayerHandlers;
//# sourceMappingURL=player.route.js.map