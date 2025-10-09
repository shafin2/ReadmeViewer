# Quick Start Guide 🚀

## Adding New Documentation Files

The app now **automatically detects** all `.md` files in the `public/docs/` folder!

### Steps:

1. **Add your markdown file** to `public/docs/`
   ```bash
   # Example:
   cp my-new-doc.md /public/docs/
   ```

2. **Restart the dev server** (if running)
   - Press `Ctrl+C` to stop the server
   - Run `npm run dev` again
   - OR just run `npm run generate-files` to update the list without restarting

3. **Done!** Your new file will appear in the sidebar automatically

### How It Works

- When you run `npm run dev` or `npm run build`, a script automatically scans the `public/docs/` folder
- It creates a `files.json` manifest with all `.md` files
- The React app reads this manifest and displays all files in the sidebar
- File names are automatically converted to nice titles:
  - `getting-started.md` → "Getting Started"
  - `api-reference.md` → "Api Reference"
  - `my-awesome-guide.md` → "My Awesome Guide"

### Example: Adding a New File

```bash
# Create a new markdown file
echo "# My New Guide\n\nThis is my new documentation." > public/docs/my-guide.md

# Regenerate the file list (optional if dev server is not running)
npm run generate-files

# If dev server is running, it will auto-refresh!
```

### Tips

- Files are listed in **alphabetical order**
- Use meaningful file names (they become the titles)
- Use hyphens `-` to separate words in file names
- No need to edit any code anymore! Just drop files in the docs folder

### Current Files

Check `public/docs/files.json` to see which files are currently registered.

```bash
cat public/docs/files.json
```

---

Happy documenting! 📝
