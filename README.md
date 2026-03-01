# QuickHire — Job Board Application

A full-stack job board application where users can browse jobs, apply for positions, and admins can post and manage listings.

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, Tailwind CSS v4, Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT (JSON Web Tokens) + bcryptjs |

---

## 📁 Project Structure

```
quickhire/
├── backend/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   ├── app.js
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── models/
│       │   ├── Job.js
│       │   ├── Application.js
│       │   └── User.js
│       ├── controllers/
│       │   ├── jobController.js
│       │   ├── applicationController.js
│       │   └── authController.js
│       ├── middleware/
│       │   └── auth.js
│       └── routes/
│           ├── jobs.js
│           ├── applications.js
│           └── auth.js
│
└── frontend/
    ├── package.json
    ├── next.config.js
    ├── context/
    │   └── AuthContext.jsx
    ├── lib/
    │   └── api.js
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   └── JobCard.jsx
    └── app/
        ├── layout.jsx
        ├── globals.css
        ├── page.jsx
        ├── login/
        │   └── page.jsx
        ├── register/
        │   └── page.jsx
        ├── jobs/
        │   ├── page.jsx
        │   └── [id]/
        │       └── page.jsx
        └── admin/
            └── page.jsx
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

---

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/quickhire.git
cd quickhire
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickhire
JWT_SECRET=quickhire_super_secret_key_2024
```

> For MongoDB Atlas, replace MONGODB_URI with your Atlas connection string:
> `mongodb+srv://username:password@cluster.mongodb.net/quickhire`

Start the backend:
```bash
npm run dev
```

You should see:
```
✅ MongoDB connected: localhost
✅ Server running at http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file inside `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

Open **http://localhost:3000**

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Jobs
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/jobs` | List all jobs | No |
| GET | `/api/jobs/featured` | Get featured jobs | No |
| GET | `/api/jobs/:id` | Get single job | No |
| POST | `/api/jobs` | Create job | Admin only |
| DELETE | `/api/jobs/:id` | Delete job | Admin only |

### Applications
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/applications` | Submit application | No |
| GET | `/api/applications` | List all applications | Admin only |

---

## 📄 Data Models

### User
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "role": "user | admin"
}
```

### Job
```json
{
  "title": "Frontend Developer",
  "company": "Google",
  "location": "Dhaka, Bangladesh",
  "category": "Technology",
  "jobType": "Full-Time",
  "description": "Job description here...",
  "requirements": "Requirements here...",
  "salary": "$50k–$70k",
  "isFeatured": true
}
```

### Application
```json
{
  "job": "<job_id>",
  "name": "John Doe",
  "email": "john@example.com",
  "resumeLink": "https://drive.google.com/...",
  "coverNote": "I am a great fit because..."
}
```

---

## ✨ Features

- **Home Page** — Hero section, company logos, category explorer, CTA banner, featured jobs, latest jobs
- **Job Listings** — Search by keyword, filter by category, location, job type
- **Job Detail** — Full description + inline apply form
- **Authentication** — Register/Login with JWT, role-based access (user/admin)
- **Admin Panel** — Post jobs, delete jobs, view all applications (admin only)
- **Responsive** — Fully mobile-friendly design matching Figma

---

## 🌐 Deployment

### Backend → Render
1. Go to [render.com](https://render.com) → New Web Service
2. Connect GitHub repo
3. Set Root Directory: `backend`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `PORT`

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Connect GitHub repo
3. Set Root Directory: `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api`

---

## 👤 Test Accounts

Register two accounts to test:

| Role | How to register |
|------|----------------|
| Job Seeker | Register → select "Job Seeker" |
| Admin | Register → select "Employer / Admin" |

---

## 🎨 Design

UI built following the QuickHire Figma design provided by QSL.
- Font: [Epilogue](https://fonts.google.com/specimen/Epilogue) (Google Fonts)
- Primary color: `#4640DE`
- Fully responsive on mobile, tablet, and desktop
