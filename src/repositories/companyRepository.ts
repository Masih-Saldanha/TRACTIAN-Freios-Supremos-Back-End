import { Companies } from "@prisma/client";

import { prisma } from "../config/database.js";

export type CompanyData = Omit<Companies, "id">;

async function registerCompany(email: string, name: string) {
    return prisma.companies.create({ data: { email, name } });
};

async function findCompanyById(id: string) {
    return prisma.companies.findUnique({ where: { id } });
};

async function findCompanyByEmail(email: string) {
    return prisma.companies.findUnique({ where: { email } });
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
    findCompanyByEmail,
    findAllCompanies,
    editCompanyById,
    deleteCompanyById,
};

export default companyRepository;