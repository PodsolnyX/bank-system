import { UserServiceInst } from "init/User";
import { AuthMiddleware } from "middleware/Auth";

export const AuthMiddlewareInst = () => AuthMiddleware(UserServiceInst)