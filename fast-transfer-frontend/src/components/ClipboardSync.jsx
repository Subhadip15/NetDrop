import React, { useState, useEffect, useRef } from 'react';
import { getWebSocketUrl } from '../services/api';

const ClipboardSync = () => {
    const [text, setText] = useState('');
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket(getWebSocketUrl());
        
        ws.current.onmessage = (event) => {
            setText(event.data);
        };

        return () => {
            if (ws.current) ws.current.close();
        };
    }, []);

    const handleChange = (e) => {
        const newText = e.target.value;
        setText(newText);
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(newText);
        }
    };

 return (
        <div className="card clipboard-card">
            <textarea 
                className="full-height-textarea"
                value={text} 
                onChange={handleChange} 
                placeholder="Type or paste text here. It will sync instantly across all devices on your network..."
            />
        </div>
    );
};

export default ClipboardSync;