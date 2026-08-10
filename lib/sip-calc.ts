/**
 * Result of a standard SIP investment calculation.
 */
export interface SipCalculationResult {
  totalInvested: number;
  estimatedReturns: number;
  totalValue: number;
}

/**
 * Result of a Target Goal calculation.
 */
export interface GoalCalculationResult {
  requiredMonthlySIP: number;
  lumpSumInvestment: number;
  lumpSumFV: number;
  totalSipInvested: number;
  totalInvested: number;
  achievedValue: number;
  estimatedReturns: number;
}

/**
 * Calculates future value and estimated returns for regular monthly SIPs.
 */
export function calculateSIP(
  monthlyInvestment: number,
  years: number,
  expectedReturnRate: number
): SipCalculationResult {
  const monthlyRate = expectedReturnRate / 12 / 100;
  const totalMonths = years * 12;
  const totalInvested = monthlyInvestment * totalMonths;

  // FV = P × [((1 + r)^n - 1) / r] × (1 + r)
  const futureValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
    (1 + monthlyRate);

  const estimatedReturns = futureValue - totalInvested;

  return {
    totalInvested: Math.round(totalInvested),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(futureValue),
  };
}

/**
 * Calculates required monthly SIP savings to reach a target goal amount.
 */
export function calculateGoalSIP(
  targetGoalAmount: number,
  lumpSumInvestment: number,
  years: number,
  expectedReturnRate: number
): GoalCalculationResult {
  const monthlyRate = expectedReturnRate / 12 / 100;
  const totalMonths = years * 12;

  // 1. Future Value of Initial Lump Sum: FV_lump = L * (1 + r)^n
  const lumpSumFV = lumpSumInvestment * Math.pow(1 + monthlyRate, totalMonths);

  // 2. Remaining goal target after lump sum growth
  const remainingGoal = Math.max(0, targetGoalAmount - lumpSumFV);

  // 3. Compounding annuity factor for ₹1 monthly SIP
  const sipFactor =
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);

  // 4. Required monthly SIP to cover the remaining goal
  const requiredMonthlySIP = remainingGoal > 0 ? Math.ceil(remainingGoal / sipFactor) : 0;

  // 5. Total SIP investment breakdown
  const totalSipInvested = requiredMonthlySIP * totalMonths;
  const totalInvested = Math.round(lumpSumInvestment + totalSipInvested);

  // 6. Total achieved wealth and compound interest gains
  const achievedValue = Math.round(lumpSumFV + requiredMonthlySIP * sipFactor);
  const estimatedReturns = Math.max(0, achievedValue - totalInvested);

  return {
    requiredMonthlySIP,
    lumpSumInvestment: Math.round(lumpSumInvestment),
    lumpSumFV: Math.round(lumpSumFV),
    totalSipInvested: Math.round(totalSipInvested),
    totalInvested,
    achievedValue,
    estimatedReturns,
  };
}
