# Investor Radar - Carousel Maker
# رادار المستثمر - صانع الكاروسيل الاحترافي

A professional carousel maker for creating investor radar visualizations with customizable themes, experts, and CSS styling.

## 🚀 Deploy to Vercel

### Option 1: Deploy Directly (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
```

## 📋 Build & Preview Locally

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🎨 Features

- **Customizable Themes**: Multiple professional themes
- **Expert Cards**: Add/edit expert profiles with images
- **Custom CSS**: Built-in CSS editor for advanced styling
- **Export**: Download high-quality PNG images
- **RTL Support**: Full Arabic language support
- **Responsive Design**: Works on all screen sizes

## 📁 Project Structure

```
├── App.tsx                 # Main application component
├── components/
│   ├── CanvasArea.tsx     # Carousel display component
│   └── Sidebar.tsx        # Controls sidebar
├── styles.css             # All CSS styles (friendly class names)
├── constants.tsx          # App constants and data
├── types.ts               # TypeScript type definitions
├── index.tsx              # Entry point
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
└── vercel.json            # Vercel deployment settings
```

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Language**: TypeScript
- **Icons**: Lucide React
- **Export**: html-to-image

## 📝 Notes

- All CSS styles are in `styles.css` with friendly class names
- The app supports custom CSS through the built-in editor
- Export quality is set to high-resolution (3x pixel ratio)

## 🔗 Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
