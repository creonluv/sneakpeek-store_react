import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { debounce } from "lodash";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchAllProducts } from "../../features/products";
import {
  deleteItemInBucket,
  fetchBucket,
  updateItemInBucket,
} from "../../features/bucket";

import { useAuthContext } from "../../context/AuthContext";
import { useModalContext } from "../../context/ModalContext";

import { ProductSlider } from "../../components/product-slider";
import { Loader } from "../../components/loader";

import { CartItem, UpdateItemInBucketPayload } from "../../types/Bucket";

import arrowWhite from "../../assets/img/icons/arrow-white.svg";
import del from "../../assets/img/icons/del.svg";

import "./BucketPage.scss";
import { applyPromocode, deletePromocode } from "../../api/promocode";

export const BucketPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [, setMessageCounter] = useState(0);
  const [wasModalShown, setWasModalShown] = useState(false);
  const [promoValue, setPromoValue] = useState("");

  const { products } = useAppSelector((state: RootState) => state.products);
  const { bucket, loading, messages } = useAppSelector(
    (state: RootState) => state.bucket
  );
  const { isAuth } = useAuthContext();
  const { showModal } = useModalContext();

  const debouncedUpdateItemInBucket = debounce((dispatch, payload) => {
    dispatch(updateItemInBucket(payload));
  }, 500);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchBucket());
      dispatch(fetchAllProducts());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!loading && messages && !wasModalShown) {
      showModal(messages);
      setWasModalShown(true);

      const timer = setTimeout(() => {
        setWasModalShown(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [messages, loading, wasModalShown, showModal]);

  useEffect(() => {
    if (messages) {
      setMessageCounter((prev) => prev + 1);
      setWasModalShown(false);
    }
  }, [messages]);

  const handleCounter = useCallback(
    (product: CartItem, isIncrement: boolean) => {
      if (!bucket?.id) return;

      const quantity = product.quantity + (isIncrement ? 1 : -1);
      if (quantity <= 0) return;

      const itemToUpdate: UpdateItemInBucketPayload = {
        id: product.id,
        cart_id: bucket.id,
        product_instance_id: product.product_instance.id,
        quantity,
      };

      debouncedUpdateItemInBucket(dispatch, itemToUpdate);
    },
    [bucket, dispatch]
  );

  const handleDeleteItem = useCallback(
    (id: number) => {
      dispatch(deleteItemInBucket(id));
    },
    [dispatch]
  );

  const handleChangePromoInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPromoValue(e.target.value);
  };

  const calculateTotalPrice = useCallback((cartItems: CartItem[]) => {
    return cartItems
      .reduce((total, item) => {
        const quantity = item.quantity || 0;
        const finalPrice = item.product_instance.product.current_discount
          ? item.product_instance?.product?.final_price
          : item.product_instance.product.price;
        return total + quantity * finalPrice;
      }, 0)
      .toFixed(2);
  }, []);

  const totalPrice = calculateTotalPrice(bucket?.cart_items || []);

  const applyPromoCode = async () => {
    if (!bucket?.id) {
      console.error("Bucket ID is missing");
      return;
    }

    const data = {
      cart_id: bucket?.id,
      promo_code: promoValue,
    };

    try {
      const result = await applyPromocode(data);
      dispatch(fetchBucket());
      return result;
    } catch (error) {
      console.error("Error applying promo code:", error);
    }
  };

  const deletePromoCode = async () => {
    if (!bucket?.id) {
      console.error("Bucket ID is missing");
      return;
    }

    try {
      const result = await deletePromocode(bucket?.id);
      dispatch(fetchBucket());
      setPromoValue("");
      return result;
    } catch (error) {
      console.error("Error deleting promo code:", error);
    }
  };

  const hasAppliedPromo = bucket?.applied_promo_code || false;

  return (
    <section className="bucket">
      <div className="bucket__container">
        <div className="bucket__body">
          <div className="bucket__header">
            <h1 className="bucket__title title-3">{t("pages.bucket.title")}</h1>
            <span className="bucket__subtitle title-5">
              {bucket?.cart_items.length}
            </span>
          </div>

          <div className="bucket__box">
            <div className="bucket__left">
              <div className="bucket__items">
                {bucket?.cart_items.map((item, index) => {
                  console.log(item);

                  return (
                    <div key={item.id} className="bucket__item">
                      <div className="bucket__loader">
                        {loading && <Loader />}
                      </div>

                      <Link
                        key={item.id}
                        className="bucket__itemLeft"
                        to={`/product/${item.product_instance.product.id}`}
                      >
                        <img
                          className="bucket__img"
                          src={`https://localhost:9091/api/images/${item.product_instance.product.main_photo_id}`}
                          alt=""
                        />
                      </Link>

                      <div className="bucket__itemRight">
                        <div className="bucket__itemRightMain">
                          <div className="bucket__itemTop">
                            <div className="bucket__titles">
                              <span className="bucket__subtitle title-5">
                                {item.product_instance.product.producer.name}
                              </span>

                              <Link
                                key={item.id}
                                className="bucket__link"
                                to={`/product/${item.product_instance.product.id}`}
                              >
                                <h2 className="bucket__title title-3">
                                  {item.product_instance.product.name}
                                </h2>
                              </Link>
                            </div>
                          </div>

                          <p className="bucket__gender title-4">
                            {item.product_instance.product.gender.name}
                          </p>

                          <div className="bucket__sizes">
                            <span className="bucket__sizeTitle text-muted">
                              Size:
                            </span>
                            <p>{item.product_instance.size.name}</p>
                          </div>
                        </div>

                        <p className="bucket__price title-3">
                          {item.product_instance.product.final_price ? (
                            <>
                              <span className="card__price--old">
                                {Number.isInteger(
                                  item.product_instance.product.price
                                )
                                  ? item.product_instance.product.price
                                  : item.product_instance.product.price.toFixed(
                                      2
                                    )}
                                ₴
                              </span>
                              <span className="bucket__price--discount">
                                {Number.isInteger(
                                  item.product_instance.product.final_price
                                )
                                  ? item.product_instance.product.final_price
                                  : item.product_instance.product.final_price.toFixed(
                                      2
                                    )}
                                ₴
                              </span>
                            </>
                          ) : (
                            <span>
                              {item.product_instance.product.price
                                ? Number.isInteger(
                                    item.product_instance.product.price
                                  )
                                  ? item.product_instance.product.price
                                  : item.product_instance.product.price.toFixed(
                                      2
                                    )
                                : "N/A"}
                              ₴
                            </span>
                          )}
                        </p>

                        <div className="bucket__bottomItem">
                          <div className="bucket__counter">
                            <button
                              className="bucket__counterButton"
                              onClick={() => handleCounter(item, false)}
                              disabled={item.quantity === 1}
                            >
                              -
                            </button>
                            <p className="bucket__sizes">{item.quantity}</p>
                            <button
                              className="bucket__counterButton"
                              onClick={() => handleCounter(item, true)}
                              disabled={
                                item.quantity ===
                                bucket?.cart_items[index]?.product_instance
                                  .present
                              }
                            >
                              +
                            </button>
                          </div>

                          <div className="bucket__icons">
                            <button
                              className="bucket__buttonBottom"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <img
                                className="bucket__icon"
                                src={del}
                                alt="del"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bucket__subtotal">
                <p className="bucket__title title-3">
                  {t("pages.bucket.subtotal")}
                </p>
                <p className="bucket__price title-3">${totalPrice}</p>
              </div>
            </div>

            <div className="bucket__right">
              <div className="bucket__card">
                <h2 className="bucket__title title-3">
                  {t("pages.bucket.summary")}
                </h2>

                <div className="bucket__main">
                  <div className="bucket__middle">
                    <div className="form-sale__item">
                      <input
                        className="form-sale__input text-muted"
                        type="text"
                        name="promo"
                        placeholder="Enter promocode"
                        value={
                          bucket?.applied_promo_code?.code
                            ? bucket.applied_promo_code.code
                            : promoValue
                        }
                        onChange={handleChangePromoInput}
                      />
                      <button
                        className="form-sale__button"
                        onClick={
                          hasAppliedPromo ? deletePromoCode : applyPromoCode
                        }
                      >
                        {hasAppliedPromo ? "x" : t("components.sale.button")}
                      </button>
                    </div>

                    <div className="bucket__info">
                      <p className="bucket__infoKey text-muted">
                        {bucket?.cart_items.length} {t("pages.bucket.items")}
                      </p>
                      <p className="bucket__infoValue">${totalPrice}</p>
                    </div>
                  </div>

                  <hr className="bucket__line" />

                  <div className="bucket__bottom">
                    <div className="bucket__total">
                      <p className="bucket__price title-3">
                        {t("pages.bucket.total")}
                      </p>
                      <p className="bucket__price title-3">${totalPrice}</p>
                    </div>

                    <div className="button-wrapper">
                      <button
                        className="button button_lg button_default button_full-size"
                        type="submit"
                        onClick={() => navigate("/checkout")}
                      >
                        <span>{t("pages.bucket.button")}</span>
                        <img className="icon-arrow" src={arrowWhite} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bucket__slider">
              <ProductSlider
                products={products}
                type={"another"}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
