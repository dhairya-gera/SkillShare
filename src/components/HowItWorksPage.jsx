import { Link } from "react-router-dom";

const steps = [
  {
    icon: "🔐",
    title: "Sign in",
    text: "Use your @mail.edu.in college email. New users start with 200 credits.",
  },
  {
    icon: "🔎",
    title: "Browse & search",
    text: "Filter the feed by category, type or keyword to find the right post.",
  },
  {
    icon: "🤝",
    title: "Connect",
    text: "Offer help to earn +10 credits, or take help for 20 credits.",
  },
  {
    icon: "📝",
    title: "Post",
    text: "Need something or can teach something? Create your own request or offer.",
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      <section className="banner">
        <h1>How SkillShare works</h1>
        <p>A campus-only credit system for swapping skills and study help.</p>
      </section>
      <div className="overview">
        {steps.map((step) => (
          <div className="overview-card left" key={step.title}>
            <span className="step-icon">{step.icon}</span>
            <strong>{step.title}</strong>
            <span>{step.text}</span>
          </div>
        ))}
      </div>
      <p className="demo-note">
        <Link to="/" className="details-link">
          Go to the feed →
        </Link>
      </p>
    </div>
  );
}
