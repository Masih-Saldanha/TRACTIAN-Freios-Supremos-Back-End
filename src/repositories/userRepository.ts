import { Users } from "@prisma/client";

import { prisma } from "../config/database.js";

export type UserData = Omit<Users, "id">;

const select = {
    id: true,
    email: true,
    name: true,
    password: false,
    companyId: false,
    company: {
        select: {
            id: true,
            email: true,
            name: true,
            users: false,
            units: {
                select: {
                    id: true,
                    name: true,
                    address: true,
                    companyId: false,
                    addressId: false,
                    company: false,
                    assets: {
                        select: {
                            id: true,
                            image: true,
                            name: true,
                            description: true,
                            model: true,
                            owner: true,
                            status: true,
                            healthLevel: true,
                            unitId: false,
                            unit: false,
                        }
                    }
                }
            },
        }
    },
}

async function registerUser(email: string, name: string, password: string, companyId: string) {
    return prisma.users.create({
        data: { email, name, password, companyId },
        select,
    });
};

async function findUserById(id: string) {
    return prisma.users.findUnique({
        where: { id },
        select,
    });
};

async function findUserByEmail(email: string) {
    return prisma.users.findUnique({
        where: { email },
        select,
    });
};

async function findAllUsers() {
    return prisma.users.findMany({
        select,
    });
};

async function editUserById(id: string, email?: string, name?: string, password?: string, companyId?: string) {
    return prisma.users.update({
        where: { id },
        data: { email, name, password, companyId },
        select,
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