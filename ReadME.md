# ⚡ NetDrop Workspace

**NetDrop Workspace** is a high-performance, local-area-network (LAN) data transfer system. It allows for seamless, high-speed file sharing and real-time clipboard synchronization between devices (e.g., Laptop to Mobile) without requiring an internet connection.

---

## 🚀 Key Features

* **Zero-Memory File Streaming:** Uses Java NIO streams to write data directly to disk, allowing for multi-gigabyte transfers without RAM bottlenecks.
* **Real-Time Clipboard:** Bi-directional text synchronization powered by WebSockets.
* **Auto-Discovery:** Generates a dynamic QR code containing the host's local IP for instant mobile pairing.
* **Offline-First:** Works entirely on Local Wi-Fi or Mobile Hotspots—no data usage or external server required.
* **Industry-Level UI:** Professional split-pane dashboard for managing files and text separately.

---

## 🛠️ Tech Stack

### Backend
* **Framework:** Spring Boot 3.x
* **Communication:** Spring WebSocket, Java NIO
* **Build Tool:** Maven

### Frontend
* **Library:** React 18
* **Build Tool:** Vite
* **Styling:** Modern CSS3 (SaaS-style layout)

---

## 📦 Project Structure

```text
NetDrop/
├── fast-transfer-backend/  # Spring Boot Server (Port 8080)
└── fast-transfer-frontend/ # React Client (Port 5173)
🔧 Installation & Setup
1. Prerequisites
Java 17 or higher

Node.js (v18+)

Maven

2. Start the Backend
Bash
cd fast-transfer-backend
mvn spring-boot:run
The server will start at http://localhost:8080

3. Start the Frontend
Bash
cd fast-transfer-frontend
npm install
npm run dev
The UI will be available at http://localhost:5173

📱 How to Use
Ensure your Laptop and Mobile are on the same Wi-Fi network.

Open the dashboard on your laptop.

Scan the QR Code with your phone's camera.

Start transferring files or syncing text instantly!

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Savdeep Final Year BTech Student (Computer Science)


### Final Push to GitHub:
Once you save the file, run these commands in your terminal to update your repository:

1. `git add README.md`
2. `git commit -m "docs: add professional README"`
3. `git push origin main`

Now, when anyone visits your GitHub page, they will see a beautiful, organized landing page for
