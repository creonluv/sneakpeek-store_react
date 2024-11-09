import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import styles from "./Pagination.module.scss";
import { setCurrentPage } from "../../../features/params";
import { updateUrlWithFiltersAndPrice } from "../../../helpers/updateUrlWithParams";
import { useNavigate, useLocation } from "react-router-dom";

export const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = params.get("page");
    const page = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;

    if (page !== currentPage) {
      dispatch(setCurrentPage(page));
    }
  }, [location.search, dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      dispatch(setCurrentPage(page));

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
        page
      );
    }
  };

  const renderPageNumbers = () => {
    const totalPages = products.totalPages;
    const maxVisiblePages = 5;

    const pageNumbers: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      pageNumbers.push(1);

      if (startPage > 2) {
        pageNumbers.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
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
          onClick={() => handlePageChange(page as number)}
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
