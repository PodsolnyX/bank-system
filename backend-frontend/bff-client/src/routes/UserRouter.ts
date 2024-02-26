import express from "express";
import { UserController } from "controllers/User";
import { UserService } from "services/UserService";
import { UserRepo } from "repos/UserRepo"

import { RouterHelper } from "./lib";

const UserRouter = express.Router();

const UserRepositoryInst = new UserRepo();
const UserServiceInst = new UserService(UserRepositoryInst);
const UserControllerInst = new UserController(UserServiceInst); 

RouterHelper.use(UserRouter, UserControllerInst, [
    {
        method: 'get',
        path: '/profile',
        handlers: [UserControllerInst.GetProfile]
    },
    {
        method: 'get',
        path: '/profiler',
        handlers: [UserControllerInst.GetProfile]
    }
])

export default UserRouter;