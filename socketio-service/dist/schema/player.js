"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerModels = exports.playerSchema = void 0;
const zod_1 = require("zod");
exports.playerSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    position: zod_1.z.array(zod_1.z.number()),
    rotation: zod_1.z.array(zod_1.z.number()),
    playAnimation: zod_1.z.nullable(zod_1.z.string()),
    useModelType: zod_1.z.nullable(zod_1.z.string()),
});
exports.PlayerModels = {
    male: "modle-male",
    female: "model-female",
};
//# sourceMappingURL=player.js.map