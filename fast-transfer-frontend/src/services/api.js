// Dynamically gets the backend URL based on where the app is being hosted
const getBaseUrl = () => `http://${window.location.hostname}:8080/api`;
const getWsUrl = () => `ws://${window.location.hostname}:8080/ws/clipboard`;

export const getLocalIp = async () => {
    const res = await fetch(`${getBaseUrl()}/ip`);
    return res.text();
};

export const getFiles = async () => {
    const res = await fetch(`${getBaseUrl()}/files`);
    return res.json();
};

export const uploadFileRaw = async (file, onProgress) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${getBaseUrl()}/upload`, true);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.setRequestHeader('File-Name', file.name);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable && onProgress) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                onProgress(percentComplete);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) resolve(xhr.responseText);
            else reject('Upload failed');
        };

        xhr.onerror = () => reject('Network error');
        xhr.send(file);
    });
};
export const clearServerSession = async () => {
    const res = await fetch(`${getBaseUrl()}/clear`, { method: 'DELETE' });
    return res.text();
};
export const getDownloadUrl = (fileName) => `${getBaseUrl()}/download/${fileName}`;
export const getWebSocketUrl = () => getWsUrl();