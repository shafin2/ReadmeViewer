# FAQ - Frequently Asked Questions

## General Questions

### What is this application?

This is a simple documentation viewer built with React that displays markdown files in a clean, two-panel interface. It's perfect for creating internal documentation, guides, wikis, or any collection of markdown files.

### Do I need to know React to use this?

No! Once the app is set up, you only need to:
1. Add `.md` files to the `public/docs/` folder
2. Run `npm run dev`

That's it! No coding required.

## Adding Documentation

### How do I add a new document?

Simply drop your `.md` file into the `public/docs/` folder and restart the dev server (`npm run dev`). The file will automatically appear in the sidebar.

### What happens if I rename a file?

Just restart the dev server or run `npm run generate-files`, and the new name will be reflected immediately.

### Can I organize files in subfolders?

Currently, the app only scans the root `public/docs/` folder. Subfolder support could be added as a future enhancement!

### What markdown features are supported?

This app supports GitHub Flavored Markdown (GFM), including:
- Headers (H1-H6)
- **Bold** and *italic* text
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Links and images
- Tables
- Blockquotes
- Horizontal rules
- And more!

## Technical Questions

### How does automatic file detection work?

When you run `npm run dev` or `npm run build`, a Node.js script (`generate-file-list.js`) scans the `public/docs/` folder and creates a `files.json` file listing all `.md` files. The React app then reads this file to populate the sidebar.

### Can I customize the file titles?

Currently, titles are auto-generated from file names. If you want custom titles, you can modify the `generate-file-list.js` script to read frontmatter or maintain a custom mapping.

### How do I deploy this to production?

1. Run `npm run build` to create an optimized build
2. Deploy the `dist/` folder to any static hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3
   - Any web server

### Can I add images to my documentation?

Yes! Place images in the `public/` folder and reference them in your markdown:

```markdown
![My Image](/images/my-image.png)
```

## Troubleshooting

### My new file doesn't appear in the sidebar

1. Make sure the file is in `public/docs/` with a `.md` extension
2. Restart the dev server: `Ctrl+C` then `npm run dev`
3. Check the browser console for errors

### The styling looks broken

Try clearing your browser cache or doing a hard refresh (`Ctrl+Shift+R` on most browsers).

### I get a "Could not load the documentation file" error

Check that:
1. The file exists in `public/docs/`
2. The file name matches exactly (case-sensitive on some systems)
3. The dev server is running

## Feature Requests

Have an idea for a new feature? Some potential enhancements:

- 🔍 Search functionality
- 🌙 Dark mode
- 📱 Better mobile responsiveness
- 📂 Subfolder support
- 🎨 Syntax highlighting themes
- 📄 Export to PDF
- 🔗 Table of contents generation

Feel free to contribute or customize the app to your needs!

---

**Still have questions?** Check the README.md or open an issue on GitHub!
