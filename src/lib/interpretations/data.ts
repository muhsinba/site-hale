// Turkish interpretation phrase banks. Interpretations are composed from these parts
// (planet theme × sign quality, planet × house domain, planet pair × aspect tone) so
// every placement gets meaningful text without hand-authoring hundreds of paragraphs.
// Individual phrasings can be refined over time.

import type { PlanetKey } from "@/lib/astro/signs";
import type { AspectType } from "@/lib/astro/model";

// What each body represents — long form, used for planet-in-sign / planet-in-house.
export const PLANET_THEME: Record<PlanetKey, string> = {
  sun: "öz kimliğiniz ve yaşam gücünüz",
  moon: "duygusal dünyanız ve içsel ihtiyaçlarınız",
  mercury: "düşünme ve iletişim biçiminiz",
  venus: "sevgi, değerler ve estetik anlayışınız",
  mars: "enerjiniz, arzularınız ve harekete geçme biçiminiz",
  jupiter: "büyüme, bolluk ve inanç alanınız",
  saturn: "sorumluluk, disiplin ve sınırlarınız",
  uranus: "özgürlük arayışınız ve değişim ihtiyacınız",
  neptune: "hayal gücünüz, sezgileriniz ve ruhsal yönünüz",
  pluto: "dönüşüm gücünüz ve derin motivasyonlarınız",
  chiron: "en derin yaranız ve şifa yolculuğunuz",
  northNode: "bu yaşamda gelişmeye çağrıldığınız yön",
  southNode: "geçmişten getirdiğiniz tanıdık alışkanlıklar",
  lilith: "bastırılmış, ham ve evcilleşmemiş yanınız",
};

// Short keyword per body — used inside aspect sentences.
export const PLANET_SHORT: Record<PlanetKey, string> = {
  sun: "kimlik", moon: "duygular", mercury: "zihin", venus: "sevgi", mars: "eylem",
  jupiter: "büyüme", saturn: "disiplin", uranus: "özgürlük", neptune: "hayal",
  pluto: "dönüşüm", chiron: "şifa", northNode: "yön", southNode: "geçmiş", lilith: "ham güç",
};

// Sign quality as a descriptive clause (index 0 = Aries).
export const SIGN_TRAIT: string[] = [
  "cesur, öncü ve doğrudan",
  "sabırlı, istikrarlı ve duyulara dönük",
  "meraklı, esnek ve iletişime açık",
  "duygusal, koruyucu ve sezgisel",
  "yaratıcı, cömert ve kendini ifade eden",
  "titiz, analitik ve hizmete yönelik",
  "uyumlu, ilişkisel ve dengeyi gözeten",
  "yoğun, tutkulu ve dönüştürücü",
  "özgür, iyimser ve anlam arayan",
  "disiplinli, hırslı ve sorumlu",
  "özgün, yenilikçi ve bağımsız",
  "şefkatli, hayalperest ve sezgisel",
];

// Life domain of each house (1–12).
export const HOUSE_THEME: Record<number, string> = {
  1: "kişiliğiniz ve dışa yansıttığınız ilk izlenim",
  2: "maddi kaynaklarınız, değerleriniz ve öz değeriniz",
  3: "iletişim, öğrenme ve yakın çevreniz",
  4: "ev, aile ve duygusal kökleriniz",
  5: "yaratıcılık, aşk ve kendinizi ifade etme",
  6: "günlük rutinler, iş düzeniniz ve sağlığınız",
  7: "ortaklıklar, evlilik ve birebir ilişkiler",
  8: "dönüşüm, paylaşılan kaynaklar ve derinlik",
  9: "yüksek öğrenim, inançlar ve uzak ufuklar",
  10: "kariyer, toplumsal rolünüz ve hedefleriniz",
  11: "arkadaşlıklar, topluluklar ve gelecek idealleriniz",
  12: "bilinçaltınız, ruhsallık ve içe dönüş",
};

export const ASPECT_NAME_TR: Record<AspectType, string> = {
  conjunction: "Kavuşum", sextile: "Altmışlık", square: "Kare", trine: "Üçgen", opposition: "Karşıt",
};

export const ASPECT_TONE: Record<AspectType, string> = {
  conjunction: "güçlü biçimde birleşir ve birbirini yoğunlaştırır",
  sextile: "uyumlu bir fırsat akışıyla birbirini destekler",
  square: "gerilim yaratır ve sizi büyümeye, çaba göstermeye zorlar",
  trine: "doğal bir uyum ve kolaylıkla birlikte akar",
  opposition: "bir denge arayışı içinde karşı karşıya gelir",
};
