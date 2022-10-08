import { Router } from "express";
import companyController from "../controllers/companyController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import companySchema from "../schemas/companySchema.js";

const companyRouter = Router();

companyRouter.post("/", validateSchema(companySchema.registerCompany), companyController.registerCompany);
companyRouter.get("/:id", companyController.findCompanyById);
companyRouter.get("/", companyController.findAllCompanies);
companyRouter.put("/", validateSchema(companySchema.editCompany), companyController.editCompanyById);
companyRouter.delete("/", validateSchema(companySchema.deleteCompany), companyController.deleteCompanyById);

export default companyRouter;