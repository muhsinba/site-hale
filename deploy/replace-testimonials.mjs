// One-off: replace ALL testimonials in the target DB with the contents of
// deploy/testimonials.seed.json. Run on the VM against the prod database:
//
//   cd /opt/sitehale
//   sudo -u sitehale env DATABASE_URL="file:/var/lib/sitehale/prod.db" \
//     node deploy/replace-testimonials.mjs
//
// Safe to re-run — it's idempotent (delete-all then insert the JSON set).
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  readFileSync(join(here, "testimonials.seed.json"), "utf8"),
);

const prisma = new PrismaClient();
const removed = await prisma.testimonial.deleteMany();
for (const t of data) {
  await prisma.testimonial.create({
    data: {
      quote: t.quote,
      author: t.author,
      published: t.published ?? true,
      order: t.order ?? 0,
    },
  });
}
console.log(`Removed ${removed.count}, inserted ${data.length} testimonials.`);
await prisma.$disconnect();
