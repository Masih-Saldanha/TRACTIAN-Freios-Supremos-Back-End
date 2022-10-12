import supertest from "supertest";

import app from "../../src/config/app.js";
import { prisma } from "../../src/config/database.js";
import companyFactory from "../factories/companyFactory.js";

beforeEach(async () => {
    await prisma.companies.deleteMany({});
});

describe(`Company Integration Tests`, () => {
    it(`Should create a Company`, async () => {
        const company = companyFactory.createCompany();
        const response = await supertest(app).post(`/company/`).send(company);

        const findCompany = await prisma.companies.findUnique({
            where: { email: company.email },
        });

        expect(findCompany.id).toBe(response.body.id);
        expect(findCompany.email).toBe(company.email);
        expect(findCompany.name).toBe(company.name);
    });

    it(`Should return a Company`, async () => {
        const company = companyFactory.createCompany();
        const companyData = await prisma.companies.create({ data: company });

        const response = await supertest(app).get(`/company/${companyData.id}`);

        expect(response.body.id).toStrictEqual(companyData.id);
        expect(response.body.email).toStrictEqual(companyData.email);
        expect(response.body.name).toStrictEqual(companyData.name);
    });

    it(`Should return an array of `, async () => {
        const company1 = companyFactory.createCompany();
        const company2 = companyFactory.createCompany();
        const company3 = companyFactory.createCompany();
        const companies = [company1, company2, company3];
        await prisma.companies.createMany({ data: companies });

        const companiesData = await prisma.companies.findMany({});
        const response = await supertest(app).get(`/company/`);

        expect(response.body[0].id).toBe(companiesData[0].id);
        expect(response.body[0].email).toBe(companiesData[0].email);
        expect(response.body[0].name).toBe(companiesData[0].name);

        expect(response.body[1].id).toBe(companiesData[1].id);
        expect(response.body[1].email).toBe(companiesData[1].email);
        expect(response.body[1].name).toBe(companiesData[1].name);

        expect(response.body[2].id).toBe(companiesData[2].id);
        expect(response.body[2].email).toBe(companiesData[2].email);
        expect(response.body[2].name).toBe(companiesData[2].name);
    });

    it(`Should edit a Company data`, async () => {
        const companyOriginal = companyFactory.createCompany();
        const companyEdited = companyFactory.createCompany();

        const company = await prisma.companies.create({ data: companyOriginal });

        const dataToSend = {
            id: company.id,
            email: companyEdited.email,
            name: companyEdited.name,
        };

        const response = await supertest(app).put(`/company/`).send(dataToSend);

        const findCompany = await prisma.companies.findUnique({ where: { id: company.id } });

        expect(findCompany.email).toBe(companyEdited.email);
        expect(findCompany.name).toBe(companyEdited.name);
    });

    it(`Should delete a Company`, async () => {
        const company = companyFactory.createCompany();
        const companyData = await prisma.companies.create({ data: company });

        await supertest(app).delete(`/company/`).send({ id: companyData.id });

        const findCompany = await prisma.companies.findUnique({ where: { id: companyData.id } });

        expect(findCompany).toBe(null);
    });
});

afterAll(async () => {
    await prisma.companies.deleteMany({});
    await prisma.$disconnect();
});