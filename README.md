# 🎨 Miro Clone – Real-time Collaborative Whiteboard

An enterprise-grade visual collaboration tool built to handle complex real-time interactions. This project replicates the core functionality of Miro, allowing teams to brainstorm in sync using a highly interactive canvas.

### 🌟 Advanced Features
* **Multi-User Sync:** Watch others work in real-time with presence indicators (cursors and selections) using **Liveblocks**.
* **Infinite Canvas Logic:** Sophisticated coordinate system to handle object placement, resizing, and transformations.
* **Rich Toolbar:** Includes professional tools for sticky notes, vector shapes (Rectangles/Ellipses), and a smooth pencil tool for sketching.
* **Object Persistence:** All changes are instantly saved to **Convex**, ensuring no data loss between sessions.
* **Organization-Based Workspaces:** Create boards within different organizations, managed via **Clerk** roles.
* **Export Options:** Ability to save your board as an image for sharing.

### 🛠️ Tech Stack & Tools
* **Frontend:** Next.js 14 (App Router), Tailwind CSS, Shadcn UI.
* **Real-time Engine:** Liveblocks (Websockets).
* **Backend as a Service:** Convex (Reactive Database).
* **Auth:** Clerk (Social Login & Org Management).
* **State Management:** Custom hooks for canvas interactions.

### ⚙️ Installation & Setup
Since I'm using **Zorin OS**, these commands are optimized for a Linux environment:

1. **Clone the repo:** `git clone https://github.com/USER/miro-clone.git`
2. **Install dependencies:** `npm install`
3. **Setup Environment Variables:** Create a `.env.local` with your Clerk, Convex, and Liveblocks keys.
4. **Run Convex:** `npx convex dev`
5. **Start App:** `npm run dev`
