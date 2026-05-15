import { prisma } from '../src/lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const hashedPassword = await bcrypt.hash('ArinTemizlikKayseri_8345', 10)

  // Upsert Admin
  const admin = await prisma.admin.findFirst({
    where: { name: 'Mustafa' },
  })

  if (!admin) {
    await prisma.admin.create({
      data: {
        name: 'Mustafa',
        surname: 'Kosmaz',
        password: hashedPassword,
      },
    })
    console.log('Admin user created (Mustafa / Kosmaz / ArinTemizlikKayseri_8345)')
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
    console.log('10 initial services created')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
