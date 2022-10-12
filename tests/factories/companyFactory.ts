import { faker } from "@faker-js/faker";

function createCompany() {
    return {
        email: faker.internet.email(),
        name: faker.name.fullName(),
    };
};

const companyFactory = {
    createCompany,
};

export default companyFactory;