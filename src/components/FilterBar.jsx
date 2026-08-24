const categories = [
  "All",
  "Programming / DSA",
  "Academics & Notes",
  "Music & Arts",
  "Project Partners",
];

export default function FilterBar({ filterCategory, setFilterCategory }) {
  return (
    <section className="filters">
      {categories.map((category) => (
        <button
          key={category}
          className={filterCategory === category ? "filter active" : "filter"}
          onClick={() => setFilterCategory(category)}
        >
          {category}
        </button>
      ))}
    </section>
  );
}
