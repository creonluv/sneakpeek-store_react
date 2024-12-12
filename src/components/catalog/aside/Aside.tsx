import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import classNames from "classnames";
import Slider from "rc-slider";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { fetchFilterData } from "../../../features/catalog";
import {
  setPriceRange,
  toggleCategory,
  toggleGender,
  toggleProducer,
  toggleSize,
} from "../../../features/params";

import { updateUrlWithFiltersAndPrice } from "../../../helpers/updateUrlWithParams";

import { FilterType } from "../../../types/Filters";

import btnBack from "../../../assets/img/icons/btn-back.svg";

import styles from "./Aside.module.scss";
import "rc-slider/assets/index.css";

export const Aside: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    selectedCategories,
    selectedProducers,
    selectedSizes,
    selectedGenders,
    priceRange,
    selectedSort,
    currentPage,
    name,
  } = useAppSelector((state: RootState) => state.params);

  const { categories, producers, sizes, genders } = useAppSelector(
    (state: RootState) => state.catalog
  );

  const selectedFilters = useMemo(
    () => ({
      categoryIds: [...selectedCategories],
      producerIds: [...selectedProducers],
      sizeIds: [...selectedSizes],
      genderIds: [...selectedGenders],
    }),
    [selectedCategories, selectedProducers, selectedSizes, selectedGenders]
  );

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

  const filterConfigs = [
    {
      type: "categoryIds" as FilterType,
      label: t("components.catalog.aside.category"),
    },
    {
      type: "producerIds" as FilterType,
      label: t("components.catalog.aside.producer"),
    },
    {
      type: "sizeIds" as FilterType,
      label: t("components.catalog.aside.size"),
    },
    {
      type: "genderIds" as FilterType,
      label: t("components.catalog.aside.gender"),
    },
  ];

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

  useEffect(() => {
    dispatch(fetchFilterData() as any);
  }, [dispatch]);

  useEffect(() => {
    updateUrlWithFiltersAndPrice(
      navigate,
      selectedFilters,
      priceRange,
      selectedSort,
      currentPage,
      true,
      name
    );
  }, [selectedFilters, priceRange, navigate, selectedSort]);

  return (
    <aside className={styles.aside}>
      <div className={classNames(styles.aside__filter, styles.filter)}>
        <div
          className={classNames(styles.filter__spoiler)}
          onClick={() => toggleSection("priceRange" as FilterType)}
        >
          <p className={`${styles.filter__title} title-3`}>
            {t("components.catalog.aside.priceRange")}
          </p>
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
              <p className={styles.filter__title}>{label}</p>
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
                <li className={styles.checkbox} key={item.id}>
                  <label className={styles.checkbox__label}>
                    <input
                      type="checkbox"
                      className={styles.checkbox__index}
                      checked={isChecked(type, item.id)}
                      onChange={() => handleCheckboxChange(type, item.id)}
                      id={`checkbox-${item.id}`}
                    />
                    {item.name}
                  </label>
                </li>
              ))}
              {items.length > 4 && !showMore[type] && (
                <button
                  onClick={() => handleShowMoreClick(type)}
                  className={styles.filter__showMoreButton}
                >
                  {t("components.catalog.aside.showMore")}
                </button>
              )}
            </ul>
          </div>
        );
      })}
    </aside>
  );
};
