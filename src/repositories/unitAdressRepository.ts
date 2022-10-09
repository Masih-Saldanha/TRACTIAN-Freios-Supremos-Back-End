import { UnitsAdresses } from "@prisma/client";

import { prisma } from "../config/database.js";

export type UnitsAdressData = Omit<UnitsAdresses, "id">;

async function registerUnitAdress(street: string, number: string, zip: string, extraInformation?: string) {
    return prisma.unitsAdresses.create({ data: { street, number, zip, extraInformation } });
};

async function findUnitAdressById(id: string) {
    return prisma.unitsAdresses.findUnique({ where: { id } });
};

async function editUnitAdressById(id: string, street?: string, number?: string, zip?: string, extraInformation?: string) {
    return prisma.unitsAdresses.update({ where: { id }, data: { street, number, zip, extraInformation } });
};

async function deleteUnitAdressById(id: string) {
    await prisma.unitsAdresses.delete({ where: { id } });
};

const unitsAdressesRepository = {
    registerUnitAdress,
    findUnitAdressById,
    editUnitAdressById,
    deleteUnitAdressById,
};

export default unitsAdressesRepository;