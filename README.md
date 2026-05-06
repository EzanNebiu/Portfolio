# Personal Portfolio Website

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS. Features include project showcases with image galleries, working contact form, SEO optimization, and smooth animations.

![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

## ✨ Features

### Core Features
- 🎨 **Modern Design** - Clean, professional UI with glassmorphism effects
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🎭 **Smooth Animations** - Powered by Framer Motion
- ♿ **Accessible** - WCAG compliant with keyboard navigation
- 🌗 **Motion Preferences** - Respects `prefers-reduced-motion`

### Project Showcase
- 📸 **Multiple Images** - Each project supports image galleries
- 🖼️ **Image Slider** - Interactive carousel in project modals
- 🔍 **Project Filtering** - Filter by category (Frontend, Fullstack, Tool, AI)
- 📝 **Detailed Descriptions** - Full project information in modals
- 🔗 **Live Demo & GitHub Links** - Direct links to projects

### Contact Form
- 📧 **Working Form** - Integrated with Web3Forms (free)
- 🛡️ **Spam Protection** - Multiple layers of bot protection
- ✉️ **Email Validation** - Blocks disposable/temporary emails
- 🍯 **Honeypot Trap** - Catches automated bots
- ⏱️ **Time-Based Protection** - Prevents instant submissions
- 🚫 **Keyword Filtering** - Blocks spam content

### SEO Optimized
- 🔍 **Meta Tags** - Complete Open Graph and Twitter Card tags
- 📊 **Structured Data** - JSON-LD for rich search results
- 🗺️ **Sitemap** - XML sitemap for search engines
- 🤖 **Robots.txt** - Crawler instructions
- 🎯 **Semantic HTML** - Proper heading hierarchy

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite 8** - Lightning-fast build tool
- **Tailwind CSS 3** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Form & Integrations
- **Web3Forms** - Contact form backend (free, no server needed)

## 📋 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd protofolie
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Web3Forms access key:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your-key-here
   ```
   
   Get your free key at: https://web3forms.com/

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Customization Guide

### 1. Personal Information

Edit `src/data/personal.ts`:
```typescript
export const personal = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your@email.com',
  linkedInUrl: 'https://linkedin.com/in/yourprofile',
  gitHubUrl: 'https://github.com/yourusername',
  // ...
};
```

### 2. Projects

Edit `src/data/projects.ts`:
```typescript
{
  id: 'unique-id',
  title: 'Project Name',
  shortDescription: 'Brief description for cards',
  fullDescription: 'Detailed description for modal',
  technologies: ['React', 'TypeScript', 'Node.js'],
  mainImage: '/images/projects/main.png',      // Main card image
  images: [                                      // Modal gallery images
    '/images/projects/screenshot-1.png',
    '/images/projects/screenshot-2.png',
    '/images/projects/screenshot-3.png',
  ],
  liveUrl: 'https://demo.com',                 // Optional
  githubUrl: 'https://github.com/user/repo',   // Optional
  category: 'Frontend',                         // Frontend | Fullstack | Tool | AI
  featured: true,
}
```

### 3. Skills

Edit `src/data/skills.ts`:
```typescript
{
  label: 'Frontend',
  skills: [
    { name: 'React' },
    { name: 'TypeScript' },
    // Add more...
  ],
}
```

### 4. SEO Configuration

Edit `src/constants/config.ts`:
```typescript
export const SEO_CONFIG = {
  title: 'Your Name | Full-Stack Developer',
  description: 'Your description...',
  siteUrl: 'https://yourdomain.com',
  image: '/images/og-image.png',           // 1200x630px
  twitterHandle: '@yourhandle',
  // ...
};
```

### 5. Images

**Profile Image:**
- Location: `src/assets/profile.png`
- Size: 512x512px or higher

**CV/Resume:**
- Location: `public/cv.pdf`
- Update path in `src/constants/config.ts` if different

**Project Images:**
- Location: `public/images/projects/`
- Main images: 1200x630px recommended
- Gallery images: Any size, maintain consistency

**OpenGraph Image:**
- Location: `public/images/og-image.png`
- Size: 1200x630px (required for social sharing)
- Use tools: Canva, Figma, or og-image.vercel.app

**Apple Touch Icon:**
- Location: `public/images/apple-touch-icon.png`
- Size: 180x180px

### 6. Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  navy: {
    DEFAULT: '#0a0f1e',
    700: '#141b2d',
    800: '#1a1f35',
    900: '#0d1117',
  },
  blue: {
    DEFAULT: '#2563eb',
    light: '#3b82f6',
  },
  // Customize as needed
}
```

## 📁 Project Structure

