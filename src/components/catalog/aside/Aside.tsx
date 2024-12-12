import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import Slider from "rc-slider";

import { useAsideContext } from "../../../context/AsideContext";

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
import close from "../../../assets/img/icons/close.svg";

import "./Aside.scss";
import "rc-slider/assets/index.css";

export const Aside: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isAside, closeAside } = useAsideContext();

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
    <aside className={`aside ${isAside ? "_active" : ""}`}>
      <div className="aside__title-block">
        <h2 className="aside__title title-3">{t("components.catalog.aside.filter")}</h2>
        <img className="aside__close" src={close} onClick={closeAside} />
      </div>
      <div className={`aside__filter filter spoiler ${openSections["priceRange" as FilterType] ? "_active" : ""}`}>
        <div
          className="filter__title-block spoiler__header"
          onClick={() => toggleSection("priceRange" as FilterType)}
        >
          <h2 className="filter__title title-3">
            {t("components.catalog.aside.priceRange")}
          </h2>
          <img
            className="filter__arrow"
            src={btnBack}
            alt="btn-back"
          />
        </div>
        <div
          className="spoiler__content"
        >
          <Slider
            range
            min={0}
            max={10000}
            value={priceRange}
            onChange={(value) =>
              handlePriceRangeChange(value as [number, number])
            }
            className="filter__slider"
          />
          <div className="filter__priceLabels">
            <span>${priceRange[0]}</span> - <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
      {filterConfigs.map(({ type, label }) => {
        const items = getItems(type);
        const isOpen = openSections[type];
        const itemsToShow = showMore[type] ? items : items.slice(0, 4);

        return (
          <div className={`aside__filter filter spoiler ${isOpen ? "_active" : ""}`} key={type}>
            <div
              className="filter__title-block spoiler__header"
              onClick={() => toggleSection(type)}
            >
              <p className="filter__title">{label}</p>
              <img
                className="filter__arrow"
                src={btnBack}
                alt="btn-back"
              />
            </div>
            <ul className="spoiler__content">
              {itemsToShow.map((item) => (
                <li className="filter__item checkbox" key={item.id}>
                  <input
                    type="checkbox"
                    className="checkbox__index"
                    checked={isChecked(type, item.id)}
                    onChange={() => handleCheckboxChange(type, item.id)}
                    id={`checkbox-${item.id}`}
                  />
                  <label className="checkbox__label" htmlFor={`checkbox-${item.id}`}>
                    {item.name}
                  </label>
                </li>
              ))}
              {items.length > 4 && !showMore[type] && (
                <div className="filter__item showmore-wrapper">
                  <button
                    onClick={() => handleShowMoreClick(type)}
                    className="showmore"
                  >
                    {t("components.catalog.aside.showMore")}
                  </button>
                </div>
              )}
            </ul>
          </div>
        );
      })}
      {isAside &&
        <div className="aside__button button-wrapper">
          <button
            className="button button_lg button_default button_full-size"
            onClick={closeAside}
          >
            <span>{t("components.catalog.aside.apply")}</span>
          </button>
        </div>
      }
    </aside>
  );
};
