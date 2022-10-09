import bcrypt from "bcrypt";

import companyRepository from "../repositories/companyRepository.js";
import userRepository from "../repositories/userRepository.js";
import { throwError } from "../utils/errorTypeUtils.js";

async function registerUser(email: string, name: string, password: string, companyId: string) {
    const existUser = await userRepository.findUserByEmail(email);
    if (!!existUser) throwError(!!existUser, "Conflict", `The email: "${existUser.email}" is already registered, try another one`);

    const existCompany = await companyRepository.findCompanyById(companyId);
    throwError(!existCompany, "Not Found", `The company id: "${companyId}" doesn't exist, try again`);

    password = bcrypt.hashSync(password, +process.env.BCRYPT_SALT);

    const newUser = await userRepository.registerUser(email, name, password, companyId);
    delete newUser.password;
    delete newUser.companyId;
    const userToSend = {...newUser, company: existCompany};
    return userToSend;
};

async function findUserById(id: string) {
    const user = await userRepository.findUserById(id);
    throwError(!user, "Not Found", `The user id: "${id}" doesn't exist, try again`);
    delete user.password;
    delete user.companyId;
    return user;
};

async function findAllUsers() {
    const users = await userRepository.findAllUsers();
    users.forEach((user) => {
        delete user.password;
        delete user.companyId;
    });
    return users;
};

async function editUserById(id: string, email?: string, name?: string, password?: string, companyId?: string) {
    const existUser = await userRepository.findUserById(id);
    throwError(!existUser, "Not Found", `The user id: "${id}" doesn't exist, try again`);

    if (!email && !name && !password && !companyId) {
        return;
    }

    if (password) {
        password = bcrypt.hashSync(password, +process.env.BCRYPT_SALT);
    }

    if (email) {
        const repeatedUserEmail = await userRepository.findUserByEmail(email);
        if (!!repeatedUserEmail && repeatedUserEmail.id === id) throwError(repeatedUserEmail.email === email, "Conflict", `The email: "${email}" is already registered within the user id: "${id}", try a different e-mail`);
        if (!!repeatedUserEmail) throwError(!!repeatedUserEmail, "Conflict", `The email: "${repeatedUserEmail.email}" is already registered, try another one`);
    }

    const editedUser = await userRepository.editUserById(id, email, name, password, companyId);
    delete editedUser.password;
    delete editedUser.companyId;
    return editedUser;
};

async function deleteUserById(id: string) {
    const existUser = await userRepository.findUserById(id);
    throwError(!existUser, "Not Found", `The user id: "${id}" doens't exist, try to delete a valid one`);
    await userRepository.deleteUserById(id);
};

const userService = {
    registerUser,
    findUserById,
    findAllUsers,
    editUserById,
    deleteUserById,
};

export default userService;