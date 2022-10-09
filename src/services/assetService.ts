import { Status } from "@prisma/client";

import companyRepository from "../repositories/companyRepository.js";
import assetRepository from "../repositories/assetRepository.js";
import { throwError } from "../utils/errorTypeUtils.js";
import unitRepository from "../repositories/unitRepository.js";

async function registerAsset(image: string, name: string, description: string, model: string, owner: string, status: Status, healthLevel: number, unitId: string) {
    const existUnit = await unitRepository.findUnitById(unitId);
    throwError(!existUnit, "Not Found", `The unit id: "${unitId}" doesn't exist, try again`);

    const newAsset = await assetRepository.registerAsset(image, name, description, model, owner, status, healthLevel, unitId);
    newAsset.unit.company.users.forEach((user) => {
        delete user.companyId;
        delete user.password;
    });

    return newAsset;
};

async function findAssetById(id: string) {
    const asset = await assetRepository.findAssetById(id);
    throwError(!asset, "Not Found", `The asset id: "${id}" doesn't exist, try again`);
    delete asset.unitId;
    delete asset.unit.companyId;
    delete asset.unit.addressId;
    asset.unit.company.users.forEach((user) => {
        delete user.companyId;
        delete user.password;
    });
    return asset;
};

async function findAllAssets() {
    const assets = await assetRepository.findAllAssets();
    assets.forEach((asset) => {
        delete asset.unitId;
        delete asset.unit.companyId;
        delete asset.unit.addressId;
        asset.unit.company.users.forEach((user) => {
            delete user.companyId;
            delete user.password;
        });
    });
    return assets;
};

async function editAssetById(id: string, image?: string, name?: string, description?: string, model?: string, owner?: string, status?: Status, healthLevel?: number, unitId?: string) {
    const existAsset = await assetRepository.findAssetById(id);
    throwError(!existAsset, "Not Found", `The asset id: "${id}" doesn't exist, try again`);

    if (!image && !name && !description && !model && !owner && !status && !healthLevel && !unitId) {
        return;
    };

    const editedAsset = await assetRepository.editAssetById(id, image, name, description, model, owner, status, healthLevel, unitId);
    delete editedAsset.unitId;
    delete editedAsset.unit.companyId;
    delete editedAsset.unit.addressId;
    editedAsset.unit.company.users.forEach((user) => {
        delete user.companyId;
        delete user.password;
    });
    return editedAsset;
};

async function deleteAssetById(id: string) {
    const existAsset = await assetRepository.findAssetById(id);
    throwError(!existAsset, "Not Found", `The asset id: "${id}" doens't exist, try to delete a valid one`);
    await assetRepository.deleteAssetById(id);
};

const assetService = {
    registerAsset,
    findAssetById,
    findAllAssets,
    editAssetById,
    deleteAssetById,
};

export default assetService;