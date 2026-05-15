import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10)

    // Upsert Admin
    const admin = await prisma.admin.findFirst({
      where: { name: 'admin' },
    })

    if (!admin) {
      await prisma.admin.create({
        data: {
          name: 'admin',
          surname: 'admin',
          password: hashedPassword,
        },
      })
    }

    // Initial Content
    const initialContent = [
      { key: 'phone', value: '0533 295 20 38' },
      { key: 'email', value: 'info@arintemizlikkayseri.com' },
      { key: 'address', value: 'Tuna Mah. Şehit Buhari No:45 Melikgazi / Kayseri' },
      { key: 'heroTitle', value: 'Temizlikte Doğallık, Yaşamda Ferahlık.' },
      { key: 'heroSubtext', value: 'Ev, ofis, inşaat sonrası ve daha fazlası için profesyonel temizlik hizmetleri sunuyoruz.' },
      { key: 'whatsapp', value: '905332952038' }
    ]

    for (const item of initialContent) {
      await prisma.siteContent.upsert({
        where: { key: item.key },
        update: {},
        create: item,
      })
    }

    // Initial Services (10 services)
    const initialServices = [
      { title: 'Ev Temizliği', description: 'Evinizin her köşesini titizlikle temizliyoruz.', icon: 'home' },
      { title: 'Ofis Temizliği', description: 'Çalışma alanlarınızı hijyenik ve ferah hale getiriyoruz.', icon: 'office' },
      { title: 'Koltuk Yıkama', description: 'Koltuk, sandalye ve kanepe temizliği yapıyoruz.', icon: 'sofa' },
      { title: 'İnşaat Sonrası Temizlik', description: 'İnşaat sonrası anılan piri piri yapıyoruz.', icon: 'construction' },
      { title: 'Dış Cephe Temizliği', description: 'Binalarınızın dış cephelerini güvenle temizliyoruz.', icon: 'building' },
      { title: 'Halı Yıkama', description: 'Halılarınızı derinlemesine ve özenle yıkıyoruz.', icon: 'carpet' },
      { title: 'Endüstriyel Temizlik', description: 'Fabrika ve üretim alanları için özel çözümler.', icon: 'industry' },
      { title: 'Otel Temizliği', description: 'Konaklama tesisleri için profesyonel hizmet.', icon: 'hotel' },
      { title: 'Cami Temizliği', description: 'İbadethanelerinizin hijyenini sağlıyoruz.', icon: 'mosque' },
      { title: 'Okul Temizliği', description: 'Eğitim kurumları için sağlıklı ortamlar.', icon: 'school' },
    ]

    const existingServices = await prisma.service.count()
    if (existingServices === 0) {
      for (const service of initialServices) {
        await prisma.service.create({ data: service })
      }
    }

    // Sample Blog Posts (10 posts)
    const existingBlogs = await prisma.blogPost.count()
    if (existingBlogs === 0) {
      const sampleBlogs = [
        {
          title: 'Ev Temizliğinde Doğal Ürünler Nasıl Kullanılır?',
          content: 'Kimyasal temizlik ürünleri hem sağlığımıza hem de çevreye zarar verebilir. Karbonat, sirke ve limon gibi doğal malzemeler kullanarak evinizi hem daha güvenli hem de etkili bir şekilde temizleyebilirsiniz. Karbonat; mutfak ve banyodaki kireç lekelerine, yağ birikintilerine karşı mucizevi bir etki gösterir. Beyaz sirke ise yüzeyleri parlatır ve koku giderici özelliğiyle bilinir. Limon ise hem beyazlatıcı hem de antibakteriyel özelliğiyle temizliğinizi tamamlar. Bu üç malzemeyi birleştirerek hazırlayacağınız karışım, pek çok hazır ürünün yerini fazlasıyla alacaktır.',
          image: null,
          createdAt: new Date('2024-03-01'),
        },
        {
          title: 'Koltuk ve Kanepenizi Uzun Yıllar Temiz Tutmanın Sırları',
          content: 'Koltuk ve kanepeler evin en çok kullanılan mobilyaları arasında yer alır. Düzenli bakım ve doğru temizlik yöntemleri ile ömrünü önemli ölçüde uzatabilirsiniz. Öncelikle her hafta elektrikli süpürge ile yüzeyden kir ve toz alınmalıdır. Leke oluştuğunda hemen müdahale etmek büyük önem taşır; kumaşın cinsine göre uygun leke çıkarıcı kullanılmalıdır. Yılda en az iki kez profesyonel koltuk yıkama hizmeti almak ise derin temizlik sağlar ve alerjenleri ortadan kaldırır.',
          image: null,
          createdAt: new Date('2024-03-15'),
        },
        {
          title: 'İnşaat Sonrası Temizlik Neden Profesyonellere Bırakılmalıdır?',
          content: 'Yeni bir bina ya da tadilat sonrasında ortaya çıkan toz, harç ve boya kalıntıları, sıradan temizlik yöntemleriyle tamamen giderilemez. İnşaat tozu son derece ince partiküllerden oluşur ve ısıtma/soğutma sistemlerine, mobilya aralıklarına kadar her yere sızar. Profesyonel inşaat sonrası temizlik ekipleri, bu tür kirlerin üstesinden gelmek için özel ekipman ve kimyasallar kullanır. Böylece hem çok daha temiz bir ortam elde edersiniz hem de zemin, duvar gibi yüzeylerin zarar görmesini önlemiş olursunuz.',
          image: null,
          createdAt: new Date('2024-04-01'),
        },
        {
          title: 'Ofis Temizliği Çalışan Verimliliğini Nasıl Etkiler?',
          content: 'Araştırmalar, temiz ve düzenli bir çalışma ortamının çalışan verimliliğini %20\'ye kadar artırabileceğini ortaya koymaktadır. Masalarda biriken toz ve kir konsantrasyonu bozarken, kirli klima filtreleri hava kalitesini düşürerek yorgunluk ve baş ağrısına yol açar. Düzenli olarak yapılan profesyonel ofis temizliği hem hastalık kaynaklı izinleri azaltır hem de çalışanların motivasyonunu yüksek tutar. Şirketler için bu bir maliyet değil, uzun vadeli bir yatırımdır.',
          image: null,
          createdAt: new Date('2024-04-15'),
        },
        {
          title: 'Halı Yıkamada Dikkat Edilmesi Gerekenler',
          content: 'Halılar, evimizdeki en büyük bakteri ve toz akarı barınaklarından biridir. Düzenli süpürme yüzeysel temizlik sağlasa da derin temizlik için yılda en az bir kez profesyonel yıkama şarttır. Halı yıkamadan önce halının malzeme ve renk özellikleri incelenmeli, buna uygun deterjan seçilmelidir. Yanlış kimyasal kullanımı halının rengini soldurabileceği gibi liflerine de zarar verebilir. Profesyonel hizmetlerde kullanılan sıcak su ekstraksiyonu (steam cleaning) yöntemi en etkili derin temizleme tekniklerinden biridir.',
          image: null,
          createdAt: new Date('2024-05-01'),
        },
        {
          title: 'Mutfak Temizliğinde Hijyeni Sağlamanın 5 Altın Kuralı',
          content: 'Mutfak, evdeki en riskli alanların başında gelir. Gıda kalıntıları, nem ve ısı bir araya geldiğinde bakteri üremesi için ideal ortam oluşur. 1) Her yemek sonrası tezgahları silerek başlayın. 2) Buzdolabınızı haftada bir düzenleyin ve süresi geçen ürünleri atın. 3) Lavabonuzu her gece dezenfekte edin. 4) Fırın ve mikrodalganızı en az haftada bir kez temizleyin. 5) Mutfak bezlerini sık sık değiştirin veya kaynatın. Bu basit alışkanlıklar sayesinde mutfağınız her zaman hijyenik kalır.',
          image: null,
          createdAt: new Date('2024-05-15'),
        },
        {
          title: 'Banyo Temizliğinde Kireç ve Pas Lekelerinden Kurtuluş',
          content: 'Kireçli su bölgelerinde yaşayan herkesin en büyük sorunlarından biri armatürler ve fayanslar üzerinde biriken kireç lekeleridir. Bu lekelere karşı en etkili doğal yöntem beyaz sirkedir. Sirkeyi bir bez ya da kağıt havluya emdirerek armatürlere sarın ve 30 dakika bekleyin; ardından fırçayla ovalayın. Pas lekeleri için ise limon suyu ve tuz karışımı mucizevi sonuçlar verir. Ticari kireç çözücüler kullanacaksanız yüzeyin krom, porselen veya seramik olduğundan emin olun ve üreticinin talimatlarını takip edin.',
          image: null,
          createdAt: new Date('2024-06-01'),
        },
        {
          title: 'Mevsimlik Büyük Temizlik İçin Pratik Bir Plan',
          content: 'Mevsim başlarında yapılan büyük temizlik hem evinizi tazeler hem de yıl boyunca daha kolay düzen tutmanızı sağlar. Önce kullanmadığınız eşyaları ayırarak bağış ya da çöpe atma kararı verin. Ardından odaları teker teker ele alın: perdeler, halılar, koltuklar, panjurlar ve mobilya altları bu dönemde mutlaka temizlenmelidir. Dolap içlerini boşaltıp silmek ve mutfak dolaplarının raflarını yenilemek de listeye eklenebilir. Büyük temizliği yalnız yapmak yerine profesyonel destek almak işi hem çok hızlandırır hem de sonucu çok daha mükemmel kılar.',
          image: null,
          createdAt: new Date('2024-06-15'),
        },
        {
          title: 'Camii ve İbadethanelerin Hijyenik Tutulması Neden Önemlidir?',
          content: 'İbadethaneler, günlük yüzlerce hatta binlerce kişinin aynı alanda bulunduğu mekânlardır. Bu yoğun kullanım, hijyen açısından özel bir önem taşır. Namaz halıları düzenli olarak yıkanmalı ve havalandırılmalıdır. Abdest alma alanları her gün dezenfekte edilmelidir. Kış aylarında klimaların filtreleri temizlenmeli, kapı kolları ve tutamaklar sık sık silinmelidir. Profesyonel temizlik ekipleri, dini mekânlara özgü protokoller çerçevesinde çalışarak hem titiz bir temizlik yapar hem de mekânın kutsallığına saygı gösterir.',
          image: null,
          createdAt: new Date('2024-07-01'),
        },
        {
          title: 'Kayseri\'de Profesyonel Temizlik Hizmeti Almanın Avantajları',
          content: 'Kayseri\'nin hızla büyüyen şehir yapısıyla birlikte konut ve iş yeri sayısı da artmaktadır. Bu büyüme, profesyonel temizlik hizmetlerine olan ihtiyacı da beraberinde getirmektedir. Arın Temizlik olarak Kayseri\'nin tüm ilçelerinde; Melikgazi, Kocasinan, Talas ve Hacılar başta olmak üzere hızlı ve güvenilir hizmet sunuyoruz. Deneyimli ekibimiz, eco-friendly ürünlerimiz ve uygun fiyat politikamızla hem bireysel hem de kurumsal müşterilerimizin yanındayız. Hemen teklif alın, farkı birlikte yaşayalım!',
          image: null,
          createdAt: new Date('2024-07-15'),
        },
      ]

      for (const blog of sampleBlogs) {
        await prisma.blogPost.create({ data: blog })
      }
    }

    return NextResponse.json({ success: true, message: 'Database seeded' })
  } catch (error: any) {
    console.error('SEED ERROR:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
