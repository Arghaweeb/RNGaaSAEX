// Random Number Generator Service
// Provides various random number generation algorithms

interface RandomServiceStatus {
  status: 'active' | 'inactive';
  algorithm: string;
  requestsServed: number;
  uptime: string;
}

interface RandomNumberOptions {
  min?: number;
  max?: number;
  count?: number;
  algorithm?: 'standard' | 'crypto' | 'gaussian';
}

// Service state
let requestCount = 0;
const serviceStartTime = Date.now();

/**
 * Get the current status of the random service
 */
export function getStatus(): RandomServiceStatus {
  const uptimeMs = Date.now() - serviceStartTime;
  const uptimeMinutes = Math.floor(uptimeMs / 60000);

  return {
    status: 'active',
    algorithm: 'standard',
    requestsServed: requestCount,
    uptime: `${uptimeMinutes} minutes`,
  };
}

/**
 * Generate random number(s) using the specified algorithm
 */
export function generateRandom(options: RandomNumberOptions = {}): number | number[] {
  const {
    min = 0,
    max = 100,
    count = 1,
    algorithm = 'standard',
  } = options;

  requestCount++;

  if (count === 1) {
    return generateSingleRandom(min, max, algorithm);
  }

  return Array.from({ length: count }, () => generateSingleRandom(min, max, algorithm));
}

/**
 * Generate a single random number
 */
function generateSingleRandom(min: number, max: number, algorithm: string): number {
  switch (algorithm) {
    case 'crypto':
      return generateCryptoRandom(min, max);
    case 'gaussian':
      return generateGaussianRandom(min, max);
    case 'standard':
    default:
      return generateStandardRandom(min, max);
  }
}

/**
 * Standard random number generation using Math.random()
 */
function generateStandardRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Cryptographically secure random number generation
 */
function generateCryptoRandom(min: number, max: number): number {
  const range = max - min + 1;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8);
  const maxValue = Math.pow(256, bytesNeeded);
  const randomBytes = new Uint8Array(bytesNeeded);

  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(randomBytes);
    let randomValue = 0;
    for (let i = 0; i < bytesNeeded; i++) {
      randomValue = randomValue * 256 + randomBytes[i];
    }
    return (randomValue % range) + min;
  }

  // Fallback to standard random if crypto is not available
  return generateStandardRandom(min, max);
}

/**
 * Gaussian (normal) distribution random number generation
 * Uses Box-Muller transform
 */
function generateGaussianRandom(min: number, max: number): number {
  const mean = (min + max) / 2;
  const stdDev = (max - min) / 6; // 99.7% of values will be within range

  let u1 = Math.random();
  let u2 = Math.random();

  // Ensure u1 is not 0 to avoid log(0)
  while (u1 === 0) u1 = Math.random();

  // Box-Muller transform
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  const value = z0 * stdDev + mean;

  // Clamp to range
  return Math.round(Math.max(min, Math.min(max, value)));
}

/**
 * Initialize the random service
 */
export function initService(): { success: boolean; message: string } {
  requestCount = 0;
  return {
    success: true,
    message: 'Random service initialized successfully',
  };
}
