import companyRepository from "../repositories/companyRepository.js";

async function registerCompany(email: string, name: string) {
    const newCompany = await companyRepository.registerCompany(email, name);
    return newCompany;
};

async function findCompanyById(id: string) {
    const company = await companyRepository.findCompanyById(id);
    return company;
};

async function findAllCompanies() {
    const companies = await companyRepository.findAllCompanies();
    return companies;
};

async function editCompanyById(id: string, email?: string, name?: string) {
    const editedCompany = await companyRepository.editCompanyById(id, email, name);
    return editedCompany;
};

async function deleteCompanyById(id: string) {
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