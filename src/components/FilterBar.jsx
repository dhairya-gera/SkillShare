import { categories } from "../data/categories";

export default function FilterBar({ filterCategory, setFilterCategory }) {
  return (
    <section className="filters">
      {categories.map((category) => {
        let buttonClass = "filter";

        if (filterCategory === category) {
          buttonClass = "filter active";
        }

        return (
          <button
            key={category}
            className={buttonClass}
            onClick={() => setFilterCategory(category)}
          >
            {category}
          </button>
        );
      })}
    </section>
  );
}
