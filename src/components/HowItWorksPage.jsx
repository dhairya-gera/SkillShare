import { Link } from "react-router-dom";
import { categories } from "../data/categories";

import {
  STARTING_CREDITS,
  HELP_COST,
  HELP_REWARD,
  CREDIT_TO_RUPEES,
  MIN_CASHOUT,
  formatRupees,
} from "../data/credits";

// SVG icons
function LockIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m8 12 3 3a2 2 0 0 0 3 0l3-3" />
      <path d="m2 9 4-4 5 1 3 2" />
      <path d="m22 9-4-4-5 1-5 5a2 2 0 0 0 3 3" />
      <path d="m2 9 4 8 3-2" />
      <path d="m22 9-4 8-4-2" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="6" width="20" height="13" rx="2" />
      <circle cx="12" cy="12.5" r="3" />
      <path d="M6 10h.01M18 15h.01" />
      <path d="M7 3h14" />
    </svg>
  );
}

export default function HowItWorksPage({ user }) {
  const steps = [
    {
      icon: <LockIcon />,
      title: "Join with your college email",
      text: `Sign up with your @mail.edu.in address. It keeps SkillShare students-only, and you start with ${STARTING_CREDITS} free credits.`,
    },
    {
      icon: <SearchIcon />,
      title: "Find what you need",
      text: "Search the feed or filter by category to see who is asking for help and who is offering their skills.",
    },
    {
      icon: <HandshakeIcon />,
      title: "Connect with a classmate",
      text: `Offer help on a request and earn +${HELP_REWARD} credits, or take help from an offer for ${HELP_COST} credits.`,
    },
    {
      icon: <DocumentIcon />,
      title: "Post your own request or offer",
      text: "Stuck on a topic? Good at something? Publish a post with a category and urgency so the right people see it.",
    },
    {
      icon: <CashIcon />,
      title: "Cash out what you earn",
      text: `Keep helping, then convert credits to rupees from the Credits page once you have at least ${MIN_CASHOUT}.`,
    },
  ];

  const creditRules = [
    {
      action: "Create an account",
      value: `+${STARTING_CREDITS}`,
      note: "One-time welcome balance",
    },
    {
      action: "Offer help on a request",
      value: `+${HELP_REWARD}`,
      note: "Credited instantly",
    },
    {
      action: "Take help from an offer",
      value: `-${HELP_COST}`,
      note: "Needs at least 20 credits",
    },
    {
      action: "Cash out",
      value: `${formatRupees(CREDIT_TO_RUPEES)} / credit`,
      note: `Minimum ${MIN_CASHOUT} credits per cash-out`,
    },
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

  return (
    <div className="hiw">
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
                  <span className="step-icon">{step.icon}</span> {step.title}
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
              {creditRules.map((rule) => (
                <tr key={rule.action}>
                  <th scope="row">{rule.action}</th>
                  <td className="rule-value">{rule.value}</td>
                  <td>{rule.note}</td>
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
