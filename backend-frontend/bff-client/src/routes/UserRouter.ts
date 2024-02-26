import express from "express";
import { UserController } from "../controllers/User";
import { RouterHelper } from "./lib";

const UserRouter = express.Router();

RouterHelper.use(UserRouter, UserController, [
    {
        method: 'get',
        path: '/profile',
        handlers: [UserController.GetProfile]
    },
    {
        method: 'get',
        path: '/profiler',
        handlers: [UserController.GetProfile]
    }
])

export default UserRouter;