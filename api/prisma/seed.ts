import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("AdminPassword123!", 10);
  const hashedPassword2 = await bcrypt.hash("ywTvhMNqUyWAZRd#", 10);
  const hashedPassword3 = await bcrypt.hash("*d+$5Ks4aWGKdy92!", 10);

  // Admin users to be seeded
  const adminUsers = [
    {
      email: "admin1@example.com",
      password: hashedPassword,
      role: "admin",
    },
    {
      email: "admin2@example.com",
      password: hashedPassword2,
      role: "admin",
    },
    {
      email: "admin3@example.com",
      password: hashedPassword3,
      role: "admin",
    },
  ];

  for (const user of adminUsers) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("Admin users seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
