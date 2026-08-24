# SkillShare

SkillShare is a campus-focused micro-help platform built for university students to exchange skills, seek academic support, and collaborate on projects. The app allows students to connect with peers, post help requests, offer expertise, and manage a simple credit-based economy within a student-only environment.

## Overview

This project is a front-end React application designed for a campus community where students can:

- sign in with a verified college email
- browse help requests and offers
- filter posts by category
- create new posts for help or skill-sharing
- earn or spend credits based on actions
- persist their session and state in the browser

The app currently runs entirely on the frontend and stores user/session data in browser localStorage, making it easy to demo and test without a backend.

## Features

- Campus-only authentication
  - Users must use an email ending with @mail.edu.in
  - Login and sign-up flow includes validation for email and password

- Credit system
  - New users start with 200 credits
  - Offering help gives +10 credits
  - Taking help costs -20 credits
  - Credits are saved per user using localStorage

- Feed and filtering
  - Posts are displayed in a dashboard feed
  - Users can filter posts by:
    - Programming / DSA
    - Academics & Notes
    - Music & Arts
    - Project Partners

- Post creation modal
  - Create a request or offer
  - Add custom text, category, type, and urgency status

- Connection handling
  - Users can mark a post as connected/requested
  - Each user’s connected post IDs are stored locally

- Persistent session behavior
  - Current view, email, name, credits, and connections persist across browser refreshes

## Tech Stack

- React
- Vite
- JavaScript (ES6+)
- CSS3
- Browser localStorage for persistence

## Project Structure

```bash
SkillShare/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── skill-share-logo.png
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── FilterBar.jsx
│   │   ├── PostCard.jsx
│   │   └── CreatePost.jsx
│   └── data/
│       └── initialPosts.js
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v18 or above recommended)
- npm

### Installation

```bash
git clone https://github.com/dhairya-gera/SkillShare.git
cd SkillShare
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local URL shown in the terminal (typically http://localhost:5173).

### Build for production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## How It Works

1. The user lands on the login screen.
2. The app validates the college email before allowing access.
3. A user can create an account or log in.
4. Once authenticated, the dashboard loads the feed.
5. Users can:
   - browse posts
   - filter by category
   - request help or offer help
   - earn or spend credits
6. Data is stored in browser localStorage so it remains available across refreshes.

## Current Status

This version is a functional front-end prototype for a campus peer-help platform. It demonstrates the core UX, interaction flow, and credit-based social learning concept.

## Future Improvements

- backend and database integration
- real authentication and user accounts
- admin moderation
- chat or messaging
- profile pages
- notifications
- richer analytics for student engagement

## License

This project is for educational/demo purposes and is currently not licensed for commercial use.
