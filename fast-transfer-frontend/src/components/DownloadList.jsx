import React from 'react';
import { getDownloadUrl } from '../services/api';

const DownloadList = ({ files, onRefresh }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Available Files</h2>
                <button onClick={onRefresh} className="refresh-btn">Refresh</button>
            </div>
            
            {files.length === 0 ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>No files shared yet.</p>
            ) : (
                <ul className="file-list">
                    {files.map(file => (
                        <li key={file}>
                            <span className="file-name">{file}</span>
                            <a href={getDownloadUrl(file)} download className="download-btn">Download</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DownloadList;