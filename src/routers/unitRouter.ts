import { Router } from "express";

import unitController from "../controllers/unitController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import unitSchema from "../schemas/unitSchema.js";

const unitRouter = Router();

unitRouter.post("/", validateSchema(unitSchema.registerUnit), unitController.registerUnit);
unitRouter.get("/:id", unitController.findUnitById);
unitRouter.get("/", unitController.findAllUnits);
unitRouter.put("/", validateSchema(unitSchema.editUnit), unitController.editUnitById);
unitRouter.delete("/", validateSchema(unitSchema.deleteUnit), unitController.deleteUnitById);

export default unitRouter;