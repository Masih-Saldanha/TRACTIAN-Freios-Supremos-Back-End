import { Router } from "express";
import companyController from "../controllers/companyController.js";

const companyRouter = Router();

companyRouter.post("/", companyController.registerCompany);
companyRouter.get("/:id", companyController.findCompanyById);
companyRouter.get("/", companyController.findAllCompanies);
companyRouter.put("/", companyController.editCompanyById);
companyRouter.delete("/", companyController.deleteCompanyById);

export default companyRouter;