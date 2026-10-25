export const STARTING_CREDITS = 200;
export const HELP_COST = 20;
export const HELP_REWARD = 10;

export const CREDIT_TO_RUPEES = 0.5;
export const MIN_CASHOUT = 50;

export function creditsToRupees(credits) {
  return credits * CREDIT_TO_RUPEES;
}

export function formatRupees(amount) {
  return `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function maskUpi(upiId) {
  const [name, bank] = upiId.split("@");
  return `${name.slice(0, 2)}****@${bank}`;
}
