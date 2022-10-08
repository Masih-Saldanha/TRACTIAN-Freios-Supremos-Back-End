import { prisma } from "../src/config/database.js";

(async function main() {
    console.log("Running Seed...");
    
})().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
