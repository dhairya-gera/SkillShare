import { useState } from "react";
import { categories } from "../data/categories";

export default function CreatePostModal({
  isOpen,
  onClose,
  onCreatePost,
  validatePost,
}) {
  const initialValues = {
    text: "",
    category: categories[1],
    type: "Seeking Help",
    status: "Flexible",
  };
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validatePost(values);
    if (errors.text) {
      setError(errors.text);
      return;
    }
    onCreatePost({ ...values, text: values.text.trim() });
    setValues(initialValues);
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
              name="text"
              rows="3"
              maxLength="200"
              value={values.text}
              onChange={handleChange}
            />
            {error && <p className="error">{error}</p>}
          </div>
          <div className="input-box">
            <label>Category</label>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
            >
              {categories.slice(1).map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="input-box">
              <label>Post Type</label>
              <select name="type" value={values.type} onChange={handleChange}>
                <option>Seeking Help</option>
                <option>Offering Help</option>
              </select>
            </div>
            <div className="input-box">
              <label>Urgency</label>
              <select
                name="status"
                value={values.status}
                onChange={handleChange}
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
