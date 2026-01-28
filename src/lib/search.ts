export function searchByTitle<T extends { title: string }>(
  items: T[],
  query: string
): T[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase();

  return items.filter((item) => item.title.toLowerCase().includes(q));
}
