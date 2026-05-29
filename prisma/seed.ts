import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PERSONALIZE: edit the services and testimonials below, then run `npm run db:seed`.
const services = [
  {
    slug: "reiki-energy-healing",
    title: "Reiki Energy Healing",
    description:
      "A deeply relaxing session that clears energetic blockages and restores the natural flow of life force throughout the body.",
    icon: "✦",
    priceLabel: "$90",
    durationMin: 60,
    order: 1,
  },
  {
    slug: "holistic-wellness-journey",
    title: "Holistic Wellness Journey",
    description:
      "An extended, whole-person session combining energy work, intuitive guidance, and grounding practices for lasting balance.",
    icon: "☾",
    priceLabel: "$140",
    durationMin: 90,
    featured: true,
    order: 2,
  },
  {
    slug: "chakra-balancing",
    title: "Chakra Balancing",
    description:
      "Realign and harmonize your energy centers, releasing tension and inviting clarity, calm, and renewed vitality.",
    icon: "❋",
    priceLabel: "$100",
    durationMin: 75,
    order: 3,
  },
  {
    slug: "distance-healing",
    title: "Distance Healing",
    description:
      "Receive the gift of healing energy from the comfort of your own home, guided through a live online connection.",
    icon: "✸",
    priceLabel: "$75",
    durationMin: 45,
    order: 4,
  },
  {
    slug: "guided-meditation",
    title: "Guided Meditation",
    description:
      "A calming, intention-led meditation to quiet the mind, soften the body, and return you to a place of stillness.",
    icon: "✿",
    priceLabel: "$60",
    durationMin: 45,
    order: 5,
  },
  {
    slug: "discovery-call",
    title: "Discovery Call",
    description:
      "A complimentary conversation to explore your needs and find the right healing path — no commitment, just connection.",
    icon: "✦",
    priceLabel: "Free",
    durationMin: 20,
    order: 6,
  },
];

const testimonials = [
  {
    quote:
      "I left my session feeling lighter than I have in years. The space she holds is truly sacred — I felt completely safe to let go.",
    author: "Maya R.",
    order: 1,
  },
  {
    quote:
      "Her intuition is remarkable. She sensed exactly what I needed and guided me with such warmth and care. I've come back ever since.",
    author: "James T.",
    order: 2,
  },
  {
    quote:
      "The most peaceful, grounding experience. I think of our sessions as a reset for my whole being — body, mind, and soul.",
    author: "Aisha L.",
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
