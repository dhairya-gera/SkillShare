import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { initialPosts } from "./data/initialPosts";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./components/ProfilePage";
import PostDetailPage from "./components/PostDetailPage";
import HowItWorksPage from "./components/HowItWorksPage";
import NotFoundPage from "./components/NotFoundPage";
import {
  ProfileOverview,
  MyPosts,
  Connections,
  SavedPosts,
} from "./components/ProfileSections";

const STARTING_CREDITS = 200;
const HELP_COST = 20;
const HELP_REWARD = 10;

function validatePost(values) {
  const errors = {};
  const text = values.text.trim();

  if (!text) errors.text = "Description is required.";
  else if (text.length < 10) {
    errors.text = "Description must be at least 10 characters.";
  }
  return errors;
}

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error(`Unable to read "${key}" from localStorage.`, error);
    return fallback;
  }
}

export default function App() {
  const savedEmail = localStorage.getItem("email") || "";
  const savedName = localStorage.getItem("name") || "";

  const [user, setUser] = useState(
    savedEmail ? { name: savedName, email: savedEmail } : null,
  );
  const [posts, setPosts] = useState(() => readStorage("posts", initialPosts));
  const [credits, setCredits] = useState(
    savedEmail
      ? Number(localStorage.getItem(`${savedEmail}_credits`)) ||
          STARTING_CREDITS
      : STARTING_CREDITS,
  );
  const [connections, setConnections] = useState(
    savedEmail ? readStorage(`${savedEmail}_connections`, []) : [],
  );
  const [savedPosts, setSavedPosts] = useState(
    savedEmail ? readStorage(`${savedEmail}_saved`, []) : [],
  );

  function handleLogin(name, email) {
    const nextCredits =
      Number(localStorage.getItem(`${email}_credits`)) || STARTING_CREDITS;
    const nextConnections = readStorage(`${email}_connections`, []);
    const nextSaved = readStorage(`${email}_saved`, []);
    setUser({ name, email });
    setCredits(nextCredits);
    setConnections(nextConnections);
    setSavedPosts(nextSaved);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("view", "dashboard");
  }

  function handleLogout() {
    setUser(null);
    setCredits(STARTING_CREDITS);
    setConnections([]);
    setSavedPosts([]);
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.setItem("view", "login");
  }

  function handleConnect(post) {
    if (connections.includes(post.id)) return;
    const takingHelp = post.type === "Offering Help";
    if (takingHelp && credits < HELP_COST) {
      alert("Not enough credits to take this help.");
      return;
    }
    const nextCredits = credits + (takingHelp ? -HELP_COST : HELP_REWARD);
    const nextConnections = [...connections, post.id];
    setCredits(nextCredits);
    setConnections(nextConnections);
    saveUserData(user.email, "credits", nextCredits);
    saveUserData(user.email, "connections", nextConnections);
    alert(
      takingHelp
        ? `Request sent to ${post.name}.`
        : `You earned +${HELP_REWARD} credits.`,
    );
  }

  function handleSave(postId) {
    const nextSaved = savedPosts.includes(postId)
      ? savedPosts.filter((id) => id !== postId)
      : [...savedPosts, postId];
    setSavedPosts(nextSaved);
    saveUserData(user.email, "saved", nextSaved);
  }

  function handleCreatePost(postData) {
    const newPost = {
      id: Date.now(),
      name: user.name,
      branch: "BTech CSE",
      ownerEmail: user.email,
      ...postData,
    };
    const nextPosts = [newPost, ...posts];
    setPosts(nextPosts);
    localStorage.setItem("posts", JSON.stringify(nextPosts));
  }

  function handleDeletePost(postId) {
    const nextPosts = posts.filter((post) => post.id !== postId);
    setPosts(nextPosts);
    localStorage.setItem("posts", JSON.stringify(nextPosts));
  }

  const sharedProps = {
    user,
    posts,
    credits,
    connections,
    savedPosts,
    onConnect: handleConnect,
    onSave: handleSave,
    onDelete: handleDeletePost,
    onCreatePost: handleCreatePost,
    onLogout: handleLogout,
    validatePost,
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginPage
            onLogin={handleLogin}
          />
        }
      />
      <Route element={<ProtectedRoute isLoggedIn={Boolean(user)} />}>
        <Route element={<Layout {...sharedProps} />}>
          <Route index element={<DashboardPage {...sharedProps} />} />
          <Route
            path="posts/:postId"
            element={<PostDetailPage {...sharedProps} />}
          />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="profile" element={<ProfilePage {...sharedProps} />}>
            <Route index element={<ProfileOverview {...sharedProps} />} />
            <Route path="my-posts" element={<MyPosts {...sharedProps} />} />
            <Route
              path="connections"
              element={<Connections {...sharedProps} />}
            />
            <Route path="saved" element={<SavedPosts {...sharedProps} />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function saveUserData(email, key, value) {
  localStorage.setItem(`${email}_${key}`, JSON.stringify(value));
}
