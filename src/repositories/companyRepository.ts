import { Companies } from "@prisma/client";

import { prisma } from "../config/database.js";

export type CompanyData = Omit<Companies, "id">;

const include = {
    users: {
        select: {
            company: false,
            email: true,
            id: true,
            name: true,
            companyId: false,
            password: false,
        }
    },
    units: {
        select: {
            id: true,
            name: true,
            address: true,
            addressId: false,
            companyId: false,
            company: false,
            assets: {
                select: {
                    description: true,
                    healthLevel: true,
                    id: true,
                    image: true,
                    model: true,
                    name: true,
                    owner: true,
                    status: true,
                    unit: false,
                    unitId: false,
                }
            },
        }
    }
};

async function registerCompany(email: string, name: string) {
    return prisma.companies.create({
        data: { email, name },
        include,
    });
};

async function findCompanyById(id: string) {
    return prisma.companies.findUnique({
        where: { id },
        include,
    });
};

async function findCompanyByEmail(email: string) {
    return prisma.companies.findUnique({
        where: { email },
        include,
    });
};

async function findAllCompanies() {
    return prisma.companies.findMany({
        include,
    });
};

async function editCompanyById(id: string, email?: string, name?: string) {
    return prisma.companies.update({
        where: { id },
        data: { email, name },
        include,
    });
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