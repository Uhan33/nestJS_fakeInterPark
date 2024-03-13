import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) {
      return request.user;
    }
    return null;
  }
);

export const UserPoint = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.point) {
      return request.point;
    }
    return null;
  }
);