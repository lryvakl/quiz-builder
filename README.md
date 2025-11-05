# Quiz Builder


### Project Structure



---

### Tech Stack

### **Backend**
- Node.js + Express.js
- TypeScript
- Prisma ORM
- PostgreSQL


### **Frontend**
- React + Next.js 
- TypeScript
- Tailwind CSS


---

### Setup Instructions

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/<your-username>/quiz-builder.git
cd quiz-builder

2️⃣ Backend Setup

cd backend
npm install

Create a .env file:

DATABASE_URL="file:./dev.db"
PORT=4000

Initialize Prisma and seed the database (optional):

npx prisma migrate dev

Start the backend:

npm run dev

Backend runs on → http://localhost:4000￼

⸻

3️⃣ Frontend Setup

cd ../frontend
npm install
npm run dev

Frontend runs on → http://localhost:3000￼

⸻

🌐 Environment Variables

Variable	Description
DATABASE_URL	Connection string for Prisma (SQLite/PostgreSQL)
PORT	Server port
NEXT_PUBLIC_API_BASE_URL	Base URL for the backend API

Example .env.local in /frontend:

NEXT_PUBLIC_API_BASE_URL=http://localhost:4000


⸻

