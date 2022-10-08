import { prisma } from "../config/database.js";

async function testCreate(name: string) {
    await prisma.test.create({ data: { name } });
};

async function testReturnOne(name: string) {
    return prisma.test.findFirst({ where: { name } });
};

async function testReturnAll() {
    return prisma.test.findMany();
};

const testRepository = {
    testCreate,
    testReturnOne,
    testReturnAll,
};

export default testRepository;