import { useState } from "react";
import {
  CREDIT_TO_RUPEES,
  MIN_CASHOUT,
  creditsToRupees,
  formatRupees,
} from "../data/credits";

const UPI_PATTERN = /^[a-zA-Z0-9._-]{2,64}@[a-zA-Z]{2,32}$/;

export default function CreditsPage({ credits, onCashout }) {
  const [amount, setAmount] = useState("");
  const [upi, setUpi] = useState("");
  const [amountError, setAmountError] = useState("");
  const [upiError, setUpiError] = useState("");
  const [receipt, setReceipt] = useState(null);

  const cashoutAmount = Number(amount);

  let rupeePreview = 0;

  if (Number.isInteger(cashoutAmount) && cashoutAmount > 0) {
    rupeePreview = creditsToRupees(cashoutAmount);
  }

  const canCashOut = credits >= MIN_CASHOUT;

  const quickAmounts = [MIN_CASHOUT, MIN_CASHOUT * 2].filter(
    (value) => value <= credits,
  );

  function handleSubmit(event) {
    event.preventDefault();

    let amountMessage = "";
    let upiMessage = "";

    const enteredAmount = Number(amount);
    const enteredUpi = upi.trim();

    if (amount === "") {
      amountMessage = "Enter how many credits you want to cash out.";
    } else if (!Number.isInteger(enteredAmount) || enteredAmount <= 0) {
      amountMessage = "Enter a whole number of credits.";
    } else if (enteredAmount < MIN_CASHOUT) {
      amountMessage = `Minimum cash-out is ${MIN_CASHOUT} credits.`;
    } else if (enteredAmount > credits) {
      amountMessage = `You only have ${credits} credits.`;
    }

    if (enteredUpi === "") {
      upiMessage = "UPI ID is required.";
    } else if (!UPI_PATTERN.test(enteredUpi)) {
      upiMessage = "Enter a valid UPI ID, like name@okaxis.";
    }

    setAmountError(amountMessage);
    setUpiError(upiMessage);

    if (amountMessage !== "" || upiMessage !== "") {
      return;
    }

    const result = onCashout(enteredAmount, enteredUpi);

    if (!result.ok) {
      setAmountError(result.error);
      return;
    }

    setReceipt({
      credits: enteredAmount,
      rupees: result.rupees,
    });

    setAmount("");
    setUpi("");
    setAmountError("");
    setUpiError("");
  }

  function selectAmount(value) {
    setAmount(String(value));
    setAmountError("");
    setReceipt(null);
  }

  return (
    <div>
      <section className="banner">
        <h1>Your credits</h1>
        <p>
          Track your balance and cash out the credits you earn by helping
          others.
        </p>
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
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
                setAmountError("");
                setReceipt(null);
              }}
              placeholder={`Min. ${MIN_CASHOUT}`}
              disabled={!canCashOut}
            />

            <div className="quick-amounts">
              {quickAmounts.map((value) => (
                <button
                  type="button"
                  key={value}
                  className="chip"
                  onClick={() => selectAmount(value)}
                >
                  {value}
                </button>
              ))}

              {canCashOut && (
                <button
                  type="button"
                  className="chip"
                  onClick={() => selectAmount(credits)}
                >
                  Max ({credits})
                </button>
              )}
            </div>

            {amountError && (
              <p className="error" role="alert">
                {amountError}
              </p>
            )}
          </div>

          <div className="input-box">
            <label htmlFor="upi">UPI ID</label>

            <input
              id="upi"
              name="upi"
              autoComplete="off"
              value={upi}
              onChange={(event) => {
                setUpi(event.target.value);
                setUpiError("");
                setReceipt(null);
              }}
              placeholder="yourname@okaxis"
              disabled={!canCashOut}
            />

            {upiError && (
              <p className="error" role="alert">
                {upiError}
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
    </div>
  );
}
