"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callOnInterval = void 0;
function callOnInterval(
// eslint-disable-next-line no-unused-vars
callBack, arg, interval) {
    const intervalId = setInterval(() => {
        callBack(arg);
    }, interval);
    return () => clearInterval(intervalId);
}
exports.callOnInterval = callOnInterval;
//# sourceMappingURL=call-on-interval.js.map