import { Router } from "express";

import companyRouter from "./companyRouter.js";
import userRouter from "./userRouter.js";
import unitRouter from "./unitRouter.js";

const router = Router();

router.use("/company/", companyRouter);
router.use("/user/", userRouter);
router.use("/unit/", unitRouter);

export default router;