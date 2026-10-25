import { useState } from "react";
import { categories } from "../data/categories";

export default function CreatePostModal({
  isOpen,
  onClose,
  onCreatePost,
  validatePost,
}) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState(categories[1]);
  const [type, setType] = useState("Seeking Help");
  const [status, setStatus] = useState("Flexible");
  const [error, setError] = useState("");

  if (!isOpen) {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const post = {
      text: text,
      category: category,
      type: type,
      status: status,
    };

    const errors = validatePost(post);

    if (errors.text) {
      setError(errors.text);
      return;
    }

    post.text = text.trim();

    onCreatePost(post);

    setText("");
    setCategory(categories[1]);
    setType("Seeking Help");
    setStatus("Flexible");
    setError("");

    onClose();
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-top">
          <h3>Create a Request / Offer</h3>

          <button className="close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form" noValidate>
          <div className="input-box">
            <label>Description / Details</label>

            <textarea
              rows="3"
              maxLength="200"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />

            {error && <p className="error">{error}</p>}
          </div>

          <div className="input-box">
            <label>Category</label>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.slice(1).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="input-box">
              <label>Post Type</label>

              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option>Seeking Help</option>
                <option>Offering Help</option>
              </select>
            </div>

            <div className="input-box">
              <label>Urgency</label>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option>Flexible</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>

          <div className="actions">
            <button type="button" className="btn-border" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="btn">
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
