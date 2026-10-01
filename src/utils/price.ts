/** Extracts the number from strings like "$29.99" or "Total: $32.39". */
export function parsePrice(text: string): number {
  const match = text.match(/\$(\d+(?:\.\d+)?)/);
  if (!match) throw new Error(`No price found in "${text}"`);
  return Number(match[1]);
}
