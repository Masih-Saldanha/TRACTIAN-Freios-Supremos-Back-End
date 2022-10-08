import { Request, Response } from "express";
import companyService from "../services/companyService.js";

async function registerCompany(req: Request, res: Response) {
    const { email, name }: { email: string, name: string } = req.body;
    const newCompany = await companyService.registerCompany(email, name);
    res.status(200).send(newCompany);
};

async function findCompanyById(req: Request, res: Response) {
    const { id } = req.params;
    const company = await companyService.findCompanyById(id);
    res.status(200).send(company);
};

async function findAllCompanies(req: Request, res: Response) {
    const companies = await companyService.findAllCompanies();
    res.status(200).send(companies);
};

async function editCompanyById(req: Request, res: Response) {
    const { id, email, name }: { id: string, email?: string, name?: string } = req.body;
    const editedCompany = await companyService.editCompanyById(id, email, name);
    res.status(200).send(editedCompany);
};

async function deleteCompanyById(req: Request, res: Response) {
    const { id }: { id: string } = req.body;
    await companyService.deleteCompanyById(id);
    res.sendStatus(200);
};


const companyController = {
    registerCompany,
    findCompanyById,
    findAllCompanies,
    editCompanyById,
    deleteCompanyById,
};

export default companyController;