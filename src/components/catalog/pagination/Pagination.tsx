import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import styles from "./Pagination.module.scss";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../features/params";
import { updateUrlWithFiltersAndPrice } from "../../../helpers/updateUrlWithParams";
import { useNavigate } from "react-router-dom";

export const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useAppSelector(
    (state: RootState) => state.catalogProducts
  );

  const {
    selectedCategories,
    selectedProducers,
    selectedSizes,
    selectedGenders,
    selectedSort,
    priceRange,
    currentPage,
  } = useAppSelector((state: RootState) => state.params);

  const handlePageChange = (page: string | number) => {
    const numericPage = typeof page === "number" ? page : Number(page);

    dispatch(setCurrentPage(numericPage));

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
      selectedSort,
      numericPage
    );
  };

  const renderPageNumbers = () => {
    const totalPages = products.totalPages;
    const maxVisiblePages = 5;

    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      pageNumbers.push(1); // Перша сторінка завжди додається

      if (startPage > 2) {
        pageNumbers.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages); // Остання сторінка завжди додається
    }

    return pageNumbers.map((page, index) => {
      if (page === "...") {
        return (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
          className={`${styles.pageButton} ${
            currentPage === page ? styles.currentPage : ""
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return <div className={styles.pagination}>{renderPageNumbers()}</div>;
};
