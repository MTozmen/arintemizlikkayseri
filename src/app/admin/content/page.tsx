import { prisma } from '@/lib/prisma'
import { updateContent } from '../actions'
import Link from 'next/link'

export default async function ContentAdminPage() {
  const contentArr = await prisma.siteContent.findMany()
  const content = contentArr.reduce((acc, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {} as Record<string, string>)

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Site İçerik Yönetimi</h2>
        <Link href="/admin/dashboard" style={{ color: '#005436', textDecoration: 'underline' }}>← Panele Dön</Link>
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <form action={updateContent} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Telefon Numarası</label>
              <input type="text" name="phone" defaultValue={content.phone} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>WhatsApp Numarası (Başında ülke kodu ile)</label>
              <input type="text" name="whatsapp" defaultValue={content.whatsapp} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>E-posta</label>
              <input type="email" name="email" defaultValue={content.email} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Adres</label>
              <input type="text" name="address" defaultValue={content.address} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '16px 0' }} />
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Ana Sayfa Başlığı</label>
            <input type="text" name="heroTitle" defaultValue={content.heroTitle} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Ana Sayfa Alt Metni</label>
            <textarea name="heroSubtext" defaultValue={content.heroSubtext} required rows={3} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
          </div>

          <button type="submit" style={{ background: '#005436', color: 'white', padding: '12px', borderRadius: '4px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '16px' }}>
            Değişiklikleri Kaydet
          </button>
        </form>
      </div>
    </div>
  )
}
