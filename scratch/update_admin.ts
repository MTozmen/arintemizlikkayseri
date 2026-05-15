import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const name = 'Mustafa'
  const surname = 'Kosmaz'
  const password = 'ArinTemizlikKayseri_8345'
  const hashedPassword = await bcrypt.hash(password, 10)

  // Clear existing admins (assuming there's only one or we want to reset)
  await prisma.admin.deleteMany({})

  // Create new admin
  await prisma.admin.create({
    data: {
      name,
      surname,
      password: hashedPassword,
    },
  })

  console.log(`Admin updated to: ${name} ${surname}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
