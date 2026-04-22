import React, { useState, useEffect } from 'react';
import QrCodeDisplay from './components/QrCodeDisplay';
import FileUploader from './components/FileUploader';
import DownloadList from './components/DownloadList';
import ClipboardSync from './components/ClipboardSync';
import { getFiles, clearServerSession } from './services/api';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);

  const refreshFiles = () => {
    getFiles()
      .then(setFiles)
      .catch(err => console.error("Failed to fetch files", err));
  };

  useEffect(() => {
    refreshFiles();
  }, []);

  // --- NEW: The Session Wipe Function ---
  const handleEndSession = async () => {
    const confirmWipe = window.confirm("Are you sure? This will permanently delete all shared files from the server and wipe the clipboard.");
    
    if (confirmWipe) {
      try {
        await clearServerSession(); // Deletes files from Spring Boot hard drive
        setFiles([]);               // Sets React file state to null/empty
        window.location.reload();   // Forces a hard reset of the UI (wipes clipboard state)
      } catch (err) {
        alert("Failed to clear session.");
      }
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">
          <div className="logo-icon">⚡</div>
          <h1>NetDrop Workspace</h1>
        </div>
        
        {/* --- NEW: The End Session Button --- */}
        <div className="nav-status">
          <button className="end-session-btn" onClick={handleEndSession}>
            <span className="trash-icon">🗑️</span> End Session
          </button>
          <span className="pulse-dot"></span>
          <span>System Online</span>
        </div>
      </nav>

      <main className="workspace">
        <section className="workspace-left">
          <div className="panel-header">
            <h2>File Transfer Hub</h2>
            <p>Drag, drop, and manage high-speed local transfers.</p>
          </div>
          <div className="network-widget">
            <QrCodeDisplay />
          </div>
          <div className="file-widgets">
            <FileUploader onUploadSuccess={refreshFiles} />
            <DownloadList files={files} onRefresh={refreshFiles} />
          </div>
        </section>

        <section className="workspace-right">
          <div className="panel-header">
            <h2>Real-Time Clipboard</h2>
            <p>Synchronized text across all connected devices.</p>
          </div>
          <div className="clipboard-wrapper">
            <ClipboardSync />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;