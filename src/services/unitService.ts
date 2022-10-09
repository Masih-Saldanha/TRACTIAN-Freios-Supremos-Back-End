import companyRepository from "../repositories/companyRepository.js";
import unitsAdressesRepository from "../repositories/unitAdressRepository.js";
import unitRepository from "../repositories/unitRepository.js";
import { throwError } from "../utils/errorTypeUtils.js";

async function registerUnit(name: string, companyId: string, street: string, number: string, zip: string, extraInformation?: string) {
    const existCompany = await companyRepository.findCompanyById(companyId);
    throwError(!existCompany, "Not Found", `The company id: "${companyId}" doesn't exist, try again`);

    const newAdress = await unitsAdressesRepository.registerUnitAdress(street, number, zip, extraInformation);

    const newUnit = await unitRepository.registerUnit(name, companyId, newAdress.id);
    delete newUnit.companyId;
    delete newUnit.addressId;

    newUnit.company.users.forEach((user) => {
        delete user.companyId;
        delete user.password;
    });

    return newUnit;
};

async function findUnitById(id: string) {
    const unit = await unitRepository.findUnitById(id);
    throwError(!unit, "Not Found", `The unit id: "${id}" doesn't exist, try again`);
    delete unit.companyId;
    delete unit.addressId;
    unit.company.users.forEach((user) => {
        delete user.companyId;
        delete user.password;
    });
    return unit;
};

async function findAllUnits() {
    const units = await unitRepository.findAllUnits();
    units.forEach((unit) => {
        delete unit.companyId;
        delete unit.addressId;
        unit.company.users.forEach((user) => {
            delete user.companyId;
            delete user.password;
        });
    });
    return units;
};

async function editUnitById(id: string, name?: string, companyId?: string, street?: string, number?: string, zip?: string, extraInformation?: string) {
    const existUnit = await unitRepository.findUnitById(id);
    throwError(!existUnit, "Not Found", `The unit id: "${id}" doesn't exist, try again`);

    if (!name && !companyId && !street && !number && !zip && !extraInformation) {
        return;
    };

    const editedAdress = await unitsAdressesRepository.editUnitAdressById(existUnit.addressId, street, number, zip, extraInformation);

    const editedUnit = await unitRepository.editUnitById(id, name, companyId, existUnit.addressId);
    delete editedUnit.companyId;
    delete editedUnit.addressId;
    editedUnit.company.users.forEach((user) => {
        delete user.companyId;
        delete user.password;
    });
    return editedUnit;
};

async function deleteUnitById(id: string) {
    const existUnit = await unitRepository.findUnitById(id);
    throwError(!existUnit, "Not Found", `The unit id: "${id}" doens't exist, try to delete a valid one`);
    await unitRepository.deleteUnitById(id);
};

const unitService = {
    registerUnit,
    findUnitById,
    findAllUnits,
    editUnitById,
    deleteUnitById,
};

export default unitService;