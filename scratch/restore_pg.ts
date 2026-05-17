import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  const data = JSON.parse(fs.readFileSync('scratch/data.json', 'utf-8'))

  if (data.Admin) {
    for (const item of data.Admin) {
      // Upsert Admin to prevent duplicates
      const exists = await prisma.admin.findFirst({ where: { name: item.name } })
      if (!exists) {
        await prisma.admin.create({ data: { ...item, id: undefined } })
      }
    }
    console.log('Admins restored.')
  }

  if (data.Service) {
    for (const item of data.Service) {
      const exists = await prisma.service.findFirst({ where: { title: item.title } })
      if (!exists) {
        const { id, createdAt, ...rest } = item
        await prisma.service.create({ data: { ...rest, createdAt: new Date(createdAt) } })
      }
    }
    console.log('Services restored.')
  }

  if (data.BlogPost) {
    for (const item of data.BlogPost) {
      const exists = await prisma.blogPost.findFirst({ where: { title: item.title } })
      if (!exists) {
        const { id, createdAt, ...rest } = item
        await prisma.blogPost.create({ data: { ...rest, createdAt: new Date(createdAt) } })
      }
    }
    console.log('BlogPosts restored.')
  }

  if (data.SiteContent) {
    for (const item of data.SiteContent) {
      await prisma.siteContent.upsert({
        where: { key: item.key },
        update: { value: item.value },
        create: item,
      })
    }
    console.log('SiteContent restored.')
  }

  console.log("Database restore completed successfully.")
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
