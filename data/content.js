/**
 * ─────────────────────────────────────────────────────────────────
 *  HIEZY CONTENT STORE
 *  Single source of truth for all editable content on the site.
 *
 *  HOW TO USE:
 *    • Add / edit / remove projects in INSPIRATIONS below.
 *    • Add / remove client logos in CLIENTS below.
 *    • Both index.html and inspirations.html pull from here.
 *
 *  FOLDER RULE:
 *    Thumbnails  →  assets/inspirations/<category>/<filename>.png
 *    PDFs        →  assets/inspirations/<category>/<filename>.pdf
 * ─────────────────────────────────────────────────────────────────
 */

const HIEZY = {

  brand: {
    logo: "assets/images/brand/hiezy-logo.webp",
    favicon: "assets/images/brand/favicon.webp",
    logoAlt: "Hiezy logo",
    name: "Hiezy Web Solutions"
  },

  // ─── INSPIRATION PROJECTS ───────────────────────────────────────
  inspirations: {

    landing: [
      {
        title: "Tourism Website",
        description: "A bold, high-conversion landing page for modern tourism business. Clean design and strong call-to-actions.",
        tags: ["Modern", "Dynamic", "Bold"],
        img1: "assets/inspirations/landing/chaleto.ca/preview-1.webp",
        img2: "assets/inspirations/landing/chaleto.ca/preview-2.webp",
        pdf: null
      },
      {
        title: "Makeup Bridal Studio",
        description: "A serene landing page for health and lifestyle apps. Calming colors and a flowing layout build immediate user trust.",
        tags: ["Serene", "Healthcare", "Soft"],
        img1: "assets/inspirations/landing/veramakeupvan.com/preview-1.webp",
        img2: "assets/inspirations/landing/veramakeupvan.com/preview-2.webp",
        pdf: null
      }
    ],

    ecommerce: [
      {
        title: "Online Cosmetic Store",
        description: "A premium e-commerce experience for high-end fashion. Elegant layout transitions and minimal product grids.",
        tags: ["Classic", "Luxury", "Minimal"],
        img1: "assets/inspirations/e-commerce/bluemercury.com/preview-1.webp",
        img2: "assets/inspirations/e-commerce/bluemercury.com/preview-2.webp",
        pdf: null
      },
      {
        title: "Home Sweet Home",
        description: "Warm, minimal e-commerce for home decor. Large atmospheric photography and a soft, earthy palette.",
        tags: ["Cozy", "Clean", "Organic"],
        img1: "assets/inspirations/e-commerce/furniture/preview-1.webp",
        img2: "assets/inspirations/e-commerce/furniture/preview-2.webp",
        pdf: null
      }
    ],

    dashboards: [
      {
        title: "Admin Suite",
        description: "A data-rich internal tool designed for clarity and speed. Clear typography, modular components, and a sophisticated muted palette.",
        tags: ["Tech", "Modern", "Clean"],
        img1: "assets/inspirations/dashboard/materialM/preview-1.webp",
        img2: "assets/inspirations/dashboard/materialM/preview-2.webp",
        pdf: null   // e.g. "assets/inspirations/dashboards/nexus-admin.pdf"
      },
      {
        title: "Point of Sale (POS) System",
        description: "A modern & simple POS dashboard for real-time monitoring. Integrated Inventory Management for retail and hospitality businesses.",
        tags: ["Classic", "Minimal", "Clean"],
        img1: "assets/inspirations/dashboard/pos/preview-1.webp",
        img2: "assets/inspirations/dashboard/pos/preview-2.webp",
        pdf: null
      }
    ]

  },

  // ─── CLIENT LOGOS (marquee strip) ───────────────────────────────
  clients: [
    { name: "Vera Makeup", src: "assets/images/clients/client-vera-makeup.webp" },
    { name: "Tech Partner", src: "assets/images/clients/client-tech-logo.webp" },
    { name: "Creative Agency", src: "assets/images/clients/client-creative-agency.webp" },
    { name: "Fashion Brand", src: "assets/images/clients/client-fashion-monogram.webp" },
    { name: "Van 168 Coffee", src: "assets/images/clients/client-coffee-logo.webp" }
  ]

};
