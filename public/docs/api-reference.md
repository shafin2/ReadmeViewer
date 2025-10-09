# API Reference

This is a sample API reference document.

## Components

### MarkdownViewer

The main component that renders markdown content.

**Props:**
- `content` (string): The markdown content to render
- `className` (string): Optional CSS class name

**Example:**
```jsx
<MarkdownViewer content={markdownText} />
```

### Sidebar

Displays the list of available documentation files.

**Props:**
- `files` (array): Array of file objects
- `onSelect` (function): Callback when a file is selected
- `activeFile` (string): Currently selected file

## Utilities

### fetchMarkdown(filename)

Fetches a markdown file from the docs folder.

**Parameters:**
- `filename` (string): Name of the markdown file

**Returns:** Promise<string>

**Example:**
```javascript
const content = await fetchMarkdown('getting-started.md');
```

## Styling

The app uses CSS modules for styling. Main classes:

- `.container`: Main app container
- `.sidebar`: Left sidebar for file list
- `.content`: Right panel for markdown display
