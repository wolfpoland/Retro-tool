import { PrismaClient } from "@prisma/client";
// adding destroy of prisma client
const prisma = new PrismaClient();

export default prisma;
