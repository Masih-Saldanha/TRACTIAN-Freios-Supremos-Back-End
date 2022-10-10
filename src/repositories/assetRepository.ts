import { Status } from "@prisma/client";

import { prisma } from "../config/database.js";

const select = {
    id: true,
    image: true,
    name: true,
    description: true,
    model: true,
    owner: true,
    status: true,
    healthLevel: true,
    unitId: false,
    unit: {
        select: {
            id: true,
            name: true,
            companyId: false,
            addressId: false,
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
            address: true,
            assets: false,
        }
    }
};

async function registerAsset(image: string, name: string, description: string, model: string, owner: string, status: Status, healthLevel: number, unitId: string) {
    return prisma.assets.create({
        data: { image, name, description, model, owner, status, healthLevel, unitId },
        select,
    });
};

async function findAssetById(id: string) {
    return prisma.assets.findUnique({
        where: { id },
        select,
    });
};

async function findAllAssets() {
    return prisma.assets.findMany({
        select,
    });
};

async function editAssetById(id: string, image?: string, name?: string, description?: string, model?: string, owner?: string, status?: Status, healthLevel?: number, unitId?: string) {
    return prisma.assets.update({
        where: { id },
        data: { image, name, description, model, owner, status, healthLevel, unitId },
        select,
    });
};

async function deleteAssetById(id: string) {
    await prisma.assets.delete({ where: { id } });
};

const assetRepository = {
    registerAsset,
    findAssetById,
    findAllAssets,
    editAssetById,
    deleteAssetById,
};

export default assetRepository;