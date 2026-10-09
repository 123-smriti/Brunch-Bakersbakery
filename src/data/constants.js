
// Header navigation. A null target means "open the store finder" instead of changing page.
export const NAV = [
  ["Home", "/"], ["Our Story", "/about"], ["Menu", "/products"], ["Franchise", "/franchise"],
  ["Investment Calculator", "/franchise#investment-calculator"], ["Find a Store", null], ["Contact", "/contact"],
];

// Hero carousel: four full-width photos in /public/hero (each in 840w and 1680w).
// dark = the photo is dark behind the text, so the copy switches to light (desktop only).
// pos / posM = object-position on desktop / phone; the photos are mirrored in CSS so the cake sits right of the copy.
const slide = (n, label, alt, o = {}) => ({
  label, alt, dark: !!o.dark,
  src: `/hero/hero-${n}-1680.webp`,
  srcSet: `/hero/hero-${n}-840.webp 840w, /hero/hero-${n}-1680.webp 1680w`,
  width: 1680, height: o.height || 943, pos: o.pos || "50% 35%", posM: o.posM || "6% 50%",
});
export const SLIDES = [
  slide(1, "Celebration Cakes", "Two-tier cream cake with gold-leaf sugar flowers on a marble stand"),
  slide(2, "Chocolate Drip Cake", "Chocolate drip cake topped with berries and dark chocolate shards", { dark: true }),
  slide(3, "Sea-Glass Cake", "Three-tier blue sea-glass cake with sugar waves and shells"),
  slide(4, "Garden Cake", "Cream and sage-green cake with white blossoms and leaves"),
  // this photo was widened (plain wall and table extended) so the cake sits clear of the copy
  slide(5, "Lace & Roses", "Two-tier white cake with red lace piping and a pink bow on a white stand against a pink wall", { height: 762, pos: "50% 50%", posM: "28% 50%" }),
];

export const VALUES = [
  ["🥄", "Authentic Recipes", "Classic home-style recipes made with fresh ingredients."],
  ["💛", "Baked with Love", "Passion in every bake, smiles on every plate."],
  ["✅", "Committed to Quality", "From our kitchen to your doorstep, quality comes first."],
  ["🏷️", "Honestly Priced", "Great products at fair prices."],
];
export const TESTIMONIALS = [
  ["Warm brownies that melt in your mouth. Always on my must-visit list.", "Aarav K., Gurgaon"],
  ["The chocolate truffle is unforgettable. A must for any sweet tooth.", "Priya S., Mumbai"],
  ["Gorgeous packaging and even better taste. Every order feels special.", "Rohan M., Bangalore"],
];
export const FOOTER_LINKS = ["Store Locator", "Privacy Policy", "FAQs", "Nutritional Info", "Terms & Conditions", "Refund Policy", "Our Story"];
export const CITIES = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Chennai", "Kolkata", "Jaipur", "Lucknow", "Chandigarh", "Ranchi"];
