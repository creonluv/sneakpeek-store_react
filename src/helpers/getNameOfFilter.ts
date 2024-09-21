export const getNameById = (
  id: number,
  items: { id: number; name: string }[],
  defaultName: string
): string => {
  return items.find((item) => item.id === id)?.name || defaultName;
};

export const getIdByName = (
  name: string,
  items: { id: number; name: string }[]
): number | undefined => {
  const item = items.find((item) => item.name === name);

  return item ? item.id : undefined;
};

export const getFilterIdsFromUrl = (
  names: string[],
  items: { id: number; name: string }[]
) => {
  return names
    .map((name) => getIdByName(name, items))
    .filter((id): id is number => id !== undefined);
};
