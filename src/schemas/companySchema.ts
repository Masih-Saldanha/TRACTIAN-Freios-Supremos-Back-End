import Joi from "joi";
import { Companies } from "@prisma/client";

import { CompanyData } from "../repositories/companyRepository.js";

const registerCompany = Joi.object<CompanyData>({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
});

const editCompany = Joi.object<Companies>({
    id: Joi.string().hex().length(24).required(),
    email: Joi.string().email().optional(),
    name: Joi.string().optional(),
});

const deleteCompany = Joi.object<Companies>({
    id: Joi.string().hex().length(24).required(),
});

const companySchema = {
    registerCompany,
    editCompany,
    deleteCompany,
};

export default companySchema;