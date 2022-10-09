import { Users } from "@prisma/client";

import { prisma } from "../config/database.js";

export type UserData = Omit<Users, "id">;

async function registerUser(email: string, name: string, password: string, companyId: string) {
    return prisma.users.create({ data: { email, name, password, companyId } });
};

async function findUserById(id: string) {
    return prisma.users.findUnique({ where: { id }, include: { company: true } });
};

async function findUserByEmail(email: string) {
    return prisma.users.findUnique({ where: { email }, include: { company: true } });
};

async function findAllUsers() {
    return prisma.users.findMany({ include: { company: true } });
};

async function editUserById(id: string, email?: string, name?: string, password?: string, companyId?: string) {
    return prisma.users.update({
        where: { id },
        data: { email, name, password, companyId },
        include: { company: true }
    });
};

async function deleteUserById(id: string) {
    await prisma.users.delete({ where: { id } });
};

const userRepository = {
    registerUser,
    findUserById,
    findUserByEmail,
    findAllUsers,
    editUserById,
    deleteUserById,
};

export default userRepository;