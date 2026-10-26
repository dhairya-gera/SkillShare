import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { initialPosts } from "./data/initialPosts";
import {
  STARTING_CREDITS,
  HELP_COST,
  HELP_REWARD,
  MIN_CASHOUT,
  creditsToRupees,
  maskUpi,
} from "./data/credits";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./components/ProfilePage";
import PostDetailPage from "./components/PostDetailPage";
import HowItWorksPage from "./components/HowItWorksPage";
import CreditsPage from "./components/CreditsPage";
import NotFoundPage from "./components/NotFoundPage";
import {
  ProfileOverview,
  MyPosts,
  Connections,
  SavedPosts,
} from "./components/ProfileSections";

function validatePost(values) {
  const text = values.text.trim();

  if (!text) return { text: "Description is required." };
  if (text.length < 10) {
    return { text: "Description must be at least 10 characters." };
  }

  return {};
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

function readCredits(email) {
  const saved = localStorage.getItem(`${email}_credits`);
  return saved === null ? STARTING_CREDITS : Number(saved);
}

function saveUserData(email, key, value) {
  localStorage.setItem(`${email}_${key}`, JSON.stringify(value));
}

export default function App() {
  const [user, setUser] = useState(() => {
    const email = localStorage.getItem("email");
    if (!email) return null;

    return {
      name: localStorage.getItem("name") || email.split("@")[0],
      email,
    };
  });
  const [posts, setPosts] = useState(() => readStorage("posts", initialPosts));
  const [credits, setCredits] = useState(() =>
    user ? readCredits(user.email) : STARTING_CREDITS,
  );
  const [connections, setConnections] = useState(() =>
    user ? readStorage(`${user.email}_connections`, []) : [],
  );
  const [savedPosts, setSavedPosts] = useState(() =>
    user ? readStorage(`${user.email}_saved`, []) : [],
  );
  const [transactions, setTransactions] = useState(() =>
    user ? readStorage(`${user.email}_transactions`, []) : [],
  );
  function handleSignup(name, email, password) {
    const accounts = readStorage("accounts", {});

    if (accounts[email]) {
      return {
        ok: false,
        error: "An account with this email already exists. Please log in.",
      };
    }

    accounts[email] = { name, password };
    localStorage.setItem("accounts", JSON.stringify(accounts));
    return { ok: true };
  }

  function handleLogin(email, password) {
    const account = readStorage("accounts", {})[email];

    if (!account) {
      return {
        ok: false,
        error: "No account found for this email. Please sign up first.",
      };
    }

    if (account.password !== password) {
      return { ok: false, error: "Incorrect password." };
    }

    setUser({ name: account.name, email });
    setCredits(readCredits(email));
    setConnections(readStorage(`${email}_connections`, []));
    setSavedPosts(readStorage(`${email}_saved`, []));
    setTransactions(readStorage(`${email}_transactions`, []));
    localStorage.setItem("name", account.name);
    localStorage.setItem("email", email);

    return { ok: true };
  }

  function handleLogout() {
    setUser(null);
    setCredits(STARTING_CREDITS);
    setConnections([]);
    setSavedPosts([]);
    setTransactions([]);
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  }

  function recordTransaction(entry) {
    const newTransactions = [
      { id: Date.now(), date: new Date().toISOString(), ...entry },
      ...transactions,
    ].slice(0, 50);

    setTransactions(newTransactions);
    saveUserData(user.email, "transactions", newTransactions);
  }

  function handleConnect(post) {
    if (connections.includes(post.id)) return;

    if (post.ownerEmail === user.email) {
      alert("You can't connect with your own post.");
      return;
    }

    const takingHelp = post.type === "Offering Help";

    if (takingHelp && credits < HELP_COST) {
      alert("Not enough credits to take this help.");
      return;
    }

    const creditChange = takingHelp ? -HELP_COST : HELP_REWARD;
    const newCredits = credits + creditChange;
    const newConnections = [...connections, post.id];

    setCredits(newCredits);
    setConnections(newConnections);
    saveUserData(user.email, "credits", newCredits);
    saveUserData(user.email, "connections", newConnections);
    recordTransaction({
      type: takingHelp ? "spent" : "earned",
      credits: Math.abs(creditChange),
      note: takingHelp
        ? `Took help from ${post.name}`
        : `Offered help to ${post.name}`,
    });
    alert(
      takingHelp
        ? `Request sent to ${post.name}.`
        : `You earned +${HELP_REWARD} credits.`,
    );
  }

  function handleCashout(amount, upiId) {
    if (!Number.isInteger(amount) || amount < MIN_CASHOUT || amount > credits) {
      return { ok: false, error: "Invalid cash-out amount." };
    }

    const rupees = creditsToRupees(amount);
    const newCredits = credits - amount;

    setCredits(newCredits);
    saveUserData(user.email, "credits", newCredits);
    recordTransaction({
      type: "cashout",
      credits: amount,
      rupees,
      note: `Cash out to ${maskUpi(upiId)}`,
    });

    return { ok: true, rupees, balance: newCredits };
  }

  function handleSave(postId) {
    const newSavedPosts = savedPosts.includes(postId)
      ? savedPosts.filter((id) => id !== postId)
      : [...savedPosts, postId];

    setSavedPosts(newSavedPosts);
    saveUserData(user.email, "saved", newSavedPosts);
  }

  function handleCreatePost(postData) {
    const newPost = {
      id: Date.now(),
      name: user.name,
      branch: "BTech CSE",
      ownerEmail: user.email,
      ...postData,
    };
    const newPosts = [newPost, ...posts];

    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  }

  function handleDeletePost(postId) {
    const newPosts = posts.filter((post) => post.id !== postId);
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  }

  const sharedProps = {
    user,
    posts,
    credits,
    connections,
    savedPosts,
    transactions,
    onConnect: handleConnect,
    onSave: handleSave,
    onDelete: handleDeletePost,
    onCreatePost: handleCreatePost,
    onCashout: handleCashout,
    onLogout: handleLogout,
    validatePost,
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage onLogin={handleLogin} onSignup={handleSignup} />}
      />

      <Route element={<ProtectedRoute isLoggedIn={Boolean(user)} />}>
        <Route element={<Layout {...sharedProps} />}>
          <Route index element={<DashboardPage {...sharedProps} />} />
          <Route
            path="posts/:postId"
            element={<PostDetailPage {...sharedProps} />}
          />
          <Route path="how-it-works" element={<HowItWorksPage user={user} />} />
          <Route path="credits" element={<CreditsPage {...sharedProps} />} />
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
