import PostCard from "./PostCard";

export default function PostList({
  posts,
  connections,
  savedPosts,
  onConnect,
  onSave,
  placeholder = "No posts to show.",
}) {
  if (posts.length === 0) return <p className="empty">{placeholder}</p>;

  return (
    <section className="grid">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isConnected={connections.includes(post.id)}
          isSaved={savedPosts.includes(post.id)}
          onConnect={onConnect}
          onToggleSave={onSave}
        />
      ))}
    </section>
  );
}