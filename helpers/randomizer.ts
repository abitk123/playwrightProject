export function generateRandomUsername(base: string): string {
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    return `${base}${randomSuffix}`;
  }


