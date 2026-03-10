# PathForge AI – Backend 🚀

PathForge AI is an intelligent learning roadmap generator that helps users create structured study plans for achieving their career goals. It uses AI to generate personalized weekly roadmaps, track progress, maintain learning streaks.

This backend powers the entire platform including authentication, AI roadmap generation, task tracking, progress analytics, and SaaS-based roadmap limits.

---

## ✨ Features

### 🔐 Authentication System

* User Registration with Email & Password
* OTP Email Verification
* Secure Login
* Google OAuth Login

### 🤖 AI Roadmap Generation

* Generate personalized learning roadmaps using **Google Gemini**
* Structured weekly learning plans
* Daily tasks and mini-projects
* AI response stored for reference

### 📚 Roadmap Management

* Generate roadmap based on:

  * Goal
  * Skill Level
  * Study Hours per Day
  * Duration (Weeks)
* Retrieve roadmap by ID
* View all roadmaps created by the user

### ✅ Task Tracking

* Toggle task completion
* Track daily learning progress
* Automatic progress calculation

### 📊 Progress System

* Total tasks tracking
* Completed tasks tracking
* Progress percentage calculation

### 🔥 Learning Streak

* Tracks daily learning consistency
* Maintains current learning streak

### ⚡ Rate Limiting

Roadmap generation is protected using **express-rate-limit** to prevent abuse.

```
5 roadmap requests per minute
```

### 💳 SaaS Plan Limits

* Free Plan → 2 roadmaps per month
* Paid Plan → 10 roadmaps per month
* Monthly counter resets automatically

---

## 🏗️ Tech Stack

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose

**Authentication**

* JWT
* BcryptJS
* Google OAuth

**AI Integration**

* Google Gemini API

**Utilities**

* Express Rate Limit
* Brevo (for OTP emails)

---

## 📂 Project Structure

```
server
│
├── controllers
│   ├── authController.js
│   ├── roadmapController.js
│
├── models
│   ├── User.js
│   ├── Roadmap.js
│   ├── RoadmapWeek.js
│   ├── RoadmapTask.js
│   ├── RoadmapProgress.js
│
├── routes
│   ├── authRoutes.js
│   ├── roadmapRoutes.js
│
├── middleware
│   ├── authMiddleware.js
│   ├── roadmapLimiter.js
│
├── services
│   ├── aiService.js
│
└── server.js
```

---

## 📡 API Endpoints

### Authentication

```
POST /auth/register
POST /auth/verify-otp
POST /auth/login
POST /auth/google-login
POST /auth/resend-otp
```

### Roadmaps

```
POST /generate-roadmap
GET  /roadmap/:id
GET  /roadmaps
```

### Tasks

```
PATCH /tasks/:taskId/toggle
```

### Progress

```
GET /progress/roadmaps/:roadmapId
GET /progress/roadmaps/:roadmapId/weeks/:weekNumber
```

### Streak

```
GET /streak
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

```
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## 🚀 Installation & Setup

Clone the repository

```
git clone https://github.com/yourusername/pathforge-ai-backend.git
```

Move into the project directory

```
cd server
```

Install dependencies

```
npm install
```

Run the server

```
nodemon index.js
```

Server will start on:

```
http://localhost:5000
```

---

## 📈 Future Improvements

* AI Adaptive Roadmaps
* Smart Learning Analytics
* AI Study Assistant
* Payment Integration
* Community Roadmap Sharing

---

## 👨‍💻 Author

Built with passion by a MERN Stack Developer focused on building intelligent web applications and scalable backend systems.

---

⭐ If you like this project, consider giving it a star on GitHub!
