import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import btnBack from "../../../assets/img/icons/btn-back.svg";
import styles from "./Aside.module.scss";
import { fetchFilterData } from "../../../features/catalog";
import { FilterType } from "../../../types/Filters";
import classNames from "classnames";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { updateUrlWithFiltersAndPrice } from "../../../helpers/updateUrlWithParams";
import { useNavigate } from "react-router-dom";
import {
  setPriceRange,
  toggleCategory,
  toggleGender,
  toggleProducer,
  toggleSize,
} from "../../../features/params";

const filterConfigs = [
  { type: "categoryIds" as FilterType, label: "Category" },
  { type: "producerIds" as FilterType, label: "Producer" },
  { type: "sizeIds" as FilterType, label: "Size" },
  { type: "genderIds" as FilterType, label: "Gender" },
];

export const Aside: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openSections, setOpenSections] = useState<Record<FilterType, boolean>>(
    {
      categoryIds: true,
      producerIds: false,
      sizeIds: false,
      genderIds: false,
    }
  );

  const [showMore, setShowMore] = useState<Record<FilterType, boolean>>({
    categoryIds: false,
    producerIds: false,
    sizeIds: false,
    genderIds: false,
  });

  useEffect(() => {
    dispatch(fetchFilterData() as any);
  }, [dispatch]);

  const { categories, producers, sizes, genders } = useAppSelector(
    (state: RootState) => state.catalog
  );

  const {
    selectedCategories,
    selectedProducers,
    selectedSizes,
    selectedGenders,
    priceRange,
    selectedSort,
    currentPage,
  } = useAppSelector((state: RootState) => state.params);

  const selectedFilters = useMemo(
    () => ({
      categoryIds: [...selectedCategories],
      producerIds: [...selectedProducers],
      sizeIds: [...selectedSizes],
      genderIds: [...selectedGenders],
    }),
    [selectedCategories, selectedProducers, selectedSizes, selectedGenders]
  );

  useEffect(() => {
    updateUrlWithFiltersAndPrice(
      navigate,
      selectedFilters,
      priceRange,
      selectedSort,
      currentPage
    );
  }, [selectedFilters, priceRange, navigate, selectedSort]);

  const handleCheckboxChange = (type: FilterType, id: number) => {
    switch (type) {
      case "categoryIds":
        dispatch(toggleCategory(id));
        break;
      case "producerIds":
        dispatch(toggleProducer(id));
        break;
      case "sizeIds":
        dispatch(toggleSize(id));
        break;
      case "genderIds":
        dispatch(toggleGender(id));
        break;
    }
  };

  const isChecked = (type: FilterType, id: number) => {
    return selectedFilters[type].includes(id);
  };

  const toggleSection = (type: FilterType) => {
    setOpenSections((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const getItems = (type: FilterType) => {
    switch (type) {
      case "categoryIds":
        return categories;
      case "producerIds":
        return producers;
      case "sizeIds":
        return sizes;
      case "genderIds":
        return genders;
      default:
        return [];
    }
  };

  const handleShowMoreClick = (type: FilterType) => {
    setShowMore((prev) => ({ ...prev, [type]: true }));
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    dispatch(setPriceRange(value));
  };
  return (
    <aside className={styles.aside}>
      <div className={classNames(styles.aside__filter, styles.filter)}>
        <div
          className={classNames(styles.filter__spoiler)}
          onClick={() => toggleSection("priceRange" as FilterType)}
        >
          <h3 className={styles.filter__title}>Price Range</h3>
          <img
            className={classNames(styles.filter__arrow, {
              [styles.open]: openSections["priceRange" as FilterType],
            })}
            src={btnBack}
            alt="btn-back"
          />
        </div>

        <div
          className={classNames(styles.filter__content, {
            [styles.open]: openSections["priceRange" as FilterType],
          })}
        >
          <Slider
            range
            min={0}
            max={10000}
            value={priceRange}
            onChange={(value) =>
              handlePriceRangeChange(value as [number, number])
            }
            className={styles.filter__slider}
          />
          <div className={styles.filter__priceLabels}>
            <span>${priceRange[0]}</span> - <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {filterConfigs.map(({ type, label }) => {
        const items = getItems(type);
        const isOpen = openSections[type];
        const itemsToShow = showMore[type] ? items : items.slice(0, 4);

        return (
          <div
            className={classNames(styles.aside__filter, styles.filter)}
            key={type}
          >
            <div
              className={classNames(styles.filter__spoiler)}
              onClick={() => toggleSection(type)}
            >
              <h3 className={styles.filter__title}>{label}</h3>
              <img
                className={classNames(styles.filter__arrow, {
                  [styles.open]: isOpen,
                })}
                src={btnBack}
                alt="btn-back"
              />
            </div>

            <ul
              className={classNames(styles.filter__content, {
                [styles.open]: isOpen,
              })}
            >
              {itemsToShow.map((item) => (
                <li className="checkbox" key={item.id}>
                  <input
                    type="checkbox"
                    className="checkbox__index"
                    checked={isChecked(type, item.id)}
                    onChange={() => handleCheckboxChange(type, item.id)}
                    id={`checkbox-${item.id}`}
                  />
                  <label
                    className="checkbox__label"
                    htmlFor={`checkbox-${item.id}`}
                  >
                    {item.name}
                  </label>
                </li>
              ))}

              {items.length > 4 && !showMore[type] && (
                <button
                  onClick={() => handleShowMoreClick(type)}
                  className={styles.filter__showMoreButton}
                >
                  Show more
                </button>
              )}
            </ul>
          </div>
        );
      })}
    </aside>
  );
};
