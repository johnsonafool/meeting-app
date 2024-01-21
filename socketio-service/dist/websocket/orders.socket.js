"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrdersSocket {
    handleConnection(socket) {
        socket.emit("ping", "Hi! I am a live socket connection");
    }
    middlewareImplementation(socket, next) {
        //Implement your middleware for orders here
        return next();
    }
}
exports.default = OrdersSocket;
//# sourceMappingURL=orders.socket.js.map