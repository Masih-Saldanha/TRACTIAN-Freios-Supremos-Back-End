import Joi from "joi";
import { Users } from "@prisma/client";

import { UserData } from "../repositories/userRepository.js";

type SignUpUser = UserData & {
    repeatPassword: string;
};

const registerUser = Joi.object<SignUpUser>({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
    repeatPassword: Joi.string().valid(Joi.ref("password")).required(),
    companyId: Joi.string().hex().length(24).required(),
});

const editUser = Joi.object<Users>({
    id: Joi.string().hex().length(24).required(),
    email: Joi.string().email().optional(),
    name: Joi.string().optional(),
    password: Joi.string().min(8).optional(),
    companyId: Joi.string().hex().length(24).optional(),
});

const deleteUser = Joi.object<Users>({
    id: Joi.string().hex().length(24).required(),
});

const userSchema = {
    registerUser,
    editUser,
    deleteUser,
};

export default userSchema;