import { useEffect, useState } from "react";
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

import "./ProductPage.scss";

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

  const { product, productInstancesAndSizes, materialAndCare } = useAppSelector(
    (state: RootState) => state.product
  );
  const { products, loading, messages } = useAppSelector(
    (state: RootState) => state.products
  );
  const { bucket } = useAppSelector((state: RootState) => state.bucket);

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
    dispatch(toggleItemInFavourite(id));
    dispatch(fetchFavourite());
  };

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
      content: <TabsContent text={"Tabs 3"} />,
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
    <section className="productpage">
      <BackBtn />
      <div className="productpage__body">
        <div className="productpage__topLeft">
          <PhotoSlider images={imagesArr} />
        </div>

        <div className="productpage__topRight">
          <div className="productpage__info">
            <div className="productpage__information">
              <div className="productpage__description">
                <p className="productpage__producer">
                  {product?.producer.name}
                </p>

                <p className="productpage__title">{product?.name}</p>

                <p className="productpage__sex">
                  {product?.gender.name}
                </p>
              </div>

              <div className="productpage__price">
                <p className="productpage__cost">${product?.price}</p>
              </div>
            </div>

            <div className="productpage__interactive">
              <div className="productpage__interactive_top">
                <div className="productpage__block">
                  <p className="productpage__name">
                    {t("pages.product.sizes")}
                  </p>
                  <div className="productpage__sizes">
                    {productInstancesAndSizes.map((productInstanceInfo) => (
                      <div
                        key={productInstanceInfo.product_instance_id}
                        className={`productpage__size ${productInstanceInfo.product_instance_id ===
                          productInstance
                          ? "productpage__size_checked"
                          : ""
                          } ${productInstanceInfo.present === 0
                            ? "productpage__size_disabled"
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
                    ))}
                  </div>
                </div>

                <div className="productpage__buttons">
                  <button
                    className={`button button_lg button_default button_full-size ${isAddedToBucket ? "active" : ""
                      }`}
                    type="submit"
                    onClick={handleBuyButton}
                  >
                    {isAddedToBucket ? "Already in Bucket" : "Add to Bucket"}
                    <img className="icon-arrow" src={arrowWhite} alt="" />
                  </button>

                  {isAuth && (
                    <button
                      className="productpage__button"
                      onClick={() => {
                        if (productId !== undefined) {
                          handleFavButton(+productId);
                        } else {
                          console.error("productId is undefined");
                        }
                      }}
                    >
                      <img src={buttonFav} alt="" />
                    </button>
                  )}
                </div>

                <div className="productpage__dropdowns">
                  <select className="productpage__dropdown" id="size">
                    <option
                      className="productpage__ship"
                      value="Shipping & Payment"
                    >
                      {t("pages.product.SP")}
                    </option>

                    <option
                      className="productpage__ship"
                      value="Check availability in store"
                    >
                      2
                    </option>
                  </select>

                  <select
                    className="productpage__dropdown"
                    id="availability"
                  >
                    <option
                      className="productpage__ship"
                      value="Shipping & Payment"
                    >
                      {t("pages.product.check")}
                    </option>
                    <option
                      className="productpage__ship"
                      value="Check availability in store"
                    >
                      2
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <p className="productpage__serial">
              {t("pages.product.code")} {rndNum}
            </p>
          </div>
        </div>

        <div className="productpage__tabs">
          <div className="productpage__buttonsWrapper">
            <div className="productpage__tabsButtons">
              {tabs.map((tab, index) => (
                <div key={index} className="productpage__tabsButton">
                  <div
                    className={`productpage__tablink ${index === activeTab ? "productpage__active" : ""
                      }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab.title}
                  </div>
                </div>
              ))}
            </div>

            <hr className="productpage__line" />
          </div>

          <div className="tabContent">{tabs[activeTab].content}</div>
        </div>

        <div className="productpage__slider">
          <ProductSlider products={products} type={"another"} />
        </div>
      </div>
    </section>
  );
};
