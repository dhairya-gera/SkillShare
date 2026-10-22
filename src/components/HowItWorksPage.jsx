import { Link } from "react-router-dom";
import PageMeta from "./PageMeta";
import { categories } from "../data/categories";
import {
  STARTING_CREDITS,
  HELP_COST,
  HELP_REWARD,
  CREDIT_TO_RUPEES,
  MIN_CASHOUT,
  formatRupees,
} from "../data/credits";

const steps = [
  {
    icon: "🔐",
    title: "Join with your college email",
    text: `Sign up with your @mail.edu.in address. It keeps SkillShare students-only, and you start with ${STARTING_CREDITS} free credits.`,
  },
  {
    icon: "🔎",
    title: "Find what you need",
    text: "Search the feed or filter by category to see who is asking for help and who is offering their skills.",
  },
  {
    icon: "🤝",
    title: "Connect with a classmate",
    text: `Offer help on a request and earn +${HELP_REWARD} credits, or take help from an offer for ${HELP_COST} credits.`,
  },
  {
    icon: "📝",
    title: "Post your own request or offer",
    text: "Stuck on a topic? Good at something? Publish a post with a category and urgency so the right people see it.",
  },
  {
    icon: "💸",
    title: "Cash out what you earn",
    text: `Keep helping, then convert credits to rupees from the Credits page once you have at least ${MIN_CASHOUT}.`,
  },
];

const creditRules = [
  ["Create an account", `+${STARTING_CREDITS}`, "One-time welcome balance"],
  ["Offer help on a request", `+${HELP_REWARD}`, "Credited instantly"],
  ["Take help from an offer", `-${HELP_COST}`, "Needs at least 20 credits"],
  [
    "Cash out",
    `${formatRupees(CREDIT_TO_RUPEES)} / credit`,
    `Minimum ${MIN_CASHOUT} credits per cash-out`,
  ],
];

const categoryInfo = {
  "Programming / DSA": "Debugging, DSA doubts, coding practice",
  "Academics & Notes": "Notes, past papers, lab manuals, exam prep",
  "Music & Arts": "Guitar, design, illustration, creative skills",
  "Project Partners": "Hackathon teammates and college project help",
};

const faqs = [
  {
    question: "Who can use SkillShare?",
    answer:
      "Only students with a valid @mail.edu.in college email can sign up, so everyone you meet is from your campus.",
  },
  {
    question: "Is SkillShare free?",
    answer: `Yes. Creating an account is free and you start with ${STARTING_CREDITS} credits. Credits are only used to take help from other students.`,
  },
  {
    question: "How do I earn credits?",
    answer: `Offer help on any "Seeking Help" post and you earn ${HELP_REWARD} credits right away. You cannot earn credits from your own posts.`,
  },
  {
    question: "How does cashing out work?",
    answer: `Open the Credits page, enter at least ${MIN_CASHOUT} credits and your UPI ID. Each credit is worth ${formatRupees(CREDIT_TO_RUPEES)}. In this demo version the payout is simulated, so no real money moves.`,
  },
  {
    question: "What if I run out of credits?",
    answer:
      "You can still offer help to earn more. Taking help needs 20 credits, so a few helpful posts will get you back on track.",
  },
  {
    question: "Can I delete my post?",
    answer:
      "Yes. Open your post from the feed or from Profile → My Posts and use the Delete post button.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function HowItWorksPage({ user }) {
  return (
    <div className="hiw">
      <PageMeta
        title="How it works"
        description="Learn how SkillShare works: join with your college email, trade skills with classmates, earn credits for helping and cash them out."
        jsonLd={faqJsonLd}
      />

      <section className="hiw-hero">
        <h1>Learn together. Earn while you help.</h1>
        <p>
          SkillShare is a campus-only marketplace where students swap skills and
          study help using credits, no money needed to get started.
        </p>
        <div className="hiw-cta">
          <Link to={user ? "/" : "/login"} className="btn hero-btn">
            {user ? "Go to the feed" : "Get started free"}
          </Link>
          <a href="#faq" className="btn-border">
            Read the FAQ
          </a>
        </div>
      </section>

      <section aria-labelledby="steps-title">
        <h2 id="steps-title" className="section-title">
          Get started in 5 steps
        </h2>
        <ol className="steps">
          {steps.map((step, index) => (
            <li className="step" key={step.title}>
              <span className="step-number" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3>
                  <span aria-hidden="true">{step.icon} </span>
                  {step.title}
                </h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="example-title">
        <h2 id="example-title" className="section-title">
          Example: how credits move
        </h2>
        <div className="example-box">
          <p>
            <strong>Rahul</strong> is stuck on Trees &amp; Graphs before
            mid-terms and posts a request. <strong>Sneha</strong> is good at
            DSA, so she offers help.
          </p>
          <p>
            Sneha earns <strong>+{HELP_REWARD} credits</strong>. Later she needs
            notes for another subject and takes help from an offer for{" "}
            <strong>-{HELP_COST} credits</strong>. Whatever she has left can be
            cashed out to her UPI account.
          </p>
        </div>
      </section>

      <section aria-labelledby="credits-title">
        <h2 id="credits-title" className="section-title">
          The credit system
        </h2>
        <div className="table-wrap">
          <table className="rules-table">
            <thead>
              <tr>
                <th scope="col">Action</th>
                <th scope="col">Credits</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              {creditRules.map(([action, value, note]) => (
                <tr key={action}>
                  <th scope="row">{action}</th>
                  <td className="rule-value">{value}</td>
                  <td>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="categories-title">
        <h2 id="categories-title" className="section-title">
          What can you share?
        </h2>
        <div className="overview">
          {categories.slice(1).map((category) => (
            <div className="overview-card left" key={category}>
              <h3>{category}</h3>
              <span>{categoryInfo[category]}</span>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="rules-title">
        <h2 id="rules-title" className="section-title">
          Community guidelines
        </h2>
        <ul className="guidelines">
          <li>Be respectful and helpful. Everyone here is a classmate.</li>
          <li>
            Describe your request or skill clearly so others can help quickly.
          </li>
          <li>Only offer help you can actually give.</li>
          <li>
            You can&apos;t connect with, or earn credits from, your own posts.
          </li>
          <li>Never share passwords or personal financial details in posts.</li>
        </ul>
      </section>

      <section id="faq" aria-labelledby="faq-title">
        <h2 id="faq-title" className="section-title">
          Frequently asked questions
        </h2>
        <div className="faq">
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <h2>Ready to start sharing?</h2>
        <p>Join your classmates and turn what you know into credits.</p>
        <Link to={user ? "/" : "/login"} className="btn hero-btn">
          {user ? "Browse posts" : "Create your account"}
        </Link>
      </section>
    </div>
  );
}
