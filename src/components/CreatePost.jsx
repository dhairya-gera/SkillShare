import { useState } from "react";

export default function CreatePostModal({ isOpen, onClose, onCreatePost }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Programming / DSA");
  const [type, setType] = useState("Seeking Help");
  const [status, setStatus] = useState("Flexible");

  if (!isOpen) return null;

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) return;

    onCreatePost({ text: text.trim(), category, type, status });
    setText("");
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

        <form onSubmit={handleSubmit} className="form">
          <div className="input-box">
            <label>Description / Details</label>
            <textarea
              rows="3"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Programming / DSA</option>
              <option>Academics & Notes</option>
              <option>Music & Arts</option>
              <option>Project Partners</option>
            </select>
          </div>

          <div className="row">
            <div className="input-box">
              <label>Post Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option>Seeking Help</option>
                <option>Offering Help</option>
              </select>
            </div>
            <div className="input-box">
              <label>Urgency</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
