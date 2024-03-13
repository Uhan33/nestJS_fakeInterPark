"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPoint = exports.UserInfo = void 0;
const common_1 = require("@nestjs/common");
exports.UserInfo = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) {
        return request.user;
    }
    return null;
});
exports.UserPoint = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.point) {
        return request.point;
    }
    return null;
});
//# sourceMappingURL=userInfo.decorator.js.map