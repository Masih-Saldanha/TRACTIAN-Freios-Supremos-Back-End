import { Request, Response } from "express";

import userService from "../services/userService.js";

async function registerUser(req: Request, res: Response) {
    const { email, name, password, companyId }: { email: string, name: string, password: string, companyId: string } = req.body;
    const newUser = await userService.registerUser(email, name, password, companyId);
    res.status(200).send(newUser);
};

async function findUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.findUserById(id);
    res.status(200).send(user);
};

async function findAllUsers(req: Request, res: Response) {
    const users = await userService.findAllUsers();
    res.status(200).send(users);
};

async function editUserById(req: Request, res: Response) {
    const { id, email, name, password, companyId }: { id: string, email?: string, name?: string, password?: string, companyId?: string } = req.body;
    const editedUser = await userService.editUserById(id, email, name, password, companyId);
    res.status(200).send(editedUser);
};

async function deleteUserById(req: Request, res: Response) {
    const { id }: { id: string } = req.body;
    await userService.deleteUserById(id);
    res.sendStatus(200);
};


const userController = {
    registerUser,
    findUserById,
    findAllUsers,
    editUserById,
    deleteUserById,
};

export default userController;