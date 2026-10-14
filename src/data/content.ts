export type Segment = { t: string; h?: boolean }

export const PROFILE = {
  name: "Sail Dhadve",
  roles: ["Graphic Designer", "Video Editor"],
  phone: "8530809651",
  phoneHref: "tel:+918530809651",
  email: "saildhadve2910@gmail.com",
  emailHref: "mailto:saildhadve2910@gmail.com",
}

/* HELLO I'M A — exact bio, with yellow highlight segments */
export const BIO: Segment[] = [
  { t: "Graphic Designer & Video Editor", h: true },
  { t: " with over " },
  { t: "4 years", h: true },
  {
    t: " of professional experience in creating impactful visual content and brand-focused designs. Specialized in Adobe Illustrator, Photoshop, and Premiere Pro, with strong expertise in visual storytelling, branding, and multimedia production. Experienced in producing unique and creative video content, engaging social media visuals, and high-quality marketing materials, along with actively managing ",
  },
  { t: "professional photo shoots and video shoots", h: true },
  {
    t: " from concept to final execution. Passionate about delivering aesthetically refined, result-driven designs while continuously growing and evolving in the creative industry.",
  },
]

export const TOOLS = [
  "Adobe Illustrator",
  "Adobe Photoshop",
  "Adobe Premiere Pro",
  "Visual Storytelling",
  "Branding",
  "Multimedia Production",
]

/* MY EDUCATION */
export const EDUCATION = [
  {
    img: "/assets/edu/edu_1.jpg",
    school: "St. Anthony's high school",
    years: "2017 - 2018",
  },
  {
    img: "/assets/edu/edu_2.jpg",
    school: "Viva collage-Bcom",
    years: "2022 - 2023",
  },
]

/* EXPERIENCE */
export const EXPERIENCE = [
  {
    company: "Parijat Heights",
    period: "JUL 2022 - DEC 2023",
    role: "Graphic Designer & Video Editor",
    text: "Worked on real-estate and property-related creative content, including social media designs, promotional creatives, video editing, and marketing materials.",
  },
  {
    company: "Colour Cotes",
    period: "MAR 2023 - SEP 2023",
    role: "Visual Designer",
    text: "Worked with an interior design and furniture company, creating visual designs and marketing creatives for furniture and interior projects. Designed promotional materials, social media content, product visuals, and branding assets while maintaining a clean and premium aesthetic.",
  },
]

/* GRAPHIC POST */
export const GRAPHIC_POSTS = [
  { img: "/assets/gp/gp_0.jpg", title: "Luxury Watch", tag: "Product Poster" },
  { img: "/assets/gp/gp_1.jpg", title: "White Clouds", tag: "Social Campaign" },
  { img: "/assets/gp/gp_2.jpg", title: "Live Music", tag: "Event Poster" },
  { img: "/assets/gp/gp_3.jpg", title: "Gully Man", tag: "Concert Poster" },
  { img: "/assets/gp/gp_4.jpg", title: "Fairytale Wedding", tag: "Wedding Campaign" },
  { img: "/assets/gp/gp_5.jpg", title: "First Sip", tag: "Café Branding" },
  { img: "/assets/gp/gp_6.jpg", title: "Study in Dubai", tag: "Ad Campaign" },
  { img: "/assets/gp/gp_7.jpg", title: "Meghalaya's Weather", tag: "Hospitality" },
]

/* ILLUSTRATOR */
export const ILLUSTRATIONS = [
  { img: "/assets/il/il_a0.jpg", title: "Moonlit Wanderer" },
  { img: "/assets/il/il_a1.jpg", title: "Boba Cat" },
  { img: "/assets/il/il_b0.jpg", title: "Little Monkey" },
  { img: "/assets/il/il_b1.jpg", title: "Lavender" },
  { img: "/assets/il/il_c0.jpg", title: "Snow Bear" },
  { img: "/assets/il/il_c1.jpg", title: "Orange Shades" },
]

/* VIDEOS EDIT — 33 triptychs -> 99 frames */
export const VIDEO_GROUPS = [
  { name: "Real Estate", from: 0, to: 8 },
  { name: "Hospitality & Resorts", from: 8, to: 18 },
  { name: "Brand & Product", from: 18, to: 26 },
  { name: "Events & Lifestyle", from: 26, to: 33 },
]

export const VIDEO_CLIENTS = [
  "Wildpines",
  "The Bundela",
  "Mauli Network",
  "Konkan Crown",
  "Manas Resort",
  "Keshar Crown",
  "JERAI Fitness",
  "Food Menu",
]

export function videoFrames(from: number, to: number) {
  const out: string[] = []
  for (let i = from; i < to; i++) {
    const idx = String(i).padStart(2, "0")
    for (let c = 0; c < 3; c++) out.push(`/assets/ve/ve_${idx}_${c}.jpg`)
  }
  return out
}

export const NAV_ITEMS = [
  { id: "hello", label: "Hello" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "graphic-post", label: "Graphic Post" },
  { id: "videos-edit", label: "Videos Edit" },
  { id: "illustrator", label: "Illustrator" },
  { id: "contact", label: "Contact" },
]
