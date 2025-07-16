# Normandie AI Website

A modern, full-stack website built with Astro.js frontend and Strapi CMS backend for the Normandie AI initiative.
<img width="1512" height="823" alt="Capture d’écran 2025-07-16 à 23 44 28" src="https://github.com/user-attachments/assets/5ab4e6a9-9156-4fed-ab6c-c7cda9bb14d9" />

## 🏗️ Project Structure

This project consists of two main parts:

```
normandie-ai-website/
├── astro/          # Frontend (Astro.js)
└── strapi/         # Backend CMS (Strapi)
```

### Frontend (Astro)
- **Framework**: Astro.js with TypeScript
- **Styling**: TailwindCSS with custom design system
- **Fonts**: Custom typography (Avega, Maax)
- **Monitoring**: Sentry integration
- **Deployment**: GitHub Pages ready

### Backend (Strapi)
- **CMS**: Strapi v5 headless CMS
- **Database**: SQLite (development)
- **Content Types**: Pages, Members, Navigation
- **Plugins**: Documentation, Users & Permissions, Nested Populator

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd normandie-ai-website
```

### 2. Setup Backend (Strapi)
```bash
cd strapi
yarn install
yarn develop
```

The Strapi admin panel will be available at `http://localhost:1337/admin`

### 3. Setup Frontend (Astro)
```bash
cd astro
yarn install
yarn dev
```

The website will be available at `http://localhost:4321`

## 🔧 Development

### Frontend Commands (from `astro/` directory)

| Command | Action |
|---------|--------|
| `yarn dev` | Start development server at `localhost:4321` |
| `yarn build` | Build production site to `./dist/` |
| `yarn preview` | Preview production build locally |
| `yarn lint` | Run Biome linter |
| `yarn lint:fix` | Fix linting issues automatically |

### Backend Commands (from `strapi/` directory)

| Command | Action |
|---------|--------|
| `yarn develop` | Start Strapi in development mode |
| `yarn start` | Start Strapi in production mode |
| `yarn build` | Build Strapi admin panel |
| `yarn deploy` | Deploy to Strapi Cloud |

## 📝 Content Management

### Page Structure
Pages are managed through Strapi and support dynamic block composition:

- **Hero**: Full-screen banner with background image
- **Features**: Content sections with images
- **Team**: Team member showcase
- **Cards**: Grid of cards with content
- **Stats**: Statistics display
- **Grid List**: Organized content in grid format
- **Timeline**: Sequential content presentation
- **Highlight**: Featured content sections
- **Banner**: Promotional content with logo

### Content Types
- **Pages**: Dynamic pages with block composition
- **Members**: Team member profiles
- **Navigation**: Site navigation configuration

## 🎨 Design System

### Typography
- **Avega**: Display font for headings
- **Maax**: Body text font

### Colors
- Primary: `#725CFA` (Purple)
- Accent: `#6336E4` (Dark Purple)
- Background gradients available

### Components
The design system includes reusable components:
- `AvegaTitle`: Custom styled headings
- `Button`: Multiple variants (default, shadow, outline)
- `Card`: Content cards with background images
- `DayCounter`: Countdown timer component

## 🌍 Environment Configuration

### Astro Environment Variables
Create `astro/.env` file:
```env
STRAPI_URL=http://localhost:1337
```

### Strapi Environment Variables
Create `strapi/.env` file:
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret
```

## 🚀 Deployment

### Frontend (GitHub Pages)
The site is configured for automatic deployment to GitHub Pages:
- Deploys to: `https://normandie-ai.github.io`
- Automatic builds on push to main branch
- Base URL configuration handled automatically

### Backend (Strapi Cloud)
```bash
cd strapi
yarn strapi deploy
```

## 🛠️ Development Tools

### Code Quality
- **Biome**: Linting and formatting
- **TypeScript**: Type safety
- **Lefthook**: Git hooks for quality assurance

### Monitoring
- **Sentry**: Error tracking and performance monitoring
- **Spotlight**: Development debugging tools

## 📁 Key Directories

### Frontend Structure
```
astro/src/
├── components/
│   ├── blocks/          # Page building blocks
│   ├── shared/          # Reusable components
│   ├── Header.astro     # Site header
│   └── Footer.astro     # Site footer
├── layouts/             # Page layouts
├── pages/               # Route pages
├── lib/                 # Utility functions
└── styles/              # Global styles
```

### Backend Structure
```
strapi/src/
├── api/                 # API endpoints
│   ├── page/           # Page content type
│   ├── member/         # Member content type
│   └── navigation/     # Navigation content type
└── components/         # Reusable components
    └── blocks/         # Block definitions
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `yarn lint:fix`
5. Submit a pull request

## 📚 Documentation

- [Astro Documentation](https://docs.astro.build)
- [Strapi Documentation](https://docs.strapi.io)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
