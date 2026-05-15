import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blog = await prisma.blogPost.findUnique({
    where: { id: Number(id) },
  })

  if (!blog) notFound()

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
      {/* Geri Butonu */}
      <a href="/#blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', fontSize: '14px', marginBottom: '32px' }}>
        ← Blog'a Geri Dön
      </a>

      {/* Görsel */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', borderRadius: '12px', marginBottom: '32px' }}
        />
      )}

      {/* Tarih */}
      <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: '600', letterSpacing: '1px', marginBottom: '16px' }}>
        {new Date(blog.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
      </div>

      {/* Başlık */}
      <h1 className="blog-detail-title" style={{ fontSize: '36px', fontWeight: '800', lineHeight: '1.25', color: 'var(--text-main)', marginBottom: '32px' }}>
        {blog.title}
      </h1>

      {/* İçerik */}
      <div className="blog-detail-content" style={{ fontSize: '17px', lineHeight: '1.9', color: '#374151' }}>
        {blog.content.split('\n').map((paragraph, i) => (
          <p key={i} style={{ marginBottom: '20px' }}>{paragraph}</p>
        ))}
      </div>

      {/* Alt Ayraç */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '48px 0 32px' }} />

      <a href="/#blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--primary)', color: 'white', padding: '14px 28px', borderRadius: '4px', fontWeight: '600', fontSize: '15px' }}>
        ← Tüm Blog Yazılarına Dön
      </a>
    </div>
  )
}
