import { Request, Response } from "express";
import testService from "../services/testService.js";

async function test(req: Request, res: Response) {
    const test = await testService.test();
    res.status(200).send(test);
};

const testController = {
    test,
};

export default testController;