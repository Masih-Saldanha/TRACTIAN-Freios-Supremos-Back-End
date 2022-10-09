import Joi from "joi";
import { Units, UnitsAdresses } from "@prisma/client";

type UnitData = Units & UnitsAdresses;

const registerUnit = Joi.object<UnitData>({
    name: Joi.string().required(),
    companyId: Joi.string().hex().length(24).required(),
    street: Joi.string().required(),
    number: Joi.string().required(),
    zip: Joi.string().regex(/[0-9]{5}-[0-9]{4}/).required(),
    extraInformation: Joi.string().optional(),
});

const editUnit = Joi.object<UnitData>({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().optional(),
    companyId: Joi.string().hex().length(24).optional(),
    street: Joi.string().optional(),
    number: Joi.string().optional(),
    zip: Joi.string().regex(/[0-9]{5}-[0-9]{4}/).optional(),
    extraInformation: Joi.string().optional(),
});

const deleteUnit = Joi.object<Units>({
    id: Joi.string().hex().length(24).required(),
});

const unitSchema = {
    registerUnit,
    editUnit,
    deleteUnit,
};

export default unitSchema;