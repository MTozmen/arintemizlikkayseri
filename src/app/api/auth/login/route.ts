import { encrypt } from '@/lib/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, surname, password } = await request.json()

    // Beklenen değerleri .env dosyasından alıyoruz
    const expectedName = process.env.ADMIN_NAME || 'Mustafa'
    const expectedSurname = process.env.ADMIN_SURNAME || 'Kosmaz'
    const expectedPassword = process.env.ADMIN_PASSWORD || 'ArinTemizlikKayseri_8345'

    if (name === expectedName && surname === expectedSurname && password === expectedPassword) {
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
      const session = await encrypt({ id: 1, name: expectedName })
      
      const cookieStore = await cookies()
      cookieStore.set('session', session, {
        expires,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
      })

      return NextResponse.json({ success: true, message: 'Giriş başarılı' })
    }

    return NextResponse.json({ success: false, message: 'Giriş bilgileri hatalı' }, { status: 401 })
  } catch (error: any) {
    console.error('Login Error:', error)
    return NextResponse.json({ 
      success: false, 
      message: `Sunucu hatası (V2): ${error.message || 'Bilinmeyen hata'}` 
    }, { status: 500 })
  }
}
