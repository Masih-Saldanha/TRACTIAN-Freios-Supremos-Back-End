import testRepository from "../repositories/testRepository.js";

async function test() {
    await testRepository.testCreate("Teste 1");
    const test = await testRepository.testReturnAll();
    return test;
};

const testService = {
    test,
};

export default testService;