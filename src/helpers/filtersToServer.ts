import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

const {
  selectedCategories,
  selectedProducers,
  selectedSizes,
  selectedGenders,
  priceRange,
  selectedSort,
} = useAppSelector((state: RootState) => state.params);

export const filtersToServer = {
  categoryIds: [...selectedCategories],
  producerIds: [...selectedProducers],
  sizeIds: [...selectedSizes],
  genderIds: [...selectedGenders],
  minPrice: priceRange[0],
  maxPrice: priceRange[1],
  sortField: selectedSort.sort_field,
  sortOrder: selectedSort.sort_order,
};
