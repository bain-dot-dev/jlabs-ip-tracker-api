import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const { Pool } = pg;

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create adapter
const adapter = new PrismaPg(pool);

// Create Prisma client with adapter
const prisma = new PrismaClient({ adapter });
const SALT_ROUNDS = 10;

async function main() {
  console.log("Starting seed...");

  // Clear existing data (optional)
  await prisma.searchHistory.deleteMany();
  await prisma.user.deleteMany();

  // Hash passwords with 10 salt rounds
  const plainPassword = "password123";
  const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);

  // Create test user
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      password: hashedPassword,
    },
  });

  console.log("✅ Seeded user:", user.email);
  console.log("📧 Email: test@example.com");
  console.log("🔑 Password: password123");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
