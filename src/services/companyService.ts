import companyRepository from "../repositories/companyRepository.js";
import { throwError } from "../utils/errorTypeUtils.js";

async function registerCompany(email: string, name: string) {
    const existCompany = await companyRepository.findCompanyByEmail(email);
    if (!!existCompany) throwError(!!existCompany, "Conflict", `The email: "${existCompany.email}" is already registered, try another one`);

    const newCompany = await companyRepository.registerCompany(email, name);
    return newCompany;
};

async function findCompanyById(id: string) {
    const company = await companyRepository.findCompanyById(id);
    throwError(!company, "Not Found", `The company id: "${id}" doesn't exist, try again`);
    return company;
};

async function findAllCompanies() {
    const companies = await companyRepository.findAllCompanies();
    return companies;
};

async function editCompanyById(id: string, email?: string, name?: string) {
    const existCompany = await companyRepository.findCompanyById(id);
    throwError(!existCompany, "Not Found", `The company id: "${id}" doesn't exist, try again`);

    if (!email && !name) {
        return;
    }

    if (email) {
        const repeatedCompanyEmail = await companyRepository.findCompanyByEmail(email);
        if (!!repeatedCompanyEmail && repeatedCompanyEmail.id === id) throwError(repeatedCompanyEmail.email === email, "Conflict", `The email: "${email}" is already registered within the company id: "${id}", try a different e-mail`);
        if (!!repeatedCompanyEmail) throwError(!!repeatedCompanyEmail, "Conflict", `The email: "${repeatedCompanyEmail.email}" is already registered, try another one`);
    }

    const editedCompany = await companyRepository.editCompanyById(id, email, name);
    return editedCompany;
};

async function deleteCompanyById(id: string) {
    const existCompany = await companyRepository.findCompanyById(id);
    throwError(!existCompany, "Not Found", `The company id: "${id}" doens't exist, try to delete a valid one`);
    await companyRepository.deleteCompanyById(id);
};

const companyService = {
    registerCompany,
    findCompanyById,
    findAllCompanies,
    editCompanyById,
    deleteCompanyById,
};

export default companyService;