import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, 'public', 'docs');
const outputFile = path.join(docsDir, 'files.json');

// Read all files from docs directory
fs.readdir(docsDir, (err, files) => {
  if (err) {
    console.error('Error reading docs directory:', err);
    process.exit(1);
  }

  // Filter only .md files and exclude files.json
  const mdFiles = files
    .filter(file => file.endsWith('.md'))
    .sort(); // Sort alphabetically

  // Write to files.json
  fs.writeFile(outputFile, JSON.stringify(mdFiles, null, 2), (err) => {
    if (err) {
      console.error('Error writing files.json:', err);
      process.exit(1);
    }
    console.log('✅ Generated files.json with', mdFiles.length, 'markdown files');
    console.log('📄 Files:', mdFiles.join(', '));
  });
});
