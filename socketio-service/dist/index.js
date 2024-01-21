"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const routes_1 = __importDefault(require("./routes"));
// middleware
// routes
server_1.default.on("connection", routes_1.default);
//# sourceMappingURL=index.js.map