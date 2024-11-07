import styles from "./ProductPage.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { fetchProductData } from "../../features/product";
import { ProductSlider } from "../../components/product-slider";
import { fetchAllProducts } from "../../features/products";
import { PhotoSlider } from "../../components/photo-slider";
import { useParams } from "react-router-dom";
import { generateRandomNumber } from "../../helpers/generateRandom";
import { MainButton } from "../../components/main-button";
import buttonFav from "../../assets/img/icons/button.svg";
import { TabsContent } from "../../components/tabscontent";
import { BackBtn } from "../../components/back-button";
import { fetchBucket, toggleItemInBucket } from "../../features/bucket";
import { itemInBucket } from "../../types/Bucket";

export const ProductPage = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const [rndNum, setRndNum] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const { product, productInstancesAndSizes, materialAndCare } = useAppSelector(
    (state: RootState) => state.product
  );

  const { products } = useAppSelector((state: RootState) => state.products);
  const { bucket } = useAppSelector((state: RootState) => state.bucket);

  const imagesArr = Array.isArray(product?.images) ? product?.images : [];

  useEffect(() => {
    dispatch(fetchBucket() as any);
  }, [dispatch]);

  const instanceOfItemInBucket = bucket?.cart_items.find(
    (item) => item.product_instance.product.id === Number(productId)
  )?.product_instance.id;

  const everyInstanceOfItemInBucket = bucket?.cart_items.filter(
    (item) => item.product_instance.product.id === Number(productId)
  );

  console.log(everyInstanceOfItemInBucket);

  const [productInstance, setProductInstance] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (instanceOfItemInBucket) {
      setProductInstance(instanceOfItemInBucket);
    }
  }, [instanceOfItemInBucket]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductData(productId) as any);
    }
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(fetchAllProducts() as any);
  }, [dispatch]);

  useEffect(() => {
    const randomNumber = generateRandomNumber(1000000, 9999999);
    setRndNum(randomNumber);
  }, [setRndNum]);

  const handleSizeButton = (instance: number) => {
    setProductInstance((prevInstance) =>
      prevInstance === instance ? undefined : instance
    );
  };

  const handleBuyButton = () => {
    const itemInBucket: itemInBucket = {
      cart_id: bucket?.id,
      product_instance_id: productInstance,
      quantity: 1,
    };

    dispatch(toggleItemInBucket(itemInBucket));
    dispatch(fetchBucket() as any);
  };

  const tabs = [
    {
      title: "Description",
      content: <TabsContent text={product?.description} />,
    },
    {
      title: "Material & Care",
      content: <TabsContent text={materialAndCare?.name} />,
    },
    {
      title: "Rewiews (17)",
      content: <TabsContent text={"Tabs 3"} />,
    },
  ];

  return (
    <section className={styles.productpage}>
      <BackBtn />
      <div className={styles.productpage__body}>
        <div className={styles.productpage__topLeft}>
          <PhotoSlider images={imagesArr} />
        </div>

        <div className={styles.productpage__topRight}>
          <div className={styles.productpage__info}>
            <div className={styles.productpage__information}>
              <div className={styles.productpage__description}>
                <p className={styles.productpage__producer}>
                  {product?.producer.name}
                </p>

                <p className={styles.productpage__title}>{product?.name}</p>

                <p className={styles.productpage__sex}>
                  {product?.gender.name}
                </p>
              </div>

              <div className={styles.productpage__price}>
                <p className={styles.productpage__cost}>${product?.price}</p>
              </div>
            </div>

            <div className={styles.productpage__interactive}>
              <div className={styles.productpage__interactive_top}>
                <div className={styles.productpage__block}>
                  <p className={styles.productpage__name}>Sizes: </p>
                  <div className={styles.productpage__sizes}>
                    {productInstancesAndSizes.map((productInstanceInfo) => (
                      <div
                        key={productInstanceInfo.product_instance_id}
                        className={`${styles.productpage__size} ${
                          productInstanceInfo.product_instance_id ===
                          productInstance
                            ? styles.productpage__size_checked
                            : ""
                        } ${
                          productInstanceInfo.present === 0
                            ? styles.productpage__size_disabled
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

                <div className={styles.productpage__buttons}>
                  <MainButton
                    title={"Buy Now"}
                    icon={true}
                    transparent={false}
                    callback={handleBuyButton}
                    product={product ? product : undefined}
                  />

                  {/* <div onClick={handleBuyButton}>BUY</div> */}

                  <a className={styles.productpage__button} href="">
                    <img src={buttonFav} alt="" />
                  </a>
                </div>

                <div className={styles.productpage__dropdowns}>
                  <select className={styles.productpage__dropdown} id="size">
                    <option
                      className={styles.productpage__ship}
                      value="Shipping & Payment"
                    >
                      Shipping & Payment
                    </option>

                    <option
                      className={styles.productpage__ship}
                      value="Check availability in store"
                    >
                      2
                    </option>
                  </select>

                  <select
                    className={styles.productpage__dropdown}
                    id="availability"
                  >
                    <option
                      className={styles.productpage__ship}
                      value="Shipping & Payment"
                    >
                      Check avaibility in store
                    </option>
                    <option
                      className={styles.productpage__ship}
                      value="Check availability in store"
                    >
                      2
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <p className={styles.productpage__serial}>Product code: {rndNum}</p>
          </div>
        </div>

        <div className={styles.productpage__tabs}>
          <div className={styles.productpage__buttonsWrapper}>
            <div className={styles.productpage__tabsButtons}>
              {tabs.map((tab, index) => (
                <div key={index} className={styles.productpage__tabsButton}>
                  <div
                    className={`${styles.productpage__tablink} ${
                      index === activeTab ? styles.productpage__active : ""
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab.title}
                  </div>
                </div>
              ))}
            </div>

            <hr className={styles.productpage__line} />
          </div>

          <div className={styles.tabContent}>{tabs[activeTab].content}</div>
        </div>

        <div className={styles.productpage__slider}>
          <ProductSlider products={products} type={"another"} />
        </div>
      </div>
    </section>
  );
};
