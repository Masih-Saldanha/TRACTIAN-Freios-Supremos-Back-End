import { Router } from "express";

import companyRouter from "./companyRouter.js";
import userRouter from "./userRouter.js";
import unitRouter from "./unitRouter.js";
import assetRouter from "./assetRouter.js";

const router = Router();

router.use("/company/", companyRouter);
router.use("/user/", userRouter);
router.use("/unit/", unitRouter);
router.use("/asset/", assetRouter);

export default router;