import PostList from "./PostList";

export function ProfileOverview({
  user,
  posts,
  connections,
  savedPosts,
  credits,
}) {
  const count = posts.filter((post) => post.ownerEmail === user.email).length;

  return (
    <div className="overview">
      {[
        [count, "Posts created"],
        [connections.length, "Connections made"],
        [savedPosts.length, "Saved posts"],
        [credits, "Credits left"],
      ].map(([value, label]) => (
        <div className="overview-card" key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function MyPosts(data) {
  return (
    <PostList
      {...data}
      posts={data.posts.filter((post) => post.ownerEmail === data.user.email)}
      placeholder="You haven't posted anything yet."
    />
  );
}

export function Connections(data) {
  return (
    <PostList
      {...data}
      posts={data.posts.filter((post) => data.connections.includes(post.id))}
      placeholder="No connections yet."
    />
  );
}

export function SavedPosts(data) {
  return (
    <PostList
      {...data}
      posts={data.posts.filter((post) => data.savedPosts.includes(post.id))}
      placeholder="Nothing saved yet."
    />
  );
}
