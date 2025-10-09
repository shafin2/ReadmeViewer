# 📚 i-review - Markdown Documentation Viewer

A simple and elegant React application for viewing markdown documentation files with a clean two-panel interface.

## Features

✨ **Clean Interface** - Two-panel layout with file list on the left and rendered markdown on the right
📝 **Markdown Support** - Full GitHub Flavored Markdown (GFM) support
🎨 **Beautiful Styling** - Professional and readable documentation display
🚀 **Easy to Use** - Just drop your `.md` files and go!

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone this repository or use it as is
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser at `http://localhost:5173/`

## How to Add Your Documentation

1. **Add Markdown Files**: Simply place your `.md` files in the `public/docs/` folder

2. **That's it!** The app will automatically detect and list all markdown files when you run:
   - `npm run dev` (for development)
   - `npm run build` (for production)

The file list is automatically generated and sorted alphabetically. File names are converted to titles (e.g., `getting-started.md` → "Getting Started").

### Manual File List Generation

If you need to manually update the file list without restarting the server:

```bash
npm run generate-files
```

This will scan the `public/docs/` folder and update the `files.json` manifest.

## Project Structure

```
i-review/
├── public/
│   └── docs/              # Place your .md files here
│       ├── getting-started.md
│       ├── installation.md
│       └── api-reference.md
├── src/
│   ├── App.jsx           # Main app component
│   ├── App.css           # App styling
│   └── index.css         # Global styles
└── package.json
```

## Building for Production

Create a production build:

```bash
npm run build
```

The optimized files will be in the `dist/` folder, ready to deploy to any static hosting service.

## Deployment

You can deploy this app to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Push the `dist/` folder to `gh-pages` branch
- **Any static host**: Upload the `dist/` folder

## Customization

### Changing Colors

Edit `src/App.css` to customize the color scheme. Main colors used:
- Sidebar: `#2c3e50` (dark blue-gray)
- Active item: `#3498db` (blue)
- Content background: `white`

### Adding Features

Some ideas for extending the app:
- Add search functionality
- Dark mode toggle
- Export to PDF
- Table of contents generation
- Syntax highlighting for code blocks

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **react-markdown** - Markdown rendering
- **remark-gfm** - GitHub Flavored Markdown support

## License

MIT - Feel free to use this project however you'd like!

## Support

If you have questions or run into issues, feel free to open an issue on GitHub.

---

Made with ❤️ for documentation lovers

