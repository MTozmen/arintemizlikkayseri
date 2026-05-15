'use client'

import { useRouter } from 'next/navigation'

import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h2>Yönetici Paneli</h2>
        <button 
          onClick={() => {
            document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            router.push('/admin/login')
          }}
          style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Çıkış Yap
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '16px' }}>Site İçeriği</h3>
          <p style={{ color: '#666', marginBottom: '16px' }}>Ana sayfa metinlerini, iletişim bilgilerini güncelleyin.</p>
          <Link href="/admin/content" style={{ display: 'inline-block', padding: '8px 16px', background: '#005436', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>İçeriği Düzenle</Link>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '16px' }}>Hizmetler</h3>
          <p style={{ color: '#666', marginBottom: '16px' }}>Sunduğunuz 10 farklı hizmeti düzenleyin veya yenisini ekleyin.</p>
          <Link href="/admin/services" style={{ display: 'inline-block', padding: '8px 16px', background: '#005436', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>Hizmetleri Yönet</Link>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '16px' }}>Blog Yazıları</h3>
          <p style={{ color: '#666', marginBottom: '16px' }}>Fotoğraf yükleyerek yeni blog yazıları paylaşın.</p>
          <Link href="/admin/blogs" style={{ display: 'inline-block', padding: '8px 16px', background: '#005436', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>Blog Yönetimi</Link>
        </div>
      </div>
    </div>
  )
}
