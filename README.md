# eazySIP Corporate Website & Financial Calculators

> **India's First Nepali-Language Mutual Fund & Financial Goal Platform**  
> Built with Next.js 15 (App Router), TypeScript, Framer Motion, and Tailwind CSS.

---

## 📁 Repository & Folder Structure

```
├── app/                        # Next.js 15 App Router Routes
│   ├── [lang]/                 # Localized routes ([lang] = 'en' | 'ne')
│   │   ├── about/              # About Us page & regulatory disclosures
│   │   ├── contact/            # Contact form & Sikkim office locations
│   │   ├── features/           # App feature highlights
│   │   ├── how-it-works/       # 5-step investment process timeline
│   │   ├── learn/              # Educational knowledge hub & articles
│   │   ├── privacy-policy/     # Privacy policy & data protection
│   │   ├── risk-disclosure/    # SEBI & AMFI mandatory risk disclosures
│   │   ├── sip-calculator/     # SIP Growth & Target Goal Calculators page
│   │   ├── terms/              # Terms & conditions of service
│   │   ├── watch/              # Video learning center
│   │   ├── layout.tsx          # Root layout with font optimization & SEO schema
│   │   └── page.tsx            # Main landing page
│   ├── globals.css             # Tailwind CSS & global styles
│   └── icon.svg                # Favicon asset
│
├── components/                 # Organized UI Components & Modules
│   ├── index.ts                # Centralized barrel export for clean imports
│   ├── animations/             # Reusable Framer Motion animation primitives
│   │   ├── FadeIn.tsx          # Smooth opacity fade-in on scroll
│   │   ├── Marquee.tsx         # Infinite scrolling banner marquee
│   │   ├── ScrollProgress.tsx  # Viewport top scroll indicator bar
│   │   ├── ScrollScale.tsx     # Scale & zoom-in scroll reveal
│   │   ├── ScrollSlide.tsx     # Directional slide-in scroll reveal
│   │   ├── SlideUp.tsx         # Vertical slide-up entrance
│   │   └── StaggeredContainer.tsx # Cascading grid item reveals
│   ├── brand/                  # Logo & Vector Graphics
│   │   ├── Logomark.tsx        # Official eazySIP logo brand mark
│   │   └── SwirlMark.tsx       # Swirl iconography element
│   ├── calculators/            # Interactive Investment Calculators
│   │   ├── CalculatorContainer.tsx # Dual card selection container
│   │   ├── GoalCalculator.tsx  # Target Goal Savings Calculator (Value Research model)
│   │   └── SipCalculator.tsx   # Monthly SIP compound growth calculator
│   ├── client/                 # Dynamic Client Interactive Views
│   │   ├── LearnClient.tsx     # Knowledge hub article grid & filters
│   │   └── WatchClient.tsx     # Video explainer library
│   ├── layout/                 # Site Layout Components
│   │   ├── ContactModal.tsx    # Quick contact modal dialog
│   │   ├── Footer.tsx          # Comprehensive corporate footer
│   │   ├── Header.tsx          # Navigation header & mobile menu
│   │   └── LanguageToggle.tsx  # English / Nepali switcher dropdown
│   └── sections/               # Page Section Blocks
│       ├── AlternatingSections.tsx
│       ├── BenefitsSection.tsx
│       ├── BoldStatement.tsx
│       ├── FAQSection.tsx
│       ├── FinalCTA.tsx
│       ├── HeroBento.tsx
│       ├── HeroCarousel.tsx
│       ├── HeroGoalCards.tsx
│       ├── HeroScrollTransition.tsx
│       ├── HeroSection.tsx
│       ├── HowItWorksSection.tsx
│       ├── InvestTodaySection.tsx
│       ├── LatestBlogSection.tsx
│       ├── ObjectionSection.tsx
│       ├── ProblemSection.tsx
│       ├── ProductEcosystem.tsx
│       ├── QuickActionCards.tsx
│       ├── SolutionSection.tsx
│       ├── TestimonialCarousel.tsx
│       ├── TrustBar.tsx
│       ├── TrustSection.tsx
│       └── VideoSection.tsx
│
├── dictionaries/               # Internationalization Dictionaries
│   ├── en.json                 # English dictionary keys & copy
│   └── ne.json                 # Nepali dictionary keys & copy
│
├── lib/                        # Shared Utility Functions & Helpers
│   ├── dictionary.ts           # Type-safe server dictionary loader
│   └── sip-calc.ts             # Financial math formulas (SIP & Goal calculations)
│
├── public/                     # Public Static Assets & Media
│   ├── avatar-*.png            # Investor testimonial avatars
│   ├── blog-*.png              # Blog article header graphics
│   ├── hero-*.png / mp4        # Hero banners & explainer videos
│   ├── trustLogos/             # AMC Partner brand logos
│   ├── robots.txt              # Search engine crawler instructions
│   └── sitemap.xml             # XML Sitemap index
│
├── middleware.ts               # Next.js internationalization (i18n) routing middleware
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies & script commands
└── tsconfig.json               # TypeScript compiler configuration
```

---

## 🧮 Financial Calculators Logic (`lib/sip-calc.ts`)

1. **Monthly SIP Growth Calculator (`calculateSIP`)**:
   $$FV = P \times \left[ \frac{(1 + r)^n - 1}{r} \right] \times (1 + r)$$

2. **Target Financial Goal Calculator (`calculateGoalSIP`)**:
   - Calculates the required monthly SIP ($P$) to reach a targeted future corpus ($G$) considering an upfront lump sum ($L$):
   $$FV_{\text{lump}} = L \times (1 + r)^n$$
   $$P_{\text{monthly}} = \frac{(G - FV_{\text{lump}}) \times r}{\left( (1 + r)^n - 1 \right) \times (1 + r)}$$

---

## 🛠️ Development & Command Scripts

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript type check
npx tsc --noEmit

# Build production bundle
npm run build

# Start production server
npm start
```