```
protofolie/
├── public/
│   ├── images/
│   │   ├── og-image.png              # OpenGraph image (1200x630)
│   │   ├── apple-touch-icon.png     # Apple touch icon (180x180)
│   │   └── projects/                # Project screenshots
│   ├── cv.pdf                       # Your resume
│   ├── robots.txt                   # Crawler instructions
│   └── sitemap.xml                  # Site structure
├── src/
│   ├── assets/
│   │   └── profile.png              # Your profile photo
│   ├── components/
│   │   ├── common/                  # Reusable components
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── SEO.tsx              # Dynamic meta tags
│   │   │   └── StructuredData.tsx   # JSON-LD schema
│   │   ├── layout/                  # Layout components
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── SectionWrapper.tsx
│   │   ├── sections/                # Page sections
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx          # Contact form
│   │   │   ├── Hero.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Resume.tsx
│   │   │   └── Skills.tsx
│   │   └── ui/                      # UI components
│   │       ├── ImageSlider.tsx      # Image carousel
│   │       ├── ProjectCard.tsx      # Project preview card
│   │       └── ProjectModal.tsx     # Project details modal
│   ├── constants/
│   │   └── config.ts                # Site configuration
│   ├── data/
│   │   ├── navigation.ts            # Navigation items
│   │   ├── personal.ts              # Personal information
│   │   ├── projects.ts              # Project data
│   │   └── skills.ts                # Skills data
│   ├── hooks/
│   │   ├── useReducedMotion.ts      # Motion preference hook
│   │   └── useScrollSpy.ts          # Active section tracking
│   ├── types/
│   │   └── index.ts                 # TypeScript types
│   ├── utils/
│   │   └── cn.ts                    # Classname utility
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
├── .env                             # Environment variables (not committed)
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore rules
├── index.html                       # HTML entry point
├── package.json                     # Dependencies
├── tailwind.config.ts               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
└── vite.config.ts                   # Vite configuration
```

## 📧 Contact Form Setup

### Get Web3Forms Access Key

1. Visit: https://web3forms.com/
2. Sign up with your email (where you want to receive messages)
3. Verify your email
4. Copy your access key

### Add to Environment

Edit `.env` file:
```env
VITE_WEB3FORMS_ACCESS_KEY=your-actual-key-here
```

### Restart Dev Server

Environment variables require a server restart:
```bash
npm run dev
```

### Test the Form

1. Fill out the contact form
2. Check your email inbox
3. Messages arrive instantly!

### Spam Protection Included

- ✅ Email format validation
- ✅ Disposable email blocking
- ✅ Honeypot trap for bots
- ✅ Time-based submission check
- ✅ Spam keyword filtering
- ✅ Input length validation

## 🚀 Deployment

### Environment Variables

When deploying to hosting platforms, add environment variable:

**Vercel:**
1. Settings → Environment Variables
2. Add `VITE_WEB3FORMS_ACCESS_KEY`
3. Redeploy

**Netlify:**
1. Site settings → Build & deploy → Environment
2. Add `VITE_WEB3FORMS_ACCESS_KEY`
3. Redeploy

**Other Platforms:**
Add `VITE_WEB3FORMS_ACCESS_KEY` to your environment configuration.

### Before Deploying

Update these values:

1. **SEO URLs** - Replace `https://yourdomain.com/` with your actual domain:
   - `index.html` (meta tags)
   - `src/constants/config.ts` (SEO_CONFIG)
   - `public/robots.txt`
   - `public/sitemap.xml`

2. **Social Links** - Update in `src/data/personal.ts`

3. **Images** - Add all real images:
   - Profile photo
   - Project screenshots
   - OpenGraph image (1200x630px)
   - Apple touch icon (180x180px)

4. **CV/Resume** - Add to `public/cv.pdf`

### Build for Production

```bash
npm run build
```

The `dist/` folder contains your production-ready files.

## 🔍 SEO Features

### Meta Tags
- Title, description, keywords
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Canonical URLs
- Theme color

### Structured Data
- JSON-LD Person schema
- Job title and skills
- Social profile links
- Rich search results ready

### Performance
- Vite build optimization
- Image optimization recommended
- Lighthouse score ready

### Testing Your SEO

After deployment, test with:
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Google Rich Results](https://search.google.com/test/rich-results)

## ♿ Accessibility

- **WCAG AA Compliant** - Proper contrast ratios
- **Keyboard Navigation** - All interactive elements
- **ARIA Labels** - Screen reader friendly
- **Semantic HTML** - Proper heading hierarchy
- **Motion Preferences** - Respects `prefers-reduced-motion`
- **Focus Indicators** - Clear focus states

## 🎨 Design Features

- **Glassmorphism** - Translucent cards with backdrop blur
- **Gradient Text** - Eye-catching headings
- **Smooth Animations** - Framer Motion powered
- **Responsive Grid** - Adapts to all screen sizes
- **Dark Theme** - Navy blue color scheme
- **Interactive Cards** - Hover effects and transitions

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Ezan M. Nebija**
- Email: ezannebiu8@gmail.com
- LinkedIn: [Ezan Nebiu](https://www.linkedin.com/in/ezan-nebiu-2b0966311)
- GitHub: [EzanNebiu](https://github.com/EzanNebiu)

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and modern web technologies**
