import { prisma } from '@/lib/prisma'
import { addBlog, deleteBlog } from '../actions'
import Link from 'next/link'

export default async function BlogsAdminPage() {
  const blogs = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Blog Yönetimi</h2>
        <Link href="/admin/dashboard" style={{ color: '#005436', textDecoration: 'underline' }}>← Panele Dön</Link>
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px' }}>Yeni Blog Ekle</h3>
        <form action={addBlog} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Başlık</label>
            <input type="text" name="title" required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>İçerik</label>
            <textarea name="content" required rows={5} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Fotoğraf Yükle</label>
            <input type="file" name="image" accept="image/*" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" style={{ background: '#005436', color: 'white', padding: '12px', borderRadius: '4px', border: 'none', fontWeight: 'bold', cursor: 'pointer', alignSelf: 'flex-start' }}>
            Blog Yazısını Paylaş
          </button>
        </form>
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '16px' }}>Mevcut Bloglar</h3>
        {blogs.length === 0 ? <p>Henüz blog yazısı eklenmemiş.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {blogs.map(blog => (
              <li key={blog.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />}
                  <div>
                    <h4 style={{ margin: '0 0 4px 0' }}>{blog.title}</h4>
                    <span style={{ fontSize: '12px', color: '#666' }}>{new Date(blog.createdAt).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
                <form action={async () => {
                  'use server'
                  await deleteBlog(blog.id)
                }}>
                  <button type="submit" style={{ background: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Sil</button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
