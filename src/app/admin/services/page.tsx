import { prisma } from '@/lib/prisma'
import { addService, deleteService } from '../actions'
import Link from 'next/link'

export default async function ServicesAdminPage() {
  const services = await prisma.service.findMany({ orderBy: { id: 'asc' } })

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Hizmet Yönetimi</h2>
        <Link href="/admin/dashboard" style={{ color: '#005436', textDecoration: 'underline' }}>← Panele Dön</Link>
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px' }}>Yeni Hizmet Ekle</h3>
        <form action={addService} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Başlık</label>
            <input type="text" name="title" required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Açıklama</label>
            <textarea name="description" required rows={3} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>İkon (home, office, sofa, vs.)</label>
            <input type="text" name="icon" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" style={{ background: '#005436', color: 'white', padding: '12px', borderRadius: '4px', border: 'none', fontWeight: 'bold', cursor: 'pointer', alignSelf: 'flex-start' }}>
            Hizmet Ekle
          </button>
        </form>
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '16px' }}>Mevcut Hizmetler ({services.length})</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {services.map(service => (
            <li key={service.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #eee' }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0' }}>{service.title}</h4>
                <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>{service.description}</p>
              </div>
              <form action={async () => {
                'use server'
                await deleteService(service.id)
              }}>
                <button type="submit" style={{ background: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Sil</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
