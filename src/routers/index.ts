import { Router } from "express";

import companyRouter from "./companyRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use("/company/", companyRouter);
router.use("/user/", userRouter);

export default router;