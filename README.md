# Roadmap AI Platform

A modern learning and career roadmap platform with AI-powered study plans, progress tracking, career discovery, and SaaS usage controls.

This repository contains a full-stack application with:

- React frontend using Vite, Tailwind, Redux
- Express backend with MongoDB, JWT auth, AI integration, and payments
- AI roadmap generation and career discovery workflows
- task tracking, progress analytics, streak monitoring, and usage limits
- Razorpay payment flows and socket-enabled agent history

---

## 🚀 Core Features

### AI Roadmap Generation

- Create personalized weekly learning roadmaps based on user goals
- Support for skill level, daily study time, duration, learning styles, and resource preferences
- Generates weekly topics, daily tasks, and project milestones
- Stores raw AI response for audit and conversation history

### Career Discovery

- AI-powered discovery flow for career and interest profiling
- Collects interests, motivations, learning style, and experience
- Saves AI-suggested career options and returns the latest report

### User Dashboard

- View active roadmaps, saved roadmaps, and progress metrics
- Access roadmap detail pages with week-by-week tasks
- Toggle task completion and project completion
- Monitor streaks, achievements, and learning activity

### Analytics & Progress

- Track completed vs total tasks and overall progress percentage
- Weekly progress metrics for each roadmap
- Dashboard statistics for completed tasks, active roadmaps, and streaks
- Achievement generation based on learning activity

### Authentication & Account Management

- Email/password registration and login
- OTP verification with resend support
- Google OAuth login
- Protected dashboard routes for authenticated users

### SaaS Usage Controls

- Enforced roadmap/discovery generation limits by plan
- Usage status endpoint for client-side plan info
- Free/paid plan checks in backend access control logic

### Payments & Agent Support

- Razorpay order creation and verification endpoints
- Socket.io integration for live agent and conversation support
- Agent history retrieval by roadmap

---

## 🧩 Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- React Flow
- Recharts
- Socket.io Client

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication
- Google OAuth
- Razorpay payment gateway
- Express rate limiting

### AI / Integrations

- Google Gemini / Generative AI SDK
- OpenRouter / OpenAI SDK
- OTP email support

---

## 📁 Repository Structure

```
.
├── client
│   ├── public
│   ├── src
│   │   ├── apis
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── services
│   │   ├── UserDashboard
│   │   └── utils
│   ├── package.json
│   └── vite.config.js
├── server
│   ├── config
│   ├── controllers
│   ├── db
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── sockets
│   └── utils
└── README.md
```

---

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/verify-otp`
- `POST /api/auth/resend-otp`
- `POST /api/auth/login`
- `POST /api/auth/google-login`
- `GET /api/auth/me`
- `GET /api/auth/logout`

### Roadmaps & Progress

- `POST /api/ai/generate-roadmap`
- `GET /api/ai/roadmap/:id`
- `GET /api/ai/user/roadmaps`
- `PATCH /api/ai/tasks/:taskId/toggle`
- `PATCH /api/ai/weeks/:id/toggle-project`
- `GET /api/ai/progress/roadmaps/:roadmapId`
- `GET /api/ai/progress/roadmaps/:roadmapId/weeks/:weekNumber`
- `GET /api/ai/streak`
- `GET /api/ai/dashboard/state`
- `GET /api/ai/user/progress`
- `GET /api/ai/usage-status`
- `GET /api/ai/agent/history/:roadmapId`

### Discovery

- `POST /api/ai/discovery/analyze`
- `GET /api/ai/discovery/result`

### Payments

- `POST /api/payment/create-order`
- `POST /api/payment/verify`

---

## ⚙️ Environment Variables

Create a `.env` file in the `server/` folder or project root with the values below.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ACCESS_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

---

## 🛠️ Run Locally

### Backend

```bash
cd server
npm install
node index.js
```

Or with nodemon:

```bash
cd server
npx nodemon index.js
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 💡 Notes

- The app uses token-based authentication and stores the auth token in `localStorage`.
- Roadmap generation is protected by plan-level access control and express rate limiting.
- Task completion updates progress and streak data.
- Discovery and roadmap AI outputs are stored for later retrieval.
- Payment routes support Razorpay order creation and verification.

---

## 🙌 Contribution

1. Fork the repository
2. Create a feature branch
3. Install dependencies in both `client` and `server`
4. Run the app locally
5. Submit a pull request with your changes

---

## 📜 License

No license specified. Add one if you want to open source this project.
