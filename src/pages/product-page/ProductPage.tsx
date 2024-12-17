import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchProductData } from "../../features/product";
import { fetchBucket, toggleItemInBucket } from "../../features/bucket";
import {
  fetchFavourite,
  toggleItemInFavourite,
} from "../../features/favourite";
import { fetchAllProducts } from "../../features/products";

import { useAuthContext } from "../../context/AuthContext";
import { useModalContext } from "../../context/ModalContext";

import { generateRandomNumber } from "../../helpers/generateRandom";

import { ProductSlider } from "../../components/product-slider";
import { PhotoSlider } from "../../components/photo-slider";
import { TabsContent } from "../../components/tabscontent";
import { BackBtn } from "../../components/back-button";

import { itemInBucket } from "../../types/Bucket";

import arrowWhite from "../../assets/img/icons/arrow-white.svg";
import buttonFav from "../../assets/img/icons/button.svg";
import buttonPressedFav from "../../assets/img/icons/fav-pressed.svg";

import "./ProductPage.scss";
import { PhotoSliderSkeleton } from "../../components/photo-slider-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ProductPageSkeleton } from "../../components/product-page-skeleton";

export const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const { productId } = useParams();

  const [rndNum, setRndNum] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const [, setMessageCounter] = useState(0);
  const [wasModalShown, setWasModalShown] = useState(false);
  const [productInstance, setProductInstance] = useState<number | undefined>(
    undefined
  );

  const { product, productInstancesAndSizes, materialAndCare, loading } =
    useAppSelector((state: RootState) => state.product);

  const { products, messages } = useAppSelector(
    (state: RootState) => state.products
  );
  const { bucket } = useAppSelector((state: RootState) => state.bucket);

  const { favourite } = useAppSelector((state: RootState) => state.favourite);

  const { isAuth } = useAuthContext();
  const { showModal } = useModalContext();

  const imagesArr = Array.isArray(product?.images) ? product?.images : [];

  const instanceOfItemInBucket = bucket?.cart_items.find(
    (item) => item.product_instance.product.id === Number(productId)
  )?.product_instance.id;

  const isAddedToBucket = bucket?.cart_items.some(
    (item) =>
      productId !== undefined && item.product_instance.product.id === +productId
  );

  const handleSizeButton = (instance: number) => {
    setProductInstance((prevInstance) =>
      prevInstance === instance ? undefined : instance
    );
  };

  const handleBuyButton = () => {
    if (!isAuth) {
      navigate("/login");
    }

    const itemInBucket: itemInBucket = {
      cart_id: bucket?.id,
      product_instance_id: productInstance,
      quantity: 1,
    };

    dispatch(toggleItemInBucket(itemInBucket));
    dispatch(fetchBucket());
  };

  const handleFavButton = (id: number) => {
    dispatch(toggleItemInFavourite(id)).then(() => dispatch(fetchFavourite()));
  };

  const isAddedToFav = useMemo(() => {
    return favourite.find(
      (item) => productId !== undefined && item.id === +productId
    );
  }, [favourite, productId]);

  const isItemInFavourites = useMemo(() => {
    return !!isAddedToFav;
  }, [isAddedToFav]);

  const tabs = [
    {
      title: t("pages.product.desc"),
      content: <TabsContent text={product?.description} />,
    },
    {
      title: t("pages.product.material"),
      content: <TabsContent text={materialAndCare?.name} />,
    },
    {
      title: `${t("pages.product.reviews")} ${17}`,
      content: (
        <TabsContent text={"This block is currently under development."} />
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchBucket() as any);
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

  useEffect(() => {
    if (instanceOfItemInBucket) {
      setProductInstance(instanceOfItemInBucket);
    }
  }, [instanceOfItemInBucket]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductData(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const randomNumber = generateRandomNumber(1000000, 9999999);
    setRndNum(randomNumber);
  }, [setRndNum]);

  return (
    <section className="product">
      <div className="product__container">
        <div className="product__body">
          <BackBtn />
          <div className="product__content">
            <div className="product__topLeft">
              {loading ? (
                <PhotoSliderSkeleton imagesCount={5} />
              ) : (
                <PhotoSlider images={imagesArr} product={product} />
              )}
            </div>

            <div className="product__topRight">
              {loading ? (
                <ProductPageSkeleton />
              ) : (
                <div className="product__info">
                  <div className="product__information">
                    <div className="product__description">
                      <p className="product__producer title-5">
                        {product?.producer.name}
                      </p>

                      <h1 className="product__title title-3">
                        {product?.name}
                      </h1>

                      <p className="product__sex title-4">
                        {product?.gender.name}
                      </p>
                    </div>

                    {product && (
                      <p className="product__price">
                        {"current_discount" in product &&
                        product.final_price ? (
                          <>
                            <span className="product__price--discount">
                              {Number.isInteger(product.final_price)
                                ? product.final_price
                                : product.final_price.toFixed(2)}
                              ₴
                            </span>
                            <span className="product__price--old">
                              {Number.isInteger(product.price)
                                ? product.price
                                : product.price.toFixed(2)}
                              ₴
                            </span>
                          </>
                        ) : (
                          <span>
                            {product.price
                              ? Number.isInteger(product.price)
                                ? product.price
                                : product.price.toFixed(2)
                              : "N/A"}
                            ₴
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  <div className="product__interactive">
                    <div className="product__interactive_top">
                      <div className="product__block">
                        <p className="product__name">
                          {t("pages.product.sizes")}
                        </p>
                        <div className="product__sizes">
                          {productInstancesAndSizes.map(
                            (productInstanceInfo) => (
                              <div
                                key={productInstanceInfo.product_instance_id}
                                className={`product__size ${
                                  productInstanceInfo.product_instance_id ===
                                  productInstance
                                    ? "product__size_checked"
                                    : ""
                                } ${
                                  productInstanceInfo.present === 0
                                    ? "product__size_disabled"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleSizeButton(
                                    productInstanceInfo.product_instance_id
                                  )
                                }
                              >
                                {productInstanceInfo.size_name}
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div className="product__buttons">
                        <button
                          className={`button button_lg button_default button_full-size ${
                            isAddedToBucket ? "active" : ""
                          }`}
                          type="submit"
                          onClick={handleBuyButton}
                        >
                          {isAddedToBucket
                            ? "Already in Bucket"
                            : "Add to Bucket"}
                          <img className="icon-arrow" src={arrowWhite} alt="" />
                        </button>

                        {isAuth && (
                          <button
                            className="product__button"
                            onClick={() => {
                              if (productId !== undefined) {
                                handleFavButton(+productId);
                              } else {
                                console.error("productId is undefined");
                              }
                            }}
                          >
                            {isItemInFavourites ? (
                              <img src={buttonPressedFav} alt="" />
                            ) : (
                              <img src={buttonFav} alt="" />
                            )}
                          </button>
                        )}
                      </div>

                      <div className="product__dropdowns">
                        <select className="product__dropdown" id="size">
                          <option
                            className="product__ship"
                            value="Shipping & Payment"
                          >
                            {t("pages.product.SP")}
                          </option>

                          <option
                            className="product__ship"
                            value="Check availability in store"
                          >
                            2
                          </option>
                        </select>

                        <select className="product__dropdown" id="availability">
                          <option
                            className="product__ship"
                            value="Shipping & Payment"
                          >
                            {t("pages.product.check")}
                          </option>
                          <option
                            className="product__ship"
                            value="Check availability in store"
                          >
                            2
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <p className="product__serial title-5">
                    {t("pages.product.code")} {rndNum}
                  </p>
                </div>
              )}
            </div>

            <div className="product__tabs">
              <div className="product__buttonsWrapper">
                <div className="product__tabsButtons">
                  {tabs.map((tab, index) => (
                    <div key={index} className="product__tabsButton">
                      <p
                        className={`product__tablink ${
                          index === activeTab ? "product__active" : ""
                        }`}
                        onClick={() => setActiveTab(index)}
                      >
                        {tab.title}
                      </p>
                    </div>
                  ))}
                </div>

                <hr className="product__line" />
              </div>

              <div className="tabContent">{tabs[activeTab].content}</div>
            </div>

            <div className="product__slider">
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
