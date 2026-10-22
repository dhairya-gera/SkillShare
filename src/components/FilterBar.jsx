import { categories } from "../data/categories";

export default function FilterBar({ filterCategory, setFilterCategory }) {
  return (
    <section className="filters">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter ${filterCategory === category ? "active" : ""}`}
          onClick={() => setFilterCategory(category)}
        >
          {category}
        </button>
      ))}
    </section>
  );
}
