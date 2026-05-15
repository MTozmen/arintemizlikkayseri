import { prisma } from '@/lib/prisma'
import { encrypt } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, surname, password } = await request.json()

    if (!name || !surname || !password) {
      return NextResponse.json({ success: false, message: 'Tüm alanları doldurun' }, { status: 400 })
    }

    const admin = await prisma.admin.findFirst({
      where: {
        name,
        surname,
      },
    })

    if (!admin) {
      return NextResponse.json({ success: false, message: 'Giriş bilgileri hatalı' }, { status: 401 })
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Giriş bilgileri hatalı' }, { status: 401 })
    }

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await encrypt({ id: admin.id, name: admin.name })
    
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
      expires,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    })

    return NextResponse.json({ success: true, message: 'Giriş başarılı' })
  } catch (error: any) {
    console.error('Login Error:', error)
    return NextResponse.json({ 
      success: false, 
      message: `Sunucu hatası: ${error.message || 'Bilinmeyen hata'}` 
    }, { status: 500 })
  }
}
