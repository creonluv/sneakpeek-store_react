export const getNameById = (
  id: number,
  items: { id: number; name: string }[],
  defaultName: string
): string => {
  return items.find((item) => item.id === id)?.name || defaultName;
};
