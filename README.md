# SkillShare

SkillShare is a simple React website for college students. Students can ask
for help, offer help, and connect with other students.

## What the app can do

- Log in or create an account with a college email
- Show posts from other students
- Search posts by name or text
- Filter posts by category
- Create, save, and delete posts
- Connect with another student
- Earn or spend credits
- Open profiles and post details
- Save data in the browser using `localStorage`

## Main React ideas used

- Components
- JSX
- Props
- `useState`
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
- `/how-it-works` - simple instructions
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
├── components/             # React components
└── data/                   # starting posts and categories
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

## Login rules

- The email must end with `@mail.edu.in`.
- The password must have at least 6 characters.
- New users start with 200 credits.
- Offering help gives 10 credits.
- Taking offered help costs 20 credits.

This is a frontend college project. It does not have a real backend or real
authentication system.
