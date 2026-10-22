import { useState } from "react";
import FilterBar from "./FilterBar";
import PostList from "./PostList";

export default function DashboardPage({
  user,
  posts,
  connections,
  savedPosts,
  onConnect,
  onSave,
}) {
  const [filterCategory, setFilterCategory] = useState("All");
  const [query, setQuery] = useState("");
  const search = query.toLowerCase();
  const visiblePosts = posts.filter((post) => {
    const categoryMatches =
      filterCategory === "All" || post.category === filterCategory;
    const textMatches =
      !search ||
      post.text.toLowerCase().includes(search) ||
      post.name.toLowerCase().includes(search);
    return categoryMatches && textMatches;
  });

  return (
    <>
      <section className="banner">
        <h1>Welcome back, {user.name}!</h1>
        <p>Find study partners, share skills, or ask classmates for help.</p>
      </section>
      <section className="toolbar">
        <input
          className="search"
          type="search"
          placeholder="Search posts or names..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </section>
      <FilterBar
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
      <PostList
        posts={visiblePosts}
        connections={connections}
        savedPosts={savedPosts}
        onConnect={onConnect}
        onSave={onSave}
        placeholder="No posts match your search or filters."
      />
    </>
  );
}
