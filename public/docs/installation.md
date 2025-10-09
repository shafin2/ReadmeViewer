# Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn package manager

## Installation Steps

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd i-review
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173/`

## Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist/` folder.

## Deployment

You can deploy the `dist/` folder to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

Enjoy your documentation viewer! 🚀
