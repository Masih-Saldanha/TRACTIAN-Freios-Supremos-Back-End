import { prisma } from "../config/database.js";

const select = {
    id: true,
    name: true,
    companyId: false,
    addressId: false,
    address: true,
    assets: {
        select: {
            id: true,
            image: true,
            name: true,
            description: true,
            model: true,
            owner: true,
            status: true,
            healthLevel: true,
            unitId: false,
            unit: false,
        }
    },
    company: {
        select: {
            id: true,
            email: true,
            name: true,
            users: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    password: false,
                    companyId: false,
                    company: false,
                }
            },
            units: false,
        }
    },
};

async function registerUnit(name: string, companyId: string, addressId: string) {
    return prisma.units.create({
        data: { name, companyId, addressId },
        select,
    });
};

async function findUnitById(id: string) {
    return prisma.units.findUnique({
        where: { id },
        select,
    });
};

async function findAllUnits() {
    return prisma.units.findMany({
        select,
    });
};

async function editUnitById(id: string, name?: string, companyId?: string, addressId?: string) {
    return prisma.units.update({
        where: { id },
        data: { name, companyId, addressId },
        select,
    });
};

async function deleteUnitById(id: string) {
    await prisma.units.delete({ where: { id } });
};

const unitRepository = {
    registerUnit,
    findUnitById,
    findAllUnits,
    editUnitById,
    deleteUnitById,
};

export default unitRepository;