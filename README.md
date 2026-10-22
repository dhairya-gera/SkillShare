# SkillShare

SkillShare is a simple React website for college students. Students can ask
for help, offer help, and connect with other students.

## What the app can do

- Log in or create an account with a college email
- Show posts from other students
- Search posts by name or text
- Filter posts by category
- Create, save, and delete posts
- Cash out credits from the Credits page (demo payout)
- Switch between light and dark mode
- Work on phones, tablets, and laptops
- Connect with another student
- Earn or spend credits
- Open profiles and post details
- Save data in the browser using `localStorage`

## Main React ideas used

- Components
- JSX
- Props
- `useState` and `useEffect` (theme, modal keyboard handling, page SEO tags)
- `useRef` (auto-focus in the post modal)
- Forms and form validation
- Button and input events
- `localStorage`
- React Router
- Protected pages
- Nested profile pages
- Dynamic post pages

## Pages and routes

- `/login` - login and signup page
- `/` - dashboard with all posts
- `/posts/:postId` - details of one post
- `/how-it-works` - public guide: steps, credit rules, FAQ (no login needed)
- `/credits` - balance, cash out to UPI, and credit history
- `/profile` - profile overview
- `/profile/my-posts` - posts created by the user
- `/profile/connections` - connected posts
- `/profile/saved` - saved posts

## Project structure

```text
src/
├── App.jsx                 # app state and routes
├── main.jsx                # starts React and the router
├── App.css                 # app styles
├── index.css               # basic styles
├── components/             # React components (pages + UI)
└── data/                   # starting posts, categories, credit rules

public/                     # favicons, share image, robots.txt, sitemap.xml, manifest
```

## Run the project

You need Node.js and npm installed.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build the project

```bash
npm run build
```

## Dark mode

The toggle is in the navbar (and on the login page). The choice is saved in
`localStorage`; the first visit follows the device theme. Colors are CSS
variables in `App.css`, switched with `<html data-theme="dark">`.

## Credits and cash out

All credit numbers live in `src/data/credits.js`.

- 1 credit = ₹0.50, minimum cash-out = 50 credits
- Cash out needs a valid UPI ID (for example `name@okaxis`)
- Every earn, spend, and cash-out is saved in the credit history
- The payout is simulated. No real money is transferred.

## SEO

- `index.html` has the title, description, Open Graph and Twitter tags
- `PageMeta.jsx` updates the title, description, canonical link and
  robots tag on every route (private pages are `noindex`)
- `/how-it-works` is public and has FAQ structured data
- Before deploying, replace `https://your-domain.com` in `.env`,
  `public/robots.txt`, and `public/sitemap.xml` with your real URL

## Login rules

- The email must end with `@mail.edu.in`.
- The password must have at least 6 characters.
- Sign up first, then log in (accounts are saved in `localStorage`).
- New users start with 200 credits.
- Offering help gives 10 credits.
- Taking offered help costs 20 credits.

This is a frontend college project. It does not have a real backend or real
authentication system.
