import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState('')
  const [markdownContent, setMarkdownContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [docFiles, setDocFiles] = useState([])

  // Fetch list of markdown files from docs folder
  useEffect(() => {
    const fetchFileList = async () => {
      try {
        // Fetch the files.json manifest
        const response = await fetch('/docs/files.json')
        const files = await response.json()
        
        // Convert filenames to objects with titles
        const fileObjects = files.map(filename => ({
          name: filename,
          title: filename
            .replace('.md', '')
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        }))
        
        setDocFiles(fileObjects)
        
        // Set the first file as selected by default
        if (fileObjects.length > 0) {
          setSelectedFile(fileObjects[0].name)
        }
      } catch (error) {
        console.error('Error loading file list:', error)
        // Fallback to default files if files.json doesn't exist
        const defaultFiles = [
          { name: 'getting-started.md', title: 'Getting Started' },
          { name: 'installation.md', title: 'Installation' },
          { name: 'api-reference.md', title: 'Api Reference' },
        ]
        setDocFiles(defaultFiles)
        setSelectedFile(defaultFiles[0].name)
      }
    }

    fetchFileList()
  }, [])

  // Fetch markdown content when selected file changes
  useEffect(() => {
    if (!selectedFile) return

    const fetchMarkdown = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/docs/${selectedFile}`)
        const text = await response.text()
        setMarkdownContent(text)
      } catch (error) {
        setMarkdownContent('# Error\n\nCould not load the documentation file.')
        console.error('Error loading markdown:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMarkdown()
  }, [selectedFile])

  return (
    <div className="app-container">
      {/* Left Sidebar - File List */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>📚 Documentation</h2>
        </div>
        <nav className="file-list">
          {docFiles.map((file) => (
            <button
              key={file.name}
              className={`file-item ${selectedFile === file.name ? 'active' : ''}`}
              onClick={() => setSelectedFile(file.name)}
            >
              <span className="file-icon">📄</span>
              <span className="file-title">{file.title}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p>Add your .md files to <code>/public/docs/</code></p>
        </div>
      </aside>

      {/* Right Panel - Markdown Content */}
      <main className="content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdownContent}
            </ReactMarkdown>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
