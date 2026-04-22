import React, { useState, useEffect } from 'react';
import QRCodeModule from 'react-qr-code';
import { getLocalIp } from '../services/api';

// The Vite Fix: Safely extract the component whether Vite wrapped it in a 'default' object or not
const QRCode = QRCodeModule.default || QRCodeModule;

const QrCodeDisplay = () => {
    const [ipUrl, setIpUrl] = useState('');

    useEffect(() => {
        getLocalIp().then(ip => {
            // Point to the Vite dev server port
            setIpUrl(`http://${ip}:5173`);
        }).catch(err => console.error("Could not fetch IP", err));
    }, []);

    return (
        <div className="card">
            <h2>Connect Mobile</h2>
            <p>Scan to join the network</p>
            <div style={{ background: 'white', padding: '16px', borderRadius: '8px' }}>
                {ipUrl ? <QRCode value={ipUrl} size={180} /> : <p>Loading QR...</p>}
            </div>
            {ipUrl && <p className="ip-text">{ipUrl}</p>}
        </div>
    );
};

export default QrCodeDisplay;