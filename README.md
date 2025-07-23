🧭 SafariConnect
SafariConnect is a full-stack web application that connects travelers across Kenya through intelligent matchmaking, shared trip planning, and real-time chat. It empowers users to find like-minded companions, plan group adventures, and explore Kenya's destinations more affordably and socially.

🚀 Features
🔐 User & Admin Authentication

Secure login/signup using JWT

Role-based routing (admin vs. user)

💕 AI-Powered Matchmaking

Match users based on travel preferences, gender, interests, dates & destinations

💬 Real-time Chat

Socket.io-powered messaging between matched travelers

🌍 Trip Planning

View and create trip plans with destination, dates, and budget

📊 Admin Dashboard

View user stats, manage users/trips/matches, export data

🏕️ Tour Package Pages

20+ curated Kenyan destinations (e.g., Diani, Maasai Mara, Nairobi Museum)

📦 Data Export

Export users/matches/trips as JSON or CSV (admin only)

🛠️ Tech Stack
Frontend	Backend	Database	Realtime	Tools & Libraries
React.js (Vite)	Node.js + Express.js	MongoDB	Socket.io	JWT, Axios, TailwindCSS, Toastify
React Router DOM	RESTful API	Mongoose		dotenv, bcryptjs, json2csv

📁 Folder Structure
bash
Copy
Edit
.
├── client/                  # React Frontend
│   ├── pages/               # Login, Explore, Admin, Destinations
│   ├── components/          # Navbar, Cards, Protected Routes
│   └── utils/api.js         # Axios API helpers
├── server/                  # Node.js Backend
│   ├── models/              # User, Match, Trip, Chat
│   ├── controllers/         # Auth, Admin, Chat, Match
│   ├── routes/              # Routes for API endpoints
│   └── middleware/          # JWT Auth, Role Check
⚙️ Setup Instructions
🧩 Prerequisites
Node.js & npm

MongoDB (local or Atlas)

1️⃣ Clone and Install
bash
Copy
Edit
git clone https://github.com/yourusername/safariconnect.git
cd safariconnect
npm install
cd client
npm install
2️⃣ Configure .env
Create .env in server/:

env
Copy
Edit
PORT=5000
MONGO_URI_LOCAL=mongodb://localhost:27017/safariConnect
JWT_SECRET=your_jwt_secret
3️⃣ Run the App
bash
Copy
Edit
# In /server
npm start

# In /client
npm run dev
🔐 Admin Login (Test)
plaintext
Copy
Edit
Email: admin@example.com
Password: password123
Use MongoDB to set role: "admin" if needed.

📷 Screenshots
Admin Dashboard	Matchmaking

🤝 Contributors
[Your Name] – Developer

Group Members: Sandra, Chris, Martha, Mark, Zaynoor

📄 License
MIT © 2025 SafariConnect

