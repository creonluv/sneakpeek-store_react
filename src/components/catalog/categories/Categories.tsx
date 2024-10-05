import React from "react";
import { RootState } from "../../../app/store";
import styles from "./Categories.module.scss";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { getNameById } from "../../../helpers/getNameOfFilter";
import { updateUrlWithFiltersAndPrice } from "../../../helpers/updateUrlWithParams";
import { useNavigate } from "react-router-dom";
import {
  setFiltersFromUrl,
  toggleCategory,
  toggleGender,
  toggleProducer,
  toggleSize,
  toggleSort,
} from "../../../features/params";
import { sortDiff } from "../../../helpers/sortDiff";
import { FilterType } from "../../../types/Filters";
import { useAsideContext } from "../../../context/AsideContext";
import aside from "../../../assets/img/icons/aside.svg";

export const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { categories, producers, sizes, genders } = useAppSelector(
    (state: RootState) => state.catalog
  );

  const { toggleAside } = useAsideContext();

  const {
    selectedCategories,
    selectedProducers,
    selectedSizes,
    selectedGenders,
    selectedSort,
    priceRange,
    currentPage,
  } = useAppSelector((state: RootState) => state.params);

  const selectedItems = [
    ...selectedCategories.map((id) => ({
      id,
      name: getNameById(id, categories, "Unknown Category"),
      type: "categoryIds" as FilterType,
    })),
    ...selectedProducers.map((id) => ({
      id,
      name: getNameById(id, producers, "Unknown Producer"),
      type: "producerIds" as FilterType,
    })),
    ...selectedSizes.map((id) => ({
      id,
      name: getNameById(id, sizes, "Unknown Size"),
      type: "sizeIds" as FilterType,
    })),
    ...selectedGenders.map((id) => ({
      id,
      name: getNameById(id, genders, "Unknown Gender"),
      type: "genderIds" as FilterType,
    })),
  ];

  const handleRemoveItem = (id: number, type: FilterType) => {
    const actions = {
      categoryIds: toggleCategory,
      producerIds: toggleProducer,
      sizeIds: toggleSize,
      genderIds: toggleGender,
      priceRange: toggleGender,
    };

    dispatch(actions[type](id));

    const selectedFilters = {
      categoryIds: selectedCategories.filter((catId) =>
        type === "categoryIds" ? catId !== id : catId
      ),
      producerIds: selectedProducers.filter((prodId) =>
        type === "producerIds" ? prodId !== id : prodId
      ),
      sizeIds: selectedSizes.filter((sizeId) =>
        type === "sizeIds" ? sizeId !== id : sizeId
      ),
      genderIds: selectedGenders.filter((genderId) =>
        type === "genderIds" ? genderId !== id : genderId
      ),
    };

    updateUrlWithFiltersAndPrice(
      navigate,
      selectedFilters,
      priceRange,
      selectedSort,
      currentPage
    );
  };

  const handleResetAll = () => {
    dispatch(
      setFiltersFromUrl({
        categoriesIds: [],
        producersIds: [],
        sizesIds: [],
        gendersIds: [],
      })
    );
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = sortDiff[selectedIndex];

    dispatch(toggleSort(selectedOption));

    const selectedFilters = {
      categoryIds: selectedCategories,
      producerIds: selectedProducers,
      sizeIds: selectedSizes,
      genderIds: selectedGenders,
    };

    updateUrlWithFiltersAndPrice(
      navigate,
      selectedFilters,
      priceRange,
      selectedOption,
      currentPage
    );
  };

  return (
    <div className={styles.categories}>
      <div className={styles.categories__left}>
        <ul className={styles.categories__chips}>
          {selectedItems.map(({ id, name, type }) => (
            <li className={styles.categories__chip} key={`${type}-${id}`}>
              {name}
              <button onClick={() => handleRemoveItem(id, type)}>x</button>
            </li>
          ))}
        </ul>

        {selectedItems.length > 0 && (
          <button className={styles.resetButton} onClick={handleResetAll}>
            Reset all settings
          </button>
        )}
      </div>
      <div className={styles.categories__right}>
        <select
          className={styles.products__options}
          onChange={handleSortChange}
          value={`${selectedSort.sortField} ${selectedSort.sortOrder}`}
        >
          {sortDiff.map((item, index) => (
            <option
              className={styles.products__option}
              key={index}
              value={`${item.sortField} ${item.sortOrder}`}
            >
              Sort by {item.sortField} {item.sortOrder}
            </option>
          ))}
        </select>

        <button
          onClick={toggleAside}
          className={styles.categories__toggleAsideButton}
        >
          <img src={aside} alt="Toggle Aside" />{" "}
        </button>
      </div>
    </div>
  );
};
