import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import CreatePostModal from "./CreatePost";
import Footer from "./Footer";

export default function Layout({
  credits,
  onLogout,
  onCreatePost,
  validatePost,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app dash">
      <Navbar
        credits={credits}
        onOpenModal={() => setIsModalOpen(true)}
        onLogout={onLogout}
      />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreatePost={onCreatePost}
        validatePost={validatePost}
      />
    </div>
  );
}
