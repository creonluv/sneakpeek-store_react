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

export const BucketPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [, setMessageCounter] = useState(0);
  const [wasModalShown, setWasModalShown] = useState(false);

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
      const itemToUpdate: UpdateItemInBucketPayload = {
        id: product.id,
        cart_id: bucket?.id,
        product_instance_id: product.product_instance.id,
        quantity: product.quantity + (isIncrement ? 1 : -1),
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

  const calculateTotalPrice = useCallback((cartItems: CartItem[]) => {
    return cartItems.reduce(
      (total, item) =>
        total + item.quantity * item.product_instance.product.price,
      0
    );
  }, []);

  const totalPrice = calculateTotalPrice(bucket?.cart_items || []);

  return (
    <div className="bucketpage">
      <div className="bucketpage__header">
        <h3 className="bucketpage__title">{t("pages.bucket.title")}</h3>
        <span className="bucketpage__subtitle">
          {bucket?.cart_items.length}
        </span>
      </div>

      <div className="bucketpage__container">
        <div className="bucketpage__left">
          <div className="bucketpage__items">
            {bucket?.cart_items.map((item, index) => {
              console.log(bucket?.cart_items[index]?.product_instance.present);

              return (
                <div key={item.id} className="bucketpage__item">
                  <div className="bucketpage__loader">
                    {loading && <Loader />}
                  </div>

                  <Link
                    key={item.id}
                    className="bucketpage__itemLeft"
                    to={`/product/${item.product_instance.product.id}`}
                  >
                    <img
                      className="bucketpage__img"
                      src={`https://localhost:9091/api/images/${item.product_instance.product.main_photo_id}`}
                      alt=""
                    />
                  </Link>

                  <div className="bucketpage__itemRight">
                    <div className="bucketpage__itemRightMain">
                      <div className="bucketpage__itemTop">
                        <div className="bucketpage__titles">
                          <span className="bucketpage__subtitle">
                            {item.product_instance.product.producer.name}
                          </span>

                          <Link
                            key={item.id}
                            className="bucketpage__link"
                            to={`/product/${item.product_instance.product.id}`}
                          >
                            <h3 className="bucketpage__title">
                              {item.product_instance.product.name}
                            </h3>
                          </Link>
                        </div>

                        <div className="bucketpage__price">
                          ${item.product_instance.product.price}
                        </div>
                      </div>

                      <h4 className="bucketpage__gender">
                        {item.product_instance.product.gender.name}
                      </h4>

                      <div className="bucketpage__sizes">
                        <span className="bucketpage__sizeTitle">Size:</span>
                        <p>{item.product_instance.size.name}</p>
                      </div>
                    </div>

                    <div className="bucketpage__bottomItem">
                      <div className="bucketpage__counter">
                        <button
                          className="bucketpage__counterButton"
                          onClick={() => handleCounter(item, false)}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <p className="bucketpage__sizes">{item.quantity}</p>
                        <button
                          className="bucketpage__counterButton"
                          onClick={() => handleCounter(item, true)}
                          disabled={
                            item.quantity ===
                            bucket?.cart_items[index]?.product_instance.present
                          }
                        >
                          +
                        </button>
                      </div>

                      <div className="bucketpage__icons">
                        <button
                          className="bucketpage__buttonBottom"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <img
                            className="bucketpage__icon"
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

          <div className="bucketpage__subtotal">
            <h3 className="bucketpage__title">{t("pages.bucket.subtotal")}</h3>
            <h3 className="bucketpage__price">${totalPrice}</h3>
          </div>
        </div>

        <div className="bucketpage__right">
          <div className="bucketpage__card">
            <h3 className="bucketpage__title">{t("pages.bucket.summary")}</h3>

            <div className="bucketpage__main">
              <div className="bucketpage__middle">
                <div className="bucketpage__info">
                  <p className="bucketpage__infoKey">
                    {bucket?.cart_items.length} {t("pages.bucket.items")}
                  </p>
                  <p className="bucketpage__infoValue">${totalPrice}</p>
                </div>
              </div>

              <hr className="bucketpage__line" />

              <div className="bucketpage__bottom">
                <div className="bucketpage__total">
                  <h3 className="bucketpage__price">
                    {t("pages.bucket.total")}
                  </h3>
                  <h3 className="bucketpage__price">${totalPrice}</h3>
                </div>

                <button
                  className="button button_lg button_default button_full-size"
                  type="submit"
                  onClick={() => navigate("/checkout")}
                >
                  {t("pages.bucket.button")}
                  <img className="icon-arrow" src={arrowWhite} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bucketpage__slider">
          <ProductSlider
            products={products}
            type={"another"}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};
