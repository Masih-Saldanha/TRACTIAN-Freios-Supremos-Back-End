import { prisma } from "../config/database.js";

async function registerCompany(email: string, name: string) {
    return prisma.companies.create({ data: { email, name } });
};

async function findCompanyById(id: string) {
    return prisma.companies.findUnique({ where: { id } });
};

async function findAllCompanies() {
    return prisma.companies.findMany({});
};

async function editCompanyById(id: string, email?: string, name?: string) {
    return prisma.companies.update({ where: { id }, data: { email, name } });
};

async function deleteCompanyById(id: string) {
    await prisma.companies.delete({ where: { id } });
};

const companyRepository = {
    registerCompany,
    findCompanyById,
    findAllCompanies,
    editCompanyById,
    deleteCompanyById,
};

export default companyRepository;