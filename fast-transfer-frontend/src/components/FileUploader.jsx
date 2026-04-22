import React, { useState, useRef } from 'react';
import { uploadFileRaw } from '../services/api';

const FileUploader = ({ onUploadSuccess }) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFile = async (file) => {
        if (!file) return;
        try {
            await uploadFileRaw(file, setUploadProgress);
            setUploadProgress(0);
            if (onUploadSuccess) onUploadSuccess();
            // Clear the input
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            alert("Upload failed!");
            setUploadProgress(0);
        }
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    return (
        <div className="card">
            <h2>Send File</h2>
            <div 
                className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current.click()}
            >
                <p>Drag & Drop a file here, or click to select</p>
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={(e) => handleFile(e.target.files[0])} 
                    style={{ display: 'none' }} 
                />
            </div>
            {uploadProgress > 0 && (
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                    <span>{uploadProgress}%</span>
                </div>
            )}
        </div>
    );
};

export default FileUploader;