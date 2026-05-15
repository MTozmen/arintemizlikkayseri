import { prisma } from '@/lib/prisma'
import BlogSlider from './components/BlogSlider'

export default async function Home() {
  const services = await prisma.service.findMany()
  const blogs = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
  
  // Create a map of content for easy lookup
  const contentArr = await prisma.siteContent.findMany()
  const content = contentArr.reduce((acc, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {} as Record<string, string>)

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h4 style={{ color: 'var(--primary)', fontWeight: '700', marginBottom: '16px', letterSpacing: '1px' }}>KAYSERİ'NİN GÜVENİLİR TEMİZLİK ŞİRKETİ</h4>
            <h1 className="section-heading hero-title" style={{ fontSize: '48px' }}>
              {content.heroTitle?.split(',')[0]},<br/>
              <span>{content.heroTitle?.split(',')[1] || 'Yaşamda Ferahlık.'}</span>
            </h1>
            <p>
              {content.heroSubtext}
            </p>
            <div className="hero-buttons">
              <a href={`tel:${content.phone?.replace(/\s/g, '')}`} className="btn-primary" style={{ backgroundColor: '#25D366', borderColor: '#25D366', color: 'white' }}>
                📞 BİZİ ARAYIN
              </a>
            </div>
          </div>
          
          <div className="hero-badge">
            <strong>10+</strong>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Yıllık Deneyim</span>
          </div>
        </div>
      </section>

      <section className="container" id="hizmetler" style={{ padding: '80px 20px' }}>
        <div className="section-title">HİZMETLERİMİZ</div>
        <div className="services-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h2 className="section-heading" style={{ marginBottom: 0 }}>Profesyonel Temizlik Çözümleri</h2>
          <a href="#" style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '14px' }}>TÜM HİZMETLERİ GÖR →</a>
        </div>
        
        <div className="services-grid">
          {services.map((service) => {
            // Map icon names to the newly generated high-quality images
            let imageSrc = '/images/service_home_1778385478974.png' // default fallback
            if (service.icon === 'office') {
              imageSrc = '/images/service_office_custom.png'
            } else if (service.icon === 'mosque') {
              imageSrc = '/images/service_mosque_custom.png'
            } else if (service.icon === 'industry') {
              imageSrc = '/images/service_industrial_custom.png'
            } else if (service.icon === 'window' || service.icon === 'exterior' || service.title?.toLowerCase().includes('cam') || service.title?.toLowerCase().includes('dış cephe')) {
              imageSrc = '/images/service_window_custom.png'
            } else if (service.icon === 'hotel' || service.title?.toLowerCase().includes('otel')) {
              imageSrc = '/images/service_hotel_custom.png'
            } else if (service.icon === 'school' || service.title?.toLowerCase().includes('okul')) {
              imageSrc = '/images/service_school_custom.png'
            } else if (service.icon === 'carpet' || service.icon === 'sofa' || service.title?.toLowerCase().includes('halı') || service.title?.toLowerCase().includes('koltuk')) {
              imageSrc = '/images/service_carpet_custom.png'
            } else if (service.icon === 'construction') {
              imageSrc = '/images/service_construction_1778385734474.png'
            } else if (service.icon === 'building' || service.icon === 'hotel' || service.icon === 'school') {
              imageSrc = '/images/service_office_1778385508767.png'
            }

            return (
              <div className="service-card" key={service.id}>
                <img src={imageSrc} alt={service.title} className="service-image" />
                <div className="service-content">
                  <div className="service-icon">
                    {service.icon === 'home' && '🏠'}
                    {service.icon === 'office' && '🏢'}
                    {service.icon === 'sofa' && '🛋️'}
                    {service.icon === 'construction' && '🏗️'}
                    {service.icon === 'building' && '🏢'}
                    {service.icon === 'carpet' && '🧶'}
                    {service.icon === 'industry' && '🏭'}
                    {service.icon === 'hotel' && '🏨'}
                    {service.icon === 'mosque' && '🕌'}
                    {service.icon === 'school' && '🏫'}
                    {!service.icon && '✨'}
                  </div>
                  <div className="service-title">{service.title}</div>
                  <div className="service-desc">{service.description}</div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="container" id="kurumsal" style={{ padding: '40px 20px 80px' }}>
        <div className="section-title">NEDEN ARIN TEMİZLİK?</div>
        <div className="why-us">
          <div className="why-us-sidebar" style={{ flex: '0 0 300px' }}>
            <h2 className="section-heading">Farkımızı Keşfedin.</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '15px' }}>
              Deneyimli ekibimiz, kaliteli ekipmanlarımız ve çevre dostu ürünlerimizle fark yaratıyoruz.
            </p>
            <a href="#" className="btn-primary">HAKKIMIZDA →</a>
          </div>
          
          <div className="why-grid">
            <div className="why-item">
              <div className="why-icon"><span style={{ fontSize: '32px' }}>👨‍🔧</span></div>
              <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>Deneyimli Ekip</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Alanında uzman ve eğitimli personelimizle hizmet veriyoruz.</p>
            </div>
            <div className="why-item">
              <div className="why-icon"><span style={{ fontSize: '32px' }}>🛡️</span></div>
              <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>Güvenilir Hizmet</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Müşteri memnuniyetini ön planda tutuyor, güvenilir hizmet sunuyoruz.</p>
            </div>
            <div className="why-item">
              <div className="why-icon"><span style={{ fontSize: '32px' }}>🍃</span></div>
              <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>Doğal Ürünler</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sağlığa zararsız, çevre dostu temizlik ürünleri kullanıyoruz.</p>
            </div>
            <div className="why-item">
              <div className="why-icon"><span style={{ fontSize: '32px' }}>⏱️</span></div>
              <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>Zamanında Hizmet</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Randevularınıza zamanında geliyor, söz verdiğimiz sürede tamamlıyoruz.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-banner">
        <div className="container stats-grid">
          <div>
            <div style={{ fontSize: '40px', fontWeight: '800', marginBottom: '8px' }}>10+</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>Yıllık Deneyim</div>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ fontSize: '40px', fontWeight: '800', marginBottom: '8px' }}>5000+</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>Mutlu Müşteri</div>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ fontSize: '40px', fontWeight: '800', marginBottom: '8px' }}>10000+</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>Tamamlanan Hizmet</div>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ fontSize: '40px', fontWeight: '800', marginBottom: '8px' }}>50+</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>Uzman Personel</div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="section-title">MÜŞTERİLERİMİZ NE DİYOR?</div>
          <div className="testimonial-card">
            <span style={{ fontSize: '48px', color: 'var(--accent)', lineHeight: 1, display: 'block', marginBottom: '16px' }}>"</span>
            <p style={{ fontSize: '18px', fontStyle: 'italic', marginBottom: '24px', fontWeight: '500' }}>
              Ev temizliği hizmeti aldık, çok memnun kaldık. Ekip çok profesyonel ve titizdi. Kesinlikle tavsiye ederim.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ccc', overflow: 'hidden' }}>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: '700' }}>Ayşe K.</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Melikgazi / Kayseri</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-title" style={{ textAlign: 'center' }}>BİLGİ BANKASI</div>
          <h2 className="section-heading" style={{ textAlign: 'center' }}>Blog Yazılarımız</h2>
          <BlogSlider blogs={blogs} />
        </div>
      </section>
    </>
  )
}
