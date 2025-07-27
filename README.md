# Tech-Digest React - Modern Tech News Website

A responsive, modern tech news website built with React, featuring a clean design with blue/gray palette, smooth animations, and integration with the Dev.to API for real-time tech news.

## 🚀 Features

### Design & Layout
- **Responsive Design**: Mobile-first approach with desktop and tablet layouts
- **Modern UI**: Clean, professional design with blue/gray color palette
- **Typography**: Inter font family for excellent readability
- **Smooth Animations**: Framer Motion animations and hover effects

### React Components
1. **Navbar**: Responsive navigation with mobile hamburger menu
2. **Hero**: Animated hero section with CTA buttons
3. **NewsSection**: Dynamic news grid with API integration
4. **NewsletterCTA**: Email subscription with validation
5. **Footer**: Comprehensive site information and social links
6. **DeveloperCredits**: Developer attribution and contact information

### Interactive Features
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Smooth Scrolling**: Navigation links with smooth scroll behavior
- **News API Integration**: Real-time tech news from Dev.to API
- **Load More**: Infinite scroll pagination for articles
- **Newsletter Forms**: Email validation and toast notifications
- **Hover Animations**: Card hover effects and social media interactions

### Technical Features
- **React 18**: Latest React features and hooks
- **Styled Components**: CSS-in-JS styling
- **Framer Motion**: Smooth animations and transitions
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **React Hot Toast**: Toast notifications
- **React Icons**: Icon library
- **Intersection Observer**: Scroll-based animations

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **React Router DOM**: Client-side routing
- **Styled Components**: CSS-in-JS styling
- **Framer Motion**: Animation library
- **Axios**: HTTP client
- **React Hot Toast**: Toast notifications
- **React Icons**: Icon library
- **React Intersection Observer**: Scroll animations
- **Dev.to API**: Real-time tech news content

## 📁 Project Structure

```
Tech-Digest-React/
├── public/
│   ├── index.html          # Main HTML file
│   ├── _redirects          # Netlify redirects for SPA
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO robots file
├── src/
│   ├── components/
│   │   ├── Navbar.js       # Navigation component
│   │   ├── Hero.js         # Hero section component
│   │   ├── NewsSection.js  # News grid component
│   │   ├── NewsCard.js     # Individual news card
│   │   ├── NewsletterCTA.js # Newsletter component
│   │   ├── Footer.js       # Footer component
│   │   └── DeveloperCredits.js # Developer credits
│   ├── App.js              # Main app component
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── build/                  # Production build (generated)
├── package.json            # Dependencies and scripts
├── netlify.toml           # Netlify configuration
├── deploy.md              # Deployment guide
├── deploy.bat             # Windows deployment script
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or Download** the project files
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Start Development Server**:
   ```bash
   npm start
   ```
4. **Open** `http://localhost:3000` in your browser

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm run build:prod` - Build for production (no CI checks)
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🌐 Deployment

### Quick Deploy to Netlify

#### Option 1: Drag & Drop (Easiest)
1. Run the deployment script: `deploy.bat` (Windows) or manually:
   ```bash
   npm install
   npm run build
   ```
2. Go to [Netlify](https://netlify.com) and sign up/login
3. Drag the `build` folder to the Netlify dashboard
4. Your site will be live instantly!

#### Option 2: Connect GitHub Repository
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com) and click "New site from Git"
3. Connect your GitHub account
4. Select your repository
5. Set build command: `npm run build`
6. Set publish directory: `build`
7. Click "Deploy site"

### Deployment Files Included
- `netlify.toml` - Netlify configuration
- `public/_redirects` - SPA routing support
- `public/manifest.json` - PWA support
- `public/robots.txt` - SEO optimization
- `deploy.md` - Detailed deployment guide

For detailed deployment instructions, see [deploy.md](deploy.md)

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563eb` (Buttons, links, accents)
- **Dark Blue**: `#1e40af` (Gradients, hero background)
- **Light Blue**: `#3b82f6` (Secondary elements)
- **Gray Scale**: `#1f2937`, `#374151`, `#6b7280`, `#9ca3af`
- **White**: `#ffffff` (Background, text on dark)
- **Light Gray**: `#f8fafc` (Section backgrounds)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Sizes**: Responsive scaling from 0.875rem to 3.5rem

### Spacing
- **Container**: Max-width 1200px with responsive padding
- **Sections**: 80px vertical padding
- **Cards**: 1.5rem padding with 2rem gaps

## 🔧 API Integration

The website integrates with the Dev.to API to fetch real-time tech news:

```javascript
// API Endpoint
https://dev.to/api/articles?page=1&per_page=6&tag=technology
```

### Features
- **Automatic Fallback**: Local content when API is unavailable
- **Error Handling**: Graceful degradation on API failures
- **Loading States**: Spinner animation during data fetching
- **Infinite Scroll**: Load more articles on scroll
- **Caching**: Efficient data management

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

### Mobile Features
- Hamburger navigation menu
- Single-column news grid
- Optimized touch targets
- Reduced font sizes for readability

## 🎯 Performance Optimizations

- **Code Splitting**: React.lazy for component loading
- **Memoization**: React.memo for performance
- **Lazy Loading**: Images load only when needed
- **Efficient Animations**: Framer Motion optimizations
- **Minimal Dependencies**: Only essential packages
- **Bundle Optimization**: Tree shaking and code splitting

## 🔍 Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliant color ratios
- **Focus Indicators**: Clear focus states for interactive elements
- **Screen Reader Support**: Proper ARIA attributes

## 🚀 Deployment

The website is ready for deployment on any static hosting service:

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Netlify**: Drag and drop deployment
- **Vercel**: Connect repository for automatic deployment
- **GitHub Pages**: Push to repository and enable Pages
- **AWS S3**: Static website hosting
- **Firebase Hosting**: Google's hosting platform

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Dev.to**: For providing the tech news API
- **Unsplash**: For high-quality stock images
- **React Team**: For the amazing React framework
- **Framer Motion**: For smooth animations
- **Styled Components**: For CSS-in-JS styling

## 📞 Support

For questions or support, please contact:
- **Developer**: Ravi Raj
- **GitHub**: [@raviraj0007](https://github.com/raviraj0007)
- **Email**: raviraj04066@gmail.com

---

**Tech-Digest React** - Stay ahead with the latest tech insights! 🚀

*Developed with ❤️ by [Ravi Raj](https://github.com/raviraj0007)* 
