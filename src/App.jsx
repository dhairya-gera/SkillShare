import { useState } from "react";
import "./App.css";
import logoImg from "./skill-share-logo.png";
import { initialPosts } from "./data/initialPosts";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";
import PostCard from "./components/PostCard";
import CreatePostModal from "./components/CreatePost";

const getSavedData = (key, fallback) => {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch (error) {
    console.error(`Error reading or parsing localStorage key "${key}":`, error);
    return fallback;
  }
};

export default function App() {
  const savedEmail = localStorage.getItem("email") || "";

  const [currentView, setCurrentView] = useState(
    localStorage.getItem("view") || "login",
  );
  const [email, setEmail] = useState(savedEmail);
  const [fullName, setFullName] = useState(localStorage.getItem("name") || "");

  const [credits, setCredits] = useState(() => {
    if (savedEmail) {
      return Number(localStorage.getItem(`${savedEmail}_credits`)) || 200;
    }
    return 200;
  });

  const [posts, setPosts] = useState(() => getSavedData("posts", initialPosts));

  const [connectedPostIds, setConnectedPostIds] = useState(() => {
    if (savedEmail) {
      return getSavedData(`${savedEmail}_connections`, []);
    }
    return [];
  });

  const [filterCategory, setFilterCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAuth() {
    setCurrentView("dashboard");
    localStorage.setItem("view", "dashboard");
    localStorage.setItem("email", email);
    localStorage.setItem("name", fullName);

    const userCreditsKey = `${email}_credits`;
    const userConnectionsKey = `${email}_connections`;

    const savedUserCredits = localStorage.getItem(userCreditsKey);
    if (savedUserCredits) {
      setCredits(Number(savedUserCredits));
    } else {
      setCredits(200);
      localStorage.setItem(userCreditsKey, "200");
    }

    const savedUserConnections = localStorage.getItem(userConnectionsKey);
    if (savedUserConnections) {
      setConnectedPostIds(JSON.parse(savedUserConnections));
    } else {
      setConnectedPostIds([]);
      localStorage.setItem(userConnectionsKey, JSON.stringify([]));
    }
  }

  function handleLogout() {
    setCurrentView("login");
    localStorage.setItem("view", "login");
    setEmail("");
    setFullName("");
    setCredits(200);
    setConnectedPostIds([]);
  }

  function handleConnect(post) {
    if (connectedPostIds.includes(post.id)) return;

    let updatedCredits = credits;
    if (post.type === "Offering Help") {
      if (credits < 20) {
        alert("Not enough credits to take this help! 🛑");
        return;
      }
      updatedCredits -= 20;
      alert(
        `Connection request sent to ${post.name}! You spent 20 Credits. 📉`,
      );
    } else {
      updatedCredits += 10;
      alert(
        `Thanks for offering help to ${post.name}! You earned +10 Credits. 📈`,
      );
    }

    const updatedConnections = [...connectedPostIds, post.id];
    setCredits(updatedCredits);
    setConnectedPostIds(updatedConnections);

    localStorage.setItem(`${email}_credits`, updatedCredits);
    localStorage.setItem(
      `${email}_connections`,
      JSON.stringify(updatedConnections),
    );
  }

  function handleCreatePost(postData) {
    const emailName = email.split("@")[0] || "Student";
    const name =
      fullName.trim() ||
      `${emailName.charAt(0).toUpperCase()}${emailName.slice(1)} (You)`;
    const newPost = { id: Date.now(), name, branch: "BTech CSE", ...postData };
    const updatedPosts = [newPost, ...posts];

    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  }

  const visiblePosts =
    filterCategory === "All"
      ? posts
      : posts.filter((post) => post.category === filterCategory);
  const greetingName = fullName || email.split("@")[0];

  if (currentView === "login") {
    return (
      <Login
        logoImg={logoImg}
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        setEmail={setEmail}
        handleAuth={handleAuth}
      />
    );
  }

  return (
    <div className="app dash">
      <Navbar
        logoImg={logoImg}
        credits={credits}
        onOpenModal={() => setIsModalOpen(true)}
        onLogout={handleLogout}
      />
      <main className="main">
        <section className="banner">
          <h1>Welcome back{greetingName ? `, ${greetingName}` : ""}!</h1>
          <p>
            Find study partners, trade skills, or ask for help from your
            batchmates.
          </p>
        </section>
        <FilterBar
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
        <section className="grid">
          {visiblePosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isConnected={connectedPostIds.includes(post.id)}
              onConnect={handleConnect}
            />
          ))}
        </section>
      </main>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreatePost={handleCreatePost}
      />
    </div>
  );
}
