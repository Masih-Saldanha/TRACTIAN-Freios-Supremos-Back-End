import { Router } from "express";

import assetController from "../controllers/assetController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import assetSchema from "../schemas/assetSchema.js";

const assetRouter = Router();

assetRouter.post("/", validateSchema(assetSchema.registerAsset), assetController.registerAsset);
assetRouter.get("/:id", assetController.findAssetById);
assetRouter.get("/", assetController.findAllAssets);
assetRouter.put("/", validateSchema(assetSchema.editAsset), assetController.editAssetById);
assetRouter.delete("/", validateSchema(assetSchema.deleteAsset), assetController.deleteAssetById);

export default assetRouter;