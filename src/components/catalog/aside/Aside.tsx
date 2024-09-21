import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import btnBack from "../../../assets/img/icons/btn-back.svg";
import styles from "./Aside.module.scss";
import {
  fetchFilterData,
  toggleCategory,
  toggleProducer,
  toggleSize,
  toggleGender,
} from "../../../features/catalog";
import { FilterType } from "../../../types/Filters";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider"; // Використовуємо бібліотеку rc-slider
import "rc-slider/assets/index.css"; // Не забудь імпортувати стилі для ползунка

const filterConfigs = [
  { type: "category" as FilterType, label: "Category" },
  { type: "producer" as FilterType, label: "Producer" },
  { type: "size" as FilterType, label: "Size" },
  { type: "gender" as FilterType, label: "Gender" },
  // Add more filters if needed
];

interface LocalSelected {
  [key: string]: Set<number>;
}

export const Aside: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openSections, setOpenSections] = useState<Record<FilterType, boolean>>(
    {
      category: true,
      producer: false,
      size: false,
      gender: false,
    }
  );

  const [localSelected, setLocalSelected] = useState<LocalSelected>({
    category: new Set(),
    producer: new Set(),
    size: new Set(),
    gender: new Set(),
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); // Стан для зберігання діапазону цін

  const [showMore, setShowMore] = useState<Record<FilterType, boolean>>({
    category: false,
    producer: false,
    size: false,
    gender: false,
  });

  useEffect(() => {
    dispatch(fetchFilterData() as any);
  }, [dispatch]);

  const {
    categories,
    producers,
    sizes,
    genders,
    selectedCategories,
    selectedProducers,
    selectedSizes,
    selectedGenders,
  } = useAppSelector((state: RootState) => state.catalog);

  useEffect(() => {
    setLocalSelected({
      category: new Set(selectedCategories),
      producer: new Set(selectedProducers),
      size: new Set(selectedSizes),
      gender: new Set(selectedGenders),
    });
  }, [selectedCategories, selectedProducers, selectedSizes, selectedGenders]);

  const updateUrl = () => {
    const queryParams = new URLSearchParams();

    Object.entries(localSelected).forEach(([filterType, ids]) => {
      ids.forEach((id) => {
        queryParams.append(filterType, id.toString());
      });
    });

    // Додаємо діапазон цін до URL
    queryParams.append("minPrice", priceRange[0].toString());
    queryParams.append("maxPrice", priceRange[1].toString());

    navigate(`?${queryParams.toString()}`);
  };

  useEffect(() => {
    updateUrl();
  }, [localSelected, priceRange, navigate]);

  const handleCheckboxChange = (type: FilterType, id: number) => {
    setLocalSelected((prev) => {
      const newSet = new Set(prev[type]);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return { ...prev, [type]: newSet };
    });

    switch (type) {
      case "category":
        dispatch(toggleCategory(id));
        break;
      case "producer":
        dispatch(toggleProducer(id));
        break;
      case "size":
        dispatch(toggleSize(id));
        break;
      case "gender":
        dispatch(toggleGender(id));
        break;
    }
  };

  const isChecked = (type: FilterType, id: number) => {
    return localSelected[type].has(id);
  };

  const toggleSection = (type: FilterType) => {
    setOpenSections((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const getItems = (type: FilterType) => {
    switch (type) {
      case "category":
        return categories;
      case "producer":
        return producers;
      case "size":
        return sizes;
      case "gender":
        return genders;
      default:
        return [];
    }
  };

  const handleShowMoreClick = (type: FilterType) => {
    setShowMore((prev) => ({ ...prev, [type]: true }));
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
            max={1000}
            value={priceRange}
            onChange={(value) => setPriceRange(value as [number, number])}
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
                <li className={styles.checkbox} key={item.id}>
                  <input
                    type="checkbox"
                    className={styles.checkbox__index}
                    checked={isChecked(type, item.id)}
                    onChange={() => handleCheckboxChange(type, item.id)}
                  />
                  <label className={styles.checkbox__label} htmlFor={item.name}>
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
