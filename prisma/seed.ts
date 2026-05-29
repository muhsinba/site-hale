import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PERSONALIZE: edit the services and testimonials below, then run `npm run db:seed`.
const services = [
  {
    slug: "reiki-energy-healing",
    title: "Reiki Enerji Şifası",
    description:
      "Bedendeki enerji tıkanıklıklarını açan ve yaşam enerjisinin doğal akışını yeniden sağlayan, derinlemesine rahatlatıcı bir seans.",
    icon: "✦",
    priceLabel: "$90",
    durationMin: 60,
    order: 1,
  },
  {
    slug: "holistic-wellness-journey",
    title: "Bütünsel İyilik Yolculuğu",
    description:
      "Kalıcı denge için enerji çalışması, sezgisel rehberlik ve topraklanma uygulamalarını birleştiren, kişinin tümünü kapsayan uzun bir seans.",
    icon: "☾",
    priceLabel: "$140",
    durationMin: 90,
    featured: true,
    order: 2,
  },
  {
    slug: "chakra-balancing",
    title: "Çakra Dengeleme",
    description:
      "Enerji merkezlerinizi yeniden hizalayıp uyumlandırarak gerilimi bırakır; berraklık, sükûnet ve yenilenmiş bir canlılık davet eder.",
    icon: "❋",
    priceLabel: "$100",
    durationMin: 75,
    order: 3,
  },
  {
    slug: "distance-healing",
    title: "Uzaktan Şifa",
    description:
      "Şifa enerjisini kendi evinizin rahatlığında, canlı bir çevrimiçi bağlantı aracılığıyla alın.",
    icon: "✸",
    priceLabel: "$75",
    durationMin: 45,
    order: 4,
  },
  {
    slug: "guided-meditation",
    title: "Rehberli Meditasyon",
    description:
      "Zihni susturan, bedeni yumuşatan ve sizi dinginlik haline geri döndüren, niyet odaklı sakinleştirici bir meditasyon.",
    icon: "✿",
    priceLabel: "$60",
    durationMin: 45,
    order: 5,
  },
  {
    slug: "discovery-call",
    title: "Tanışma Görüşmesi",
    description:
      "İhtiyaçlarınızı keşfetmek ve doğru şifa yolunu bulmak için ücretsiz bir sohbet — taahhüt yok, yalnızca bağ kurmak.",
    icon: "✦",
    priceLabel: "Ücretsiz",
    durationMin: 20,
    order: 6,
  },
];

const testimonials = [
  {
    quote:
      "Seansımdan yıllardır olmadığım kadar hafiflemiş ayrıldım. Yarattığı alan gerçekten kutsal — bırakmak için kendimi tamamen güvende hissettim.",
    author: "Elif K.",
    order: 1,
  },
  {
    quote:
      "Sezgileri olağanüstü. Tam olarak neye ihtiyacım olduğunu hissetti ve bana büyük bir sıcaklık ve özenle rehberlik etti. O günden beri düzenli olarak geliyorum.",
    author: "Mehmet T.",
    order: 2,
  },
  {
    quote:
      "Yaşadığım en huzurlu, en topraklayıcı deneyim. Seanslarımızı tüm varlığım için bir sıfırlama olarak görüyorum — beden, zihin ve ruh.",
    author: "Ayşe L.",
    order: 3,
  },
];

async function main() {
  console.log("Seeding database...");

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  // Testimonials have no natural unique key; reset and re-create.
  await prisma.testimonial.deleteMany();
  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  console.log(
    `Seeded ${services.length} services and ${testimonials.length} testimonials.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
