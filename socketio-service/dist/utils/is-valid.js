"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isValid = (data, schema) => {
    const validation = schema.safeParse(data);
    if (!validation.success) {
        console.log(validation);
        return false;
    }
    return true;
};
exports.default = isValid;
//# sourceMappingURL=is-valid.js.map