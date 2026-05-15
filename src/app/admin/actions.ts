'use server'

import { writeFile } from 'fs/promises'
import path from 'path'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addBlog(formData: FormData) {
  const file = formData.get('image') as File
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  
  let imageUrl = null
  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = Date.now() + '-' + file.name.replaceAll(' ', '_')
    await writeFile(path.join(process.cwd(), 'public/uploads', filename), buffer)
    imageUrl = '/uploads/' + filename
  }
  
  await prisma.blogPost.create({
    data: { title, content, image: imageUrl }
  })

  revalidatePath('/admin/blogs')
  revalidatePath('/')
}

export async function deleteBlog(id: number) {
  await prisma.blogPost.delete({ where: { id } })
  revalidatePath('/admin/blogs')
  revalidatePath('/')
}

export async function addService(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const icon = formData.get('icon') as string
  
  await prisma.service.create({
    data: { title, description, icon }
  })
  revalidatePath('/admin/services')
  revalidatePath('/')
}

export async function deleteService(id: number) {
  await prisma.service.delete({ where: { id } })
  revalidatePath('/admin/services')
  revalidatePath('/')
}

export async function updateContent(formData: FormData) {
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      await prisma.siteContent.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      })
    }
  }
  revalidatePath('/admin/content')
  revalidatePath('/')
}
