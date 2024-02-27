import express from "express";
import { LoanController } from "controllers/Loan";
import { LoanService } from "services/LoanService";
import { LoanRepo } from "repos/LoanRepo"

import { RouterHelper } from "./lib";

const LoanRouter = express.Router();

const LoanRepositoryInst = new LoanRepo();
const LoanServiceInst = new LoanService(LoanRepositoryInst);
const LoanControllerInst = new LoanController(LoanServiceInst); 

RouterHelper.use(LoanRouter, LoanControllerInst, [
    {
        method: 'get',
        path: '/profile',
        handlers: [LoanControllerInst.GetProfile]
    },
    {
        method: 'get',
        path: '/profiler',
        handlers: [LoanControllerInst.GetProfile]
    }
])

export default LoanRouter;