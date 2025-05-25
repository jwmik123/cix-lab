# Creative and Cultural Industries Lab Website

A modern Next.js website with Sanity CMS for the University of Amsterdam's Creative and Cultural Industries (CI/X: Lab) research group.

## 🚀 Project Overview

This website showcases interdisciplinary research in creative and cultural industries from a business-science perspective. Built with modern web technologies for performance, accessibility, and maintainability.

### Tech Stack

- **Frontend**: Next.js 15 with App Router
- **CMS**: Sanity CMS v3
- **Styling**: Tailwind CSS
- **Fonts**: Raleway (headings), Inter (body text)
- **Deployment**: Vercel (recommended)
- **Language**: TypeScript

## 📁 Project Structure

```
├── nextjs-app/          # Next.js frontend application
│   ├── app/             # App Router pages and components
│   │   ├── components/  # Reusable UI components
│   │   ├── research/    # Research pages
│   │   ├── publications/# Publications pages
│   │   ├── people/      # Team member pages
│   │   └── projects/    # Project pages
│   └── sanity/          # Sanity client configuration
└── studio/              # Sanity Studio CMS
    └── src/
        └── schemaTypes/ # Content schemas
```

## 🎨 Content Types

### Documents

- **People**: Team members with profiles, roles, and bios
- **Research**: Research projects with categories and authors
- **Publications**: Academic publications with DOI and journal info
- **Projects**: Lab projects with status tracking
- **Pages**: General content pages
- **Posts**: Blog posts and news

### Features

- Bidirectional relationships between people and content
- Category-based filtering for research
- Rich text content with block editor
- Image optimization and alt text validation
- SEO-friendly URLs and metadata

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cix-lab
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install Next.js app dependencies
   cd nextjs-app
   npm install

   # Install Sanity Studio dependencies
   cd ../studio
   npm install
   ```

3. **Environment Setup**

   Create `.env.local` in the `nextjs-app` directory:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=your_read_token
   ```

4. **Start Development Servers**

   Terminal 1 - Next.js app:

   ```bash
   cd nextjs-app
   npm run dev
   ```

   Terminal 2 - Sanity Studio:

   ```bash
   cd studio
   npm run dev
   ```

### URLs

- **Website**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333

## 📝 Content Management

### Adding Content

1. **Access Sanity Studio** at http://localhost:3333
2. **Create People** first (required for author relationships)
3. **Add Research, Publications, and Projects** with author references
4. **Use the "Featured" toggle** to display content on homepage

### Content Guidelines

- **Images**: Always include alt text for accessibility
- **Slugs**: Auto-generated from titles, can be customized
- **Authors**: Link content to people for automatic relationship building
- **Categories**: Use predefined research categories for consistency

## 🎨 Design System

### Colors

- **Primary**: Custom red-500 palette (#3b82f6 family)
- **Gray**: Neutral grays for text and backgrounds
- **Status**: Green (active), red-500 (completed), Yellow (upcoming)

### Typography

- **Headings**: Raleway (bold, extrabold)
- **Body**: Inter (regular, medium)
- **Responsive**: Mobile-first approach

### Components

- **Cards**: Hover effects with image scaling
- **Buttons**: Consistent styling with color transitions
- **Navigation**: Fixed header with smooth scrolling
- **Grid**: Responsive layouts (1/2/3/4 columns)

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository** to Vercel
2. **Set Environment Variables** in Vercel dashboard
3. **Deploy** automatically on git push

### Environment Variables for Production

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
```

### Sanity Studio Deployment

```bash
cd studio
npm run build
npm run deploy
```

## 📊 Performance Features

- **Image Optimization**: Next.js Image component with lazy loading
- **Static Generation**: ISR for dynamic content
- **Font Optimization**: Google Fonts with display swap
- **Bundle Optimization**: Tree shaking and code splitting
- **SEO**: Structured metadata and Open Graph tags

## 🔧 Customization

### Adding New Content Types

1. **Create Schema** in `studio/src/schemaTypes/documents/`
2. **Export Schema** in `studio/src/schemaTypes/index.ts`
3. **Create Pages** in `nextjs-app/app/`
4. **Add Navigation** in Header component

### Styling Changes

- **Colors**: Update `tailwind.config.ts`
- **Fonts**: Modify font imports in `layout.tsx`
- **Components**: Edit component files in `app/components/`

## 📚 Key Pages

- **Homepage** (`/`): Hero, mission, featured research
- **Research** (`/research`): Filterable research grid
- **Publications** (`/publications`): Academic publication list
- **People** (`/people`): Team member directory
- **Projects** (`/projects`): Project showcase with status

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or issues:

- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review [Sanity Documentation](https://www.sanity.io/docs)
- Contact the development team

---

**University of Amsterdam**  
Creative and Cultural Industries Lab  
Faculty of Economics and Business
