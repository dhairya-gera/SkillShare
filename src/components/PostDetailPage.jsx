import { Link, useNavigate, useParams } from "react-router-dom";
import NotFoundContent from "./NotFoundContent";

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function StarIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function PostDetailPage(props) {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = props.posts.find((item) => String(item.id) === postId);

  if (!post) {
    return (
      <NotFoundContent message="This post does not exist or was deleted." />
    );
  }

  const isOffering = post.type === "Offering Help";
  const isOwner = post.ownerEmail === props.user.email;
  const isConnected = props.connections.includes(post.id);
  const isSaved = props.savedPosts.includes(post.id);

  return (
    <article className="detail">
      <button className="btn-border" onClick={() => navigate(-1)}>
        <BackIcon /> Back
      </button>

      <div className="detail-card">
        <div className="card-top">
          <div className="user">
            <div className="icon">{post.name[0]}</div>

            <div>
              <h4>{post.name}</h4>
              <span className="branch">{post.branch}</span>
            </div>
          </div>
        </div>

        <span className={isOffering ? "tag offering" : "tag seeking"}>
          {post.type}
        </span>

        <p className="detail-text">{post.text}</p>
        <p className="category">Category: {post.category}</p>

        <div className="detail-actions">
          <button
            className="btn-connect"
            onClick={() => props.onConnect(post)}
            disabled={isConnected}
          >
            {isConnected ? "Requested" : "Connect"}
          </button>

          <button className="btn-border" onClick={() => props.onSave(post.id)}>
            <StarIcon filled={isSaved} /> {isSaved ? "Saved" : "Save"}
          </button>

          {isOwner && (
            <button
              className="btn-red"
              onClick={() => {
                props.onDelete(post.id);
                navigate("/");
              }}
            >
              Delete post
            </button>
          )}
        </div>
      </div>

      <Link to="/" className="details-link">
        Browse more posts <ArrowIcon />
      </Link>
    </article>
  );
}
