import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const prisma = new PrismaClient();

// PERSONALIZE: edit the services below, then run `npm run db:seed`.
const services = [
  {
    slug: "bach-flowers",
    title: "Bach Çiçekleri Nedir?",
    description:
      "Bach Çiçekleri (Bach Flower Remedies), İngiliz doktor, bakteriyolog ve homeopat Dr. Edward Bach tarafından 1930’lu yıllarda geliştirilmiş doğal bir destek yöntemidir. Dr. Bach, uzun yıllar boyunca yaptığı gözlemler sonucunda insanların fiziksel rahatsızlıklarının çoğunun altında çözülmemiş duygusal çatışmaların, stresin ve içsel dengesizliklerin bulunduğunu savunmuştur. Ona göre gerçek iyilik hali, beden, zihin ve ruh arasındaki uyumun sağlanmasıyla mümkündür.",
    icon: "❀",
    priceLabel: "",
    durationMin: 60,
    order: 1,
  },
  {
    slug: "scio-quantum-biofeedback",
    title: "SCIO Quantum Biofeedback",
    description:
      "Bedenin enerjetik tepkilerini ölçen SCIO biofeedback teknolojisiyle stres kaynaklarını belirleyip nazik frekans çalışmalarıyla dengeyi destekleyen derinlemesine bir seans.",
    icon: "☾",
    priceLabel: "$140",
    durationMin: 60,
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

// Starter testimonials live in deploy/testimonials.seed.json (the same set the
// replace-testimonials script uses), so the seed and the prod sync never drift.
type SeedTestimonial = {
  quote: string;
  author: string;
  published?: boolean;
  order?: number;
};
const testimonials: SeedTestimonial[] = JSON.parse(
  readFileSync(join(process.cwd(), "deploy", "testimonials.seed.json"), "utf8"),
);

async function main() {
  console.log("Seeding database...");

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  // Keep the table in sync: remove services no longer present in the list above.
  // (Bookings store the service as a plain string, not a relation, so this is safe.)
  await prisma.service.deleteMany({
    where: { slug: { notIn: services.map((s) => s.slug) } },
  });

  // Testimonials are managed through the /admin panel, so we only seed the
  // starter set when the table is empty. Re-running the seed (e.g. on deploy)
  // must never wipe testimonials Hale has added or edited herself.
  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    for (const testimonial of testimonials) {
      await prisma.testimonial.create({ data: testimonial });
    }
    console.log(`Seeded ${testimonials.length} starter testimonials.`);
  } else {
    console.log(
      `Skipped testimonials — ${existingTestimonials} already present (managed via /admin).`,
    );
  }

  console.log(`Seeded ${services.length} services.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
