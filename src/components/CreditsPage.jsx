import { useState } from "react";
import PageMeta from "./PageMeta";
import {
  CREDIT_TO_RUPEES,
  MIN_CASHOUT,
  creditsToRupees,
  formatRupees,
} from "../data/credits";

const UPI_PATTERN = /^[a-zA-Z0-9._-]{2,64}@[a-zA-Z]{2,32}$/;

const typeInfo = {
  earned: { icon: "📈", sign: "+", className: "plus" },
  spent: { icon: "📉", sign: "-", className: "minus" },
  cashout: { icon: "🏦", sign: "-", className: "minus" },
};

function validateCashout(values, credits) {
  const errors = {};
  const amount = Number(values.amount);

  if (!values.amount) {
    errors.amount = "Enter how many credits you want to cash out.";
  } else if (!Number.isInteger(amount) || amount <= 0) {
    errors.amount = "Enter a whole number of credits.";
  } else if (amount < MIN_CASHOUT) {
    errors.amount = `Minimum cash-out is ${MIN_CASHOUT} credits.`;
  } else if (amount > credits) {
    errors.amount = `You only have ${credits} credits.`;
  }

  const upi = values.upi.trim();
  if (!upi) {
    errors.upi = "UPI ID is required.";
  } else if (!UPI_PATTERN.test(upi)) {
    errors.upi = "Enter a valid UPI ID, like name@okaxis.";
  }

  return errors;
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CreditsPage({ credits, transactions, onCashout }) {
  const [values, setValues] = useState({ amount: "", upi: "" });
  const [errors, setErrors] = useState({});
  const [receipt, setReceipt] = useState(null);

  const amount = Number(values.amount);
  const rupeePreview =
    Number.isInteger(amount) && amount > 0 ? creditsToRupees(amount) : 0;
  const canCashOut = credits >= MIN_CASHOUT;
  const quickAmounts = [MIN_CASHOUT, MIN_CASHOUT * 2].filter(
    (value) => value <= credits,
  );

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
    setReceipt(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateCashout(values, credits);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = onCashout(Number(values.amount), values.upi.trim());
    if (!result.ok) {
      setErrors({ amount: result.error });
      return;
    }
    setReceipt({ credits: Number(values.amount), rupees: result.rupees });
    setValues({ amount: "", upi: "" });
  }

  return (
    <div>
      <PageMeta title="Credits & cash out" noindex />
      <section className="banner">
        <h1>Your credits</h1>
        <p>Track your balance and cash out the credits you earn by helping others.</p>
      </section>

      <section className="credit-summary" aria-label="Balance summary">
        <div className="balance-card">
          <span>Available balance</span>
          <strong>💰 {credits} credits</strong>
          <span>≈ {formatRupees(creditsToRupees(credits))}</span>
        </div>
        <div className="overview-card">
          <strong>{formatRupees(CREDIT_TO_RUPEES)}</strong>
          <span>Value of 1 credit</span>
        </div>
        <div className="overview-card">
          <strong>{MIN_CASHOUT}</strong>
          <span>Minimum credits to cash out</span>
        </div>
      </section>

      <div className="credits-layout">
        <section className="panel" aria-labelledby="cashout-title">
          <h2 id="cashout-title">Cash out</h2>

          {receipt && (
            <div className="receipt" role="status">
              <strong>✅ Cash-out successful</strong>
              <p>
                {receipt.credits} credits → {formatRupees(receipt.rupees)} sent to
                your UPI ID.
              </p>
              <small>Demo mode: no real money is transferred.</small>
            </div>
          )}

          {!canCashOut && (
            <p className="info-note">
              You need at least {MIN_CASHOUT} credits to cash out. Offer help to
              classmates to earn more (+10 credits each).
            </p>
          )}

          <form onSubmit={handleSubmit} className="form" noValidate>
            <div className="input-box">
              <label htmlFor="amount">Credits to cash out</label>
              <input
                id="amount"
                name="amount"
                type="number"
                inputMode="numeric"
                min={MIN_CASHOUT}
                max={credits}
                step="1"
                value={values.amount}
                onChange={handleChange}
                placeholder={`Min. ${MIN_CASHOUT}`}
                disabled={!canCashOut}
              />
              <div className="quick-amounts">
                {quickAmounts.map((value) => (
                  <button
                    type="button"
                    key={value}
                    className="chip"
                    onClick={() => setValues({ ...values, amount: String(value) })}
                  >
                    {value}
                  </button>
                ))}
                {canCashOut && (
                  <button
                    type="button"
                    className="chip"
                    onClick={() => setValues({ ...values, amount: String(credits) })}
                  >
                    Max ({credits})
                  </button>
                )}
              </div>
              {errors.amount && (
                <p className="error" role="alert">
                  {errors.amount}
                </p>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="upi">UPI ID</label>
              <input
                id="upi"
                name="upi"
                autoComplete="off"
                value={values.upi}
                onChange={handleChange}
                placeholder="yourname@okaxis"
                disabled={!canCashOut}
              />
              {errors.upi && (
                <p className="error" role="alert">
                  {errors.upi}
                </p>
              )}
            </div>

            <p className="payout-line">
              You will receive: <strong>{formatRupees(rupeePreview)}</strong>
            </p>

            <button type="submit" className="btn" disabled={!canCashOut}>
              Cash out
            </button>
            <small className="muted-note">
              Demo project: cash-outs are simulated and no real payment is made.
            </small>
          </form>
        </section>

        <section className="panel" aria-labelledby="history-title">
          <h2 id="history-title">Credit history</h2>
          {transactions.length === 0 ? (
            <p className="empty">No activity yet. Help someone to earn credits!</p>
          ) : (
            <ul className="tx-list">
              {transactions.map((item) => {
                const info = typeInfo[item.type];
                return (
                  <li className="tx-item" key={item.id}>
                    <span className="tx-icon" aria-hidden="true">
                      {info.icon}
                    </span>
                    <div className="tx-text">
                      <strong>{item.note}</strong>
                      <small>
                        {formatDate(item.date)}
                        {item.type === "cashout" && ` · ${formatRupees(item.rupees)}`}
                      </small>
                    </div>
                    <span className={`tx-amount ${info.className}`}>
                      {info.sign}
                      {item.credits}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          <small className="muted-note">Showing your 50 most recent activities.</small>
        </section>
      </div>
    </div>
  );
}
