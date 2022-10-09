import { prisma } from "../config/database.js";

async function registerUnit(name: string, companyId: string, addressId: string) {
    return prisma.units.create(
        {
            data: { name, companyId, addressId },
            include: {
                company: {
                    include: {
                        users: true
                    }
                },
                address: true
            }
        }
    );
};

async function findUnitById(id: string) {
    return prisma.units.findUnique(
        {
            where: { id },
            include: {
                company: {
                    include: {
                        users: true
                    }
                },
                address: true
            }
        }
    );
};

async function findAllUnits() {
    return prisma.units.findMany({
        include: {
            company: {
                include: {
                    users: true
                }
            },
            address: true
        }
    });
};

async function editUnitById(id: string, name?: string, companyId?: string, addressId?: string) {
    return prisma.units.update({
        where: { id },
        data: { name, companyId, addressId },
        include: {
            company: {
                include: {
                    users: true
                }
            },
            address: true
        }
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