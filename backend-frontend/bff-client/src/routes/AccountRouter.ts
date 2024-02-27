import express from "express";
import { AccountController } from "controllers/Account";
import { AccountService } from "services/AccountService";
import { AccountRepo } from "repos/AccountRepo"

import { RouterHelper } from "./lib";

const AccountRouter = express.Router();

const AccountRepositoryInst = new AccountRepo();
const AccountServiceInst = new AccountService(AccountRepositoryInst);
const AccountControllerInst = new AccountController(AccountServiceInst); 

RouterHelper.use(AccountRouter, AccountControllerInst, [
    {
        method: 'get',
        path: '/profile',
        handlers: [AccountControllerInst.GetProfile]
    },
    {
        method: 'get',
        path: '/profiler',
        handlers: [AccountControllerInst.GetProfile]
    }
])

export default AccountRouter;