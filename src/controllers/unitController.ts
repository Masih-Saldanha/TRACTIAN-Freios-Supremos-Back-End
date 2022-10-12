import { Request, Response } from "express";

import unitService from "../services/unitService.js";

async function registerUnit(req: Request, res: Response) {
    const { name, companyId, street, number, zip, extraInformation }: { name: string, companyId: string, street: string, number: string, zip: string, extraInformation?: string } = req.body;
    const newUnit = await unitService.registerUnit(name, companyId, street, number, zip, extraInformation);
    res.status(201).send(newUnit);
};

async function findUnitById(req: Request, res: Response) {
    const { id } = req.params;
    const unit = await unitService.findUnitById(id);
    res.status(200).send(unit);
};

async function findAllUnits(req: Request, res: Response) {
    const units = await unitService.findAllUnits();
    res.status(200).send(units);
};

async function editUnitById(req: Request, res: Response) {
    const { id, name, companyId, street, number, zip, extraInformation }: { id: string, name?: string, companyId?: string, street?: string, number?: string, zip?: string, extraInformation?: string } = req.body;
    const editedUnit = await unitService.editUnitById(id, name, companyId, street, number, zip, extraInformation);
    res.status(200).send(editedUnit);
};

async function deleteUnitById(req: Request, res: Response) {
    const { id }: { id: string } = req.body;
    await unitService.deleteUnitById(id);
    res.sendStatus(200);
};


const unitController = {
    registerUnit,
    findUnitById,
    findAllUnits,
    editUnitById,
    deleteUnitById,
};

export default unitController;