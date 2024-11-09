import { ProductSlider } from "../../components/product-slider";
import styles from "./BucketPage.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useCallback, useEffect } from "react";
import { fetchAllProducts } from "../../features/products";
import { MainButton } from "../../components/main-button";
import {
  deleteItemInBucket,
  fetchBucket,
  updateItemInBucket,
} from "../../features/bucket";
import { CartItem, UpdateItemInBucketPayload } from "../../types/Bucket";
import { debounce } from "lodash";
import { Loader } from "../../components/loader";

import fav from "../../assets/img/icons/heart.svg";
import favpressed from "../../assets/img/icons/heart-pressed.svg";
import del from "../../assets/img/icons/del.svg";

export const BucketPage = () => {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state: RootState) => state.products);
  const { bucket, loading, error } = useAppSelector(
    (state: RootState) => state.bucket
  );

  const debouncedUpdateItemInBucket = debounce((dispatch, payload) => {
    dispatch(updateItemInBucket(payload));
  }, 500);

  useEffect(() => {
    dispatch(fetchBucket() as any);
    dispatch(fetchAllProducts() as any);
  }, [dispatch]);

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
    <div className={styles.bucketpage}>
      <div className={styles.bucketpage__header}>
        <h3 className={styles.bucketpage__title}>Basket</h3>
        <span className={styles.bucketpage__subtitle}>
          {bucket?.cart_items.length}
        </span>
      </div>

      <div className={styles.bucketpage__container}>
        <div className={styles.bucketpage__left}>
          <div className={styles.bucketpage__items}>
            {bucket?.cart_items.map((item) => (
              <div key={item.id} className={styles.bucketpage__item}>
                <div className={styles.bucketpage__loader}>
                  {loading && <Loader />}
                </div>

                <div className={styles.bucketpage__itemLeft}>
                  <img
                    className={styles.bucketpage__img}
                    src={`https://localhost:9091/api/images/${item.product_instance.product.main_photo_id}`}
                    alt=""
                  />
                </div>

                <div className={styles.bucketpage__itemRight}>
                  <div className={styles.bucketpage__itemRightMain}>
                    <div className={styles.bucketpage__itemTop}>
                      <div className={styles.bucketpage__titles}>
                        <span className={styles.bucketpage__subtitle}>
                          {item.product_instance.product.producer.name}
                        </span>

                        <h3 className={styles.bucketpage__title}>
                          {item.product_instance.product.name}
                        </h3>
                      </div>

                      <div className={styles.bucketpage__price}>
                        ${item.product_instance.product.price}
                      </div>
                    </div>

                    <h4 className={styles.bucketpage__gender}>
                      {item.product_instance.product.gender.name}
                    </h4>

                    <div className={styles.bucketpage__sizes}>
                      <span className={styles.bucketpage__sizeTitle}>
                        Size:
                      </span>
                      <p>{item.product_instance.size.name}</p>
                    </div>
                  </div>

                  <div className={styles.bucketpage__bottomItem}>
                    <div className={styles.bucketpage__counter}>
                      <button
                        className={styles.bucketpage__counterButton}
                        onClick={() => handleCounter(item, false)}
                        disabled={loading}
                      >
                        -
                      </button>
                      <p className={styles.bucketpage__sizes}>
                        {item.quantity}
                      </p>
                      <button
                        className={styles.bucketpage__counterButton}
                        onClick={() => handleCounter(item, true)}
                        disabled={loading}
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.bucketpage__icons}>
                      <button className={styles.bucketpage__buttonBottom}>
                        <img
                          className={styles.bucketpage__icon}
                          src={fav}
                          alt="fav"
                        />
                      </button>

                      <button
                        className={styles.bucketpage__buttonBottom}
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <img
                          className={styles.bucketpage__icon}
                          src={del}
                          alt="del"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.bucketpage__subtotal}>
            <h3 className={styles.bucketpage__title}>Subtotal:</h3>
            <h3 className={styles.bucketpage__price}>${totalPrice}</h3>
          </div>
        </div>

        <div className={styles.bucketpage__right}>
          <div className={styles.bucketpage__card}>
            <h3 className={styles.bucketpage__title}>Basket summary</h3>

            <div className={styles.bucketpage__main}>
              <div className={styles.bucketpage__middle}>
                <div className={styles.bucketpage__info}>
                  <p className={styles.bucketpage__infoKey}>2 items:</p>
                  <p className={styles.bucketpage__infoValue}>${totalPrice}</p>
                </div>
              </div>

              <hr className={styles.bucketpage__line} />

              <div className={styles.bucketpage__bottom}>
                <div className={styles.bucketpage__total}>
                  <h3 className={styles.bucketpage__price}>Total:</h3>
                  <h3 className={styles.bucketpage__price}>${totalPrice}</h3>
                </div>

                <MainButton
                  title="Go to checkout"
                  icon={true}
                  transparent={false}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bucketpage__slider}>
          <ProductSlider products={products} type={"another"} />
        </div>
      </div>
    </div>
  );
};
