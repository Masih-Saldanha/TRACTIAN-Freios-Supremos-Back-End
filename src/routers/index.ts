import { Router } from "express";
import companyRouter from "./companyRouter.js";

const router = Router();

router.use("/company/", companyRouter);

export default router;