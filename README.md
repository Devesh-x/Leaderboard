# 🏆 Leaderboard System

A modern full-stack leaderboard app with React (Vite, Tailwind CSS) frontend and Node.js/Express/MongoDB backend.

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd Leaderboard-system
cd Backend && npm install
cd ../Frontend && npm install
```

### 2. Setup Backend
- Create `Backend/.env`:
  ```
  PORT=3000
  URL=http://localhost:5173
  MONGO_URI=your_mongodb_connection_string
  ```
- Start backend:
  ```bash
  npm start
  # or: node server.js
  ```

### 3. Setup Frontend
```bash
cd Frontend
npm run dev
```

## 🌐 Deployment
- Deploy backend (Render, etc.) and frontend (Vercel, etc.).
- Set `VITE_BACKEND_URL` in `Frontend/.env` to your backend URL.
- CORS is open by default for easy deployment.

## ✨ Features
- Add users, claim random points, real-time leaderboard
- Modern UI, toast notifications, persistent MongoDB storage

## 📋 Example API
- `POST /user/add` — Add user
- `GET /user/getall` — All users
- `GET /user/sorted` — Leaderboard
- `PUT /points/add/:id` — Add points

---

