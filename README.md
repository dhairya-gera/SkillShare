<div align="center">

# 🤝 SkillShare

### Stuck on something? Someone on campus is great at it.

**A peer-to-peer campus micro-help & skill exchange platform for university students.**
Ask for help. Offer help. Earn credits. Cash out.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Vercel-ready-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Status](https://img.shields.io/badge/status-college_project-8A2BE2?style=for-the-badge)

[🌐 Live Demo](https://skill-share-beta.vercel.app) · [🐛 Report Bug](https://github.com/dhairya-gera/SkillShare/issues) · [💡 Request Feature](https://github.com/dhairya-gera/SkillShare/issues)

</div>

---

## ✨ What is SkillShare?

Every campus has the same problem: someone is stuck on a DSA question at 11 PM, and someone else two hostels away would solve it in five minutes.

**SkillShare connects them.** Students post what they need or what they can teach, connect with each other, and move **credits** around as a tiny campus economy. Help someone, earn credits. Need help, spend credits. Collected enough? Cash out to UPI (simulated 😉).

> 🎓 Built as a frontend college project (FEE), with React fundamentals only: no heavy libraries, no backend, all demo-ready.

---



## 🚀 Features

| | Feature | Details |
| :-: | --- | --- |
| 🔐 | **Auth** | Sign up / log in with a college email (`@mail.edu.in`) |
| 📰 | **Feed** | Browse posts from other students |
| 🔎 | **Search & Filter** | Search by name or text, filter by category |
| ✍️ | **Posts** | Create, save, and delete your own posts |
| 🤝 | **Connect** | Connect with a student to take or offer help |
| 💰 | **Credits** | Earn and spend credits, with a full history |
| 💸 | **Cash-out** | Convert credits to UPI payout (demo only) |
| 👤 | **Profiles** | Overview, my posts, connections, saved posts |
| 🌗 | **Dark Mode** | Follows your device theme, saved for next visit |
| 📱 | **Responsive** | Works on phones, tablets, and laptops |
| 🔍 | **SEO** | Per-route title, description, canonical, robots tags |
| 💾 | **Persistence** | Everything is stored in `localStorage` |

---

## 🪙 How Credits Work

```text
 New user ──► 200 credits 🎁
 Offer help ──► +10 credits
 Take help  ──► −20 credits
 Cash out   ──► 1 credit = ₹0.50  (minimum 50 credits)
```

- Cash-out needs a valid UPI ID (for example `name@okaxis`)
- Every earn, spend, and cash-out lands in your **credit history**
- All numbers live in one place: `src/data/credits.js`
- ⚠️ The payout is **simulated**. No real money moves.

---

## 🧭 Pages & Routes

| Route | Page | Access |
| --- | --- | :-: |
| `/login` | Login and signup | 🌍 Public |
| `/how-it-works` | Steps, credit rules, FAQ | 🔒 Login  |
| `/` | Dashboard with all posts | 🔒 Login |
| `/posts/:postId` | Single post details | 🔒 Login |
| `/credits` | Balance, cash-out, history | 🔒 Login |
| `/profile` | Profile overview | 🔒 Login |
| `/profile/my-posts` | Posts you created | 🔒 Login |
| `/profile/connections` | Your connections | 🔒 Login |
| `/profile/saved` | Posts you saved | 🔒 Login |

---

## 🧠 React Concepts Used

- ⚛️ Components, JSX, and props
- 🪝 `useState` and `useEffect` (theme, modal keyboard handling, page SEO tags)
- 🎯 `useRef` (auto-focus inside the post modal)
- 📝 Forms, events, and form validation
- 🧭 React Router: protected pages, nested profile pages, dynamic post pages
- 💾 `localStorage` for persistence

---

## 🗂️ Project Structure

```text
SkillShare/
├── public/                 # favicons, share image, robots.txt, sitemap.xml, manifest
├── src/
│   ├── components/         # pages + reusable UI components
│   ├── data/               # starting posts, categories, credit rules
│   ├── App.jsx             # app state and routes
│   ├── App.css             # app styles (CSS variables for theming)
│   ├── index.css           # base styles
│   └── main.jsx            # React + router entry point
├── index.html
├── vercel.json             # SPA rewrites so deep links work on refresh
├── vite.config.js
└── package.json
```

---

## 🛠️ Getting Started

**Prerequisites:** Node.js and npm.

```bash
# 1. Clone
git clone https://github.com/dhairya-gera/SkillShare.git
cd SkillShare

# 2. Install
npm install

# 3. Run
npm run dev
```

Open the local URL shown in your terminal. 🎉

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

### 🔑 Try it out

1. Go to `/login` and **sign up** with any email ending in `@mail.edu.in` (example: `test@mail.edu.in`)
2. Use a password with at least 6 characters
3. **Log in** with the same details (accounts live in your browser's `localStorage`)

---

## 🌗 Dark Mode

The toggle sits in the navbar (and on the login page). Your choice is saved in `localStorage`; on the first visit the app follows your device theme. Colors are CSS variables in `App.css`, switched with `<html data-theme="dark">`.

---

## 🔍 SEO

- `index.html` ships the base title and icons
- `PageMeta.jsx` updates title, description, canonical link, and robots tag on every route (private pages are `noindex`)
- `/how-it-works` is public and includes FAQ structured data
- The deployed site is available at `https://skill-share-beta.vercel.app`

---

## ☁️ Deployment

The repo is Vercel-ready. `vercel.json` rewrites every route to `index.html`, so refreshing on `/credits` or `/posts/3` works.

1. Push to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Framework preset: **Vite** → Deploy

---

## ⚠️ Disclaimer

This is a **frontend-only college project**. There is no real backend, no real authentication, and no real payments. Data lives in your browser and can be cleared at any time. Please don't use real passwords or real UPI details.

---

## 🗺️ Roadmap

- [ ] Real backend and authentication
- [ ] Real-time chat between connected students
- [ ] Ratings and reviews after a help session
- [ ] Notifications
- [ ] Campus-wise communities

---

## 👨‍💻 Author

**Dhairya Gera**
GitHub: [@dhairya-gera](https://github.com/dhairya-gera)

---

<div align="center">

If SkillShare helped you, drop a ⭐ on the repo!

Made with ❤️, ☕ and a lot of `useState`.

</div>
