import { SortOptions } from "../types/SortOptions";

export const updateUrlWithFiltersAndPrice = (
  navigate: any,
  filters: { [key: string]: number[] },
  priceRange: [number, number] | null,
  sortOption: SortOptions | null,
  currentPage: number,
  resetPage: boolean = false,
  isNew: boolean = false,
  onDiscount: boolean = false
) => {
  const params = new URLSearchParams(window.location.search);

  console.log(isNew);

  Object.keys(filters).forEach((key) => {
    params.delete(key);
  });

  Object.entries(filters).forEach(([key, values]) => {
    values.forEach((value) => {
      params.append(key, value.toString());
    });
  });

  if (priceRange) {
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
  } else {
    params.delete("minPrice");
    params.delete("maxPrice");
  }

  if (sortOption) {
    params.set("sortField", sortOption.sortField);
    params.set("sortOrder", sortOption.sortOrder);
  } else {
    params.delete("sortField");
    params.delete("sortOrder");
  }

  if (isNew) {
    console.log(params);

    params.set("isNew", isNew.toString());
  } else {
    params.delete("isNew");
  }

  if (onDiscount) {
    params.set("onDiscount", onDiscount.toString());
  } else {
    params.delete("onDiscount");
  }

  params.set("page", resetPage ? "1" : currentPage.toString());

  navigate(`?${params.toString()}`);
};
