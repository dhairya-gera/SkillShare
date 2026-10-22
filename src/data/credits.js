// All credit rules in ONE place (used by App, Credits page and How It Works page)
export const STARTING_CREDITS = 200;
export const HELP_COST = 20; // credits spent to take help
export const HELP_REWARD = 10; // credits earned for offering help

export const CREDIT_TO_RUPEES = 0.5; // 1 credit = ₹0.50
export const MIN_CASHOUT = 50; // minimum credits per cash-out

export function creditsToRupees(credits) {
  return credits * CREDIT_TO_RUPEES;
}

export function formatRupees(amount) {
  return `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

// "dhairya@okaxis" -> "dh****@okaxis" (never show the full UPI ID in history)
export function maskUpi(upiId) {
  const [name, bank] = upiId.split("@");
  return `${name.slice(0, 2)}****@${bank}`;
}
