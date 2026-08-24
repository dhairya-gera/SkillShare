export default function PostCard({ post, isConnected, onConnect }) {
  const isOffering = post.type === "Offering Help";
  const buttonText = isConnected
    ? "Requested"
    : isOffering
      ? "Take Help (-20 💰)"
      : "Offer Help (+10 💰)";

  return (
    <div className="card">
      <div className="card-top">
        <div className="user">
          <div className="icon">{post.name.charAt(0)}</div>
          <div>
            <h4>{post.name}</h4>
            <span className="branch">{post.branch}</span>
          </div>
        </div>
        <span
          className={
            post.status === "Urgent" ? "status urgent" : "status flexible"
          }
        >
          {post.status}
        </span>
      </div>
      <div className="card-body">
        <span className={isOffering ? "tag offering" : "tag seeking"}>
          {post.type}
        </span>
        <p className="text">{post.text}</p>
      </div>
      <div className="card-bottom">
        <span className="category">Category: {post.category}</span>
        <button
          className={isConnected ? "btn-connect done" : "btn-connect"}
          onClick={() => onConnect(post)}
          disabled={isConnected}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
