import Joi from "joi";
import { Assets } from "@prisma/client";

const registerAsset = Joi.object<Assets>({
    image: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    model: Joi.string().required(),
    owner: Joi.string().required(),
    status: Joi.string().valid("Running", "Alerting", "Alerting").required(),
    healthLevel: Joi.number().min(0).max(100).required(),
    unitId: Joi.string().hex().length(24).required(),
});

const editAsset = Joi.object<Assets>({
    id: Joi.string().hex().length(24).required(),
    image: Joi.string().optional(),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    model: Joi.string().optional(),
    owner: Joi.string().optional(),
    status: Joi.string().valid("Running", "Alerting", "Alerting").optional(),
    healthLevel: Joi.number().min(0).max(100).optional(),
    unitId: Joi.string().hex().length(24).optional(),
});

const deleteAsset = Joi.object<Assets>({
    id: Joi.string().hex().length(24).required(),
});

const assetSchema = {
    registerAsset,
    editAsset,
    deleteAsset,
};

export default assetSchema;