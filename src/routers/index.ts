import { Router } from "express";
import testRouter from "./testRouter.js";

// import exampleRouter from "./exampleRouter.js";

const router = Router();

router.use(testRouter);

export default router;