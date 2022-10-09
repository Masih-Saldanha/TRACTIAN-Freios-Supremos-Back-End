import { Status } from "@prisma/client";
import { prisma } from "../config/database.js";

async function registerAsset(image: string, name: string, description: string, model: string, owner: string, status: Status, healthLevel: number, unitId: string) {
    return prisma.assets.create(
        {
            data: { image, name, description, model, owner, status, healthLevel, unitId },
            include: {
                unit: {
                    include: {
                        address: true,
                        company: {
                            include: { users: true }
                        }
                    }
                }
            }
        }
    );
};

async function findAssetById(id: string) {
    return prisma.assets.findUnique(
        {
            where: { id },
            include: {
                unit: {
                    include: {
                        address: true,
                        company: {
                            include: { users: true }
                        }
                    }
                }
            }
        }
    );
};

async function findAllAssets() {
    return prisma.assets.findMany({
        include: {
            unit: {
                include: {
                    address: true,
                    company: {
                        include: { users: true }
                    }
                }
            }
        }
    });
};

async function editAssetById(id: string, image?: string, name?: string, description?: string, model?: string, owner?: string, status?: Status, healthLevel?: number, unitId?: string) {
    return prisma.assets.update({
        where: { id },
        data: { image, name, description, model, owner, status, healthLevel, unitId },
        include: {
            unit: {
                include: {
                    address: true,
                    company: {
                        include: { users: true }
                    }
                }
            }
        }
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