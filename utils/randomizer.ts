export function generateRandomUsername(base: string): string {
    const randomSuffix = Math.random().toString(36).substring(2, 8); // Generate a random alphanumeric string
    return `${base}${randomSuffix}`;
  }