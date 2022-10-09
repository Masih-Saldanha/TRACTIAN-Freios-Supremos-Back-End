import { Status } from "@prisma/client";
import { Request, Response } from "express";

import assetService from "../services/assetService.js";

async function registerAsset(req: Request, res: Response) {
    const { image, name, description, model, owner, status, healthLevel, unitId }: { image: string, name: string, description: string, model: string, owner: string, status: Status, healthLevel: number, unitId: string } = req.body;
    const newAsset = await assetService.registerAsset(image, name, description, model, owner, status, healthLevel, unitId);
    res.status(200).send(newAsset);
};

async function findAssetById(req: Request, res: Response) {
    const { id } = req.params;
    const asset = await assetService.findAssetById(id);
    res.status(200).send(asset);
};

async function findAllAssets(req: Request, res: Response) {
    const assets = await assetService.findAllAssets();
    res.status(200).send(assets);
};

async function editAssetById(req: Request, res: Response) {
    const { id, image, name, description, model, owner, status, healthLevel, unitId }: { id: string, image?: string, name?: string, description?: string, model?: string, owner?: string, status?: Status, healthLevel?: number, unitId?: string } = req.body;
    const editedAsset = await assetService.editAssetById(id, image, name, description, model, owner, status, healthLevel, unitId);
    res.status(200).send(editedAsset);
};

async function deleteAssetById(req: Request, res: Response) {
    const { id }: { id: string } = req.body;
    await assetService.deleteAssetById(id);
    res.sendStatus(200);
};


const assetController = {
    registerAsset,
    findAssetById,
    findAllAssets,
    editAssetById,
    deleteAssetById,
};

export default assetController;