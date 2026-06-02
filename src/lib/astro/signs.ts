// Single source of truth for zodiac + planet presentation data (TR names, glyphs,
// elements, modalities, rulerships). Replaces the SIGNS_TR / PLANET_TR / PLANET_GLYPHS
// constants previously duplicated across BirthChartForm, StarChartForm and natalChart.

export type PlanetKey =
  | "sun" | "moon" | "mercury" | "venus" | "mars" | "jupiter" | "saturn"
  | "uranus" | "neptune" | "pluto" | "northNode" | "southNode" | "chiron" | "lilith";

export type Element = "fire" | "earth" | "air" | "water";
export type Modality = "cardinal" | "fixed" | "mutable";

// Zodiac signs, index 0 = Aries.
export const SIGNS_TR = [
  "Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak",
  "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık",
] as const;

export const SIGN_GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"] as const;

export const SIGN_ELEMENTS: Element[] = [
  "fire", "earth", "air", "water", "fire", "earth",
  "air", "water", "fire", "earth", "air", "water",
];

export const SIGN_MODALITIES: Modality[] = [
  "cardinal", "fixed", "mutable", "cardinal", "fixed", "mutable",
  "cardinal", "fixed", "mutable", "cardinal", "fixed", "mutable",
];

export const ELEMENT_TR: Record<Element, string> = {
  fire: "Ateş", earth: "Toprak", air: "Hava", water: "Su",
};
export const MODALITY_TR: Record<Modality, string> = {
  cardinal: "Öncü", fixed: "Sabit", mutable: "Değişken",
};

// Planet display order (luminaries first), TR names and glyphs.
export const PLANET_ORDER: PlanetKey[] = [
  "sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn",
  "uranus", "neptune", "pluto", "chiron", "northNode", "southNode", "lilith",
];

export const PLANET_TR: Record<PlanetKey, string> = {
  sun: "Güneş", moon: "Ay", mercury: "Merkür", venus: "Venüs", mars: "Mars",
  jupiter: "Jüpiter", saturn: "Satürn", uranus: "Uranüs", neptune: "Neptün", pluto: "Plüton",
  northNode: "Kuzey Ay Düğümü", southNode: "Güney Ay Düğümü", chiron: "Chiron", lilith: "Lilith",
};

export const PLANET_GLYPHS: Record<PlanetKey, string> = {
  sun: "☉", moon: "☽", mercury: "☿", venus: "♀", mars: "♂",
  jupiter: "♃", saturn: "♄", uranus: "♅", neptune: "♆", pluto: "♇",
  chiron: "⚷", northNode: "☊", southNode: "☋", lilith: "⚸",
};

// Domicile ruler of each sign (traditional rulerships — used for dignities).
// index 0 = Aries.
export const SIGN_RULERS: PlanetKey[] = [
  "mars", "venus", "mercury", "moon", "sun", "mercury",
  "venus", "mars", "jupiter", "saturn", "saturn", "jupiter",
];

export function signIndex(lon: number): number {
  return Math.floor((((lon % 360) + 360) % 360) / 30);
}
