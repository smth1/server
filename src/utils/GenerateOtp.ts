export function generateOtp(length: number): number {
  const min = Math.pow(10, length - 1); // Minimum value based on length
  const max = Math.pow(10, length) - 1; // Maximum value based on length
  return Number(Math.floor(min + Math.random() * (max - min + 1))); // Generate OTP within range
}