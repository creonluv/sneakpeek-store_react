import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./CheckoutPage.module.scss";

import novaIcon from "../../assets/img/checkout/nova.svg";
import ukrIcon from "../../assets/img/checkout/ukr.svg";
import meestIcon from "../../assets/img/checkout/meest.svg";
import arrowWhite from "../../assets/img/icons/arrow-white.svg";

import { checkoutSchema } from "../../helpers/checkoutSchema";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { fetchBucket } from "../../features/bucket";
import { createOrder } from "../../api/orders";
import { Link, useNavigate } from "react-router-dom";
import { CartItem } from "../../types/Bucket";

type CheckoutFormData = {
  cart_id: string;
  name: string;
  surname: string;
  phone_number: string;
  delivery_type: boolean;
  shipment_method: string;
  city?: string;
  state?: string;
  street?: string;
  apartment?: string;
  branch_id?: string;
  branch_address?: string;

  terms: boolean;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
};

export const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuthContext();
  const navigate = useNavigate();

  const [selectedShipping, setSelectedShipping] = useState("");
  const [isCourierSelected, setIsCourierSelected] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const { bucket } = useAppSelector((state: RootState) => state.bucket);

  const cart_id = bucket?.id;

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchBucket());
    }
  }, [dispatch, isAuth]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const shipment_method = watch("shipment_method");
  const deliveryType = watch("delivery_type");

  useEffect(() => {
    if (shipment_method) {
      setSelectedShipping(shipment_method);
    }
  }, [shipment_method]);

  useEffect(() => {
    if (deliveryType) {
      setIsCourierSelected(true);
    } else {
      setIsCourierSelected(false);
    }
  }, [deliveryType]);

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    const formDataWithcart = {
      cart_id: cart_id ?? 0,
      name: data.name,
      surname: data.surname,
      phone_number: data.phone_number,
      delivery_details: {
        delivery_type:
          typeof data.delivery_type === "string" &&
          data.delivery_type === "home"
            ? "home"
            : "branch",
        shipment_method: data.shipment_method,
        ...(typeof data.delivery_type === "string" &&
        data.delivery_type === "home"
          ? {
              state: data.state,
              city: data.city,
              street: data.street,
              apartment: data.apartment,
            }
          : {
              branch_id: data.branch_id,
              branch_address: data.branch_address,
            }),
      },
    };

    console.log("Transformed Form Data:", formDataWithcart);

    createOrder(formDataWithcart)
      .then((data) => {
        setIsOrdered(true);
        console.log("Order created:", data);
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.error("Failed to create order:", error.message);
          setIsOrdered(false);
        } else {
          console.error("Unknown error occurred:", error);
        }
      });
  };

  const calculateTotalPrice = useCallback((cartItems: CartItem[]) => {
    return cartItems.reduce(
      (total, item) =>
        total + item.quantity * item.product_instance.product.price,
      0
    );
  }, []);

  const totalPrice = calculateTotalPrice(bucket?.cart_items || []);

  return (
    <section className={styles.checkoutpage}>
      <div className={styles.checkoutpage__header}>
        <h3 className={styles.checkoutpage__title}>Checkout</h3>
        <span className={styles.checkoutpage__subtitle}>3 steps</span>
      </div>

      <div className={styles.checkoutpage__container}>
        <form
          className={styles.checkoutpage__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.checkoutpage__block}>
            <div className={styles.checkoutpage__blockTitle}>
              <h3 className={styles.checkoutpage__ttl}>Contact Information</h3>
            </div>
            <div className={styles.checkoutpage__inputs}>
              <input
                type="text"
                className={`${styles.form__input} input`}
                placeholder="Enter name"
                {...register("name")}
              />
              {errors.name && <span>{errors.name.message}</span>}

              <input
                type="text"
                className={`${styles.form__input} input`}
                placeholder="Enter last name"
                {...register("surname")}
              />
              {errors.surname && <span>{errors.surname.message}</span>}

              <input
                type="tel"
                className={`${styles.form__input} input`}
                placeholder="+380 (97) 123‒45‒67"
                {...register("phone_number")}
              />
              {errors.phone_number && (
                <span>{errors.phone_number.message}</span>
              )}
            </div>
          </div>

          <div className={styles.checkoutpage__block}>
            <div className={styles.checkoutpage__blockTitle}>
              <h3 className={styles.checkoutpage__ttl}>Delivery</h3>
            </div>

            <div className={styles.checkoutpage__posts}>
              <label htmlFor="ukr" className={styles.checkoutpage__post}>
                <input
                  id="ukr"
                  type="radio"
                  value="UKRPOSHTA"
                  {...register("shipment_method")}
                  checked={selectedShipping === "UKRPOSHTA"}
                />
                <img
                  className={styles.checkoutpage__post_img}
                  src={ukrIcon}
                  alt="Ukr Icon"
                />
                <div className={styles.checkoutpage__post_information_wrapper}>
                  <h5 className={styles.checkoutpage__post_information_title}>
                    Ukrposhta
                  </h5>
                  <p className={styles.checkoutpage__post_information_date}>
                    Expected delivery, Monday 19
                  </p>
                  <p className={styles.checkoutpage__post_information_cost}>
                    Free shipping on orders over $50
                  </p>
                </div>
                <div></div>
              </label>

              {selectedShipping === "UKRPOSHTA" && (
                <div className={styles.checkoutpage__form_wrapper}>
                  {!isCourierSelected && (
                    <div
                      className={styles.checkoutpage__form_wrapper_top}
                      style={{
                        opacity: isCourierSelected ? 0.5 : 1,
                        pointerEvents: isCourierSelected ? "none" : "auto",
                      }}
                    >
                      <input
                        type="text"
                        className={`${styles.form__input} input`}
                        placeholder="Adress of branch"
                        {...register("branch_address")}
                      />

                      <div className={styles.checkoutpage__dropdown}>
                        <select
                          className={`${styles.form__input} input`}
                          {...register("branch_id")}
                        >
                          <option value="">Select Post Office</option>
                          <option value="Post office #129">
                            Post office #129
                          </option>
                          <option value="Post office #55">
                            Post office #55
                          </option>
                          <option value="Post office #29">
                            Post office #29
                          </option>
                        </select>
                        {errors.shipment_method && (
                          <span>{errors.shipment_method.message}</span>
                        )}
                      </div>
                    </div>
                  )}
                  <hr className={styles.checkoutpage__line} />

                  <label>
                    <input
                      type="checkbox"
                      className={styles.checkbox__index}
                      {...register("delivery_type")}
                    />
                    Courier delivery
                  </label>

                  {isCourierSelected && (
                    <div className={styles.checkoutpage__form_wrapper_courier}>
                      <div
                        className={
                          styles.checkoutpage__form_wrapper_courier_forms
                        }
                      >
                        <div
                          className={styles.checkoutpage__form_wrapper_inputs}
                        >
                          <select
                            className={`${styles.form__input} input`}
                            {...register("state")}
                          >
                            <option value="">State</option>
                            <option value="Kharkivska">Kharkivska</option>
                            <option value="Poltavska">Poltavska</option>
                            <option value="Khersonska">Khersonska</option>
                          </select>

                          <select
                            className={`${styles.form__input} input`}
                            {...register("city")}
                          >
                            <option value="">City</option>
                            <option value="Kharkiv">Kharkiv</option>
                            <option value="Poltava">Poltava</option>
                            <option value="Kherson">Kherson</option>
                          </select>
                        </div>
                        <div
                          className={styles.checkoutpage__form_wrapper_inputs}
                        >
                          <input
                            type="text"
                            className={`${styles.form__input} input`}
                            placeholder="Street"
                            {...register("street")}
                          />
                          <input
                            type="text"
                            className={`${styles.form__input} input`}
                            placeholder="Apartment"
                            {...register("apartment")}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <label htmlFor="nova" className={styles.checkoutpage__post}>
                <input
                  id="nova"
                  type="radio"
                  value="NOVA_POSHTA"
                  {...register("shipment_method")}
                  checked={selectedShipping === "NOVA_POSHTA"}
                />
                <img
                  className={styles.checkoutpage__post_img}
                  src={novaIcon}
                  alt="Nova Poshta Icon"
                />
                <div className={styles.checkoutpage__post_information_wrapper}>
                  <h5 className={styles.checkoutpage__post_information_title}>
                    New Post
                  </h5>
                  <p className={styles.checkoutpage__post_information_date}>
                    Expected delivery, Monday 17
                  </p>
                  <p className={styles.checkoutpage__post_information_cost}>
                    Free shipping on orders over $300
                  </p>
                </div>
                <div></div>
              </label>

              {selectedShipping === "NOVA_POSHTA" && (
                <div className={styles.checkoutpage__form_wrapper}>
                  {!isCourierSelected && (
                    <div
                      className={styles.checkoutpage__form_wrapper_top}
                      style={{
                        opacity: isCourierSelected ? 0.5 : 1,
                        pointerEvents: isCourierSelected ? "none" : "auto",
                      }}
                    >
                      <input
                        type="text"
                        className={`${styles.form__input} input`}
                        placeholder="Adress of branch"
                        {...register("branch_address")}
                      />

                      <div className={styles.checkoutpage__dropdown}>
                        <select
                          className={`${styles.form__input} input`}
                          {...register("branch_id")}
                        >
                          <option value="">Select Post Office</option>
                          <option value="Post office #129">
                            Post office #129
                          </option>
                          <option value="Post office #55">
                            Post office #55
                          </option>
                          <option value="Post office #29">
                            Post office #29
                          </option>
                        </select>
                        {errors.shipment_method && (
                          <span>{errors.shipment_method.message}</span>
                        )}
                      </div>
                    </div>
                  )}
                  <hr className={styles.checkoutpage__line} />

                  <label>
                    <input
                      type="checkbox"
                      className={styles.checkbox__index}
                      {...register("delivery_type")}
                    />
                    Courier delivery
                  </label>

                  {isCourierSelected && (
                    <div className={styles.checkoutpage__form_wrapper_courier}>
                      <div
                        className={
                          styles.checkoutpage__form_wrapper_courier_forms
                        }
                      >
                        <div
                          className={styles.checkoutpage__form_wrapper_inputs}
                        >
                          <select
                            className={`${styles.form__input} input`}
                            {...register("state")}
                          >
                            <option value="">State</option>
                            <option value="Kharkivska">Kharkivska</option>
                            <option value="Poltavska">Poltavska</option>
                            <option value="Khersonska">Khersonska</option>
                          </select>

                          <select
                            className={`${styles.form__input} input`}
                            {...register("city")}
                          >
                            <option value="">City</option>
                            <option value="Kharkiv">Kharkiv</option>
                            <option value="Poltava">Poltava</option>
                            <option value="Kherson">Kherson</option>
                          </select>
                        </div>
                        <div
                          className={styles.checkoutpage__form_wrapper_inputs}
                        >
                          <input
                            type="text"
                            className={`${styles.form__input} input`}
                            placeholder="Street"
                            {...register("street")}
                          />
                          <input
                            type="text"
                            className={`${styles.form__input} input`}
                            placeholder="Apartment"
                            {...register("apartment")}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <label htmlFor="meest" className={styles.checkoutpage__post}>
                <input
                  id="meest"
                  type="radio"
                  value="MEEST_EXPRESS"
                  {...register("shipment_method")}
                  checked={selectedShipping === "MEEST_EXPRESS"}
                />
                <img
                  className={styles.checkoutpage__post_img}
                  src={meestIcon}
                  alt="Meest Icon"
                />
                <div className={styles.checkoutpage__post_information_wrapper}>
                  <h5 className={styles.checkoutpage__post_information_title}>
                    Meest
                  </h5>
                  <p className={styles.checkoutpage__post_information_date}>
                    Expected delivery, Monday 18
                  </p>
                  <p className={styles.checkoutpage__post_information_cost}>
                    Free shipping on orders over $100
                  </p>
                </div>
                <div></div>
              </label>

              {selectedShipping === "MEEST_EXPRESS" && (
                <div className={styles.checkoutpage__form_wrapper}>
                  {!isCourierSelected && (
                    <div
                      className={styles.checkoutpage__form_wrapper_top}
                      style={{
                        opacity: isCourierSelected ? 0.5 : 1,
                        pointerEvents: isCourierSelected ? "none" : "auto",
                      }}
                    >
                      <input
                        type="text"
                        className={`${styles.form__input} input`}
                        placeholder="Adress of branch"
                        {...register("branch_address")}
                      />

                      <div className={styles.checkoutpage__dropdown}>
                        <select
                          className={`${styles.form__input} input`}
                          {...register("branch_id")}
                        >
                          <option value="">Select Post Office</option>
                          <option value="Post office #129">
                            Post office #129
                          </option>
                          <option value="Post office #55">
                            Post office #55
                          </option>
                          <option value="Post office #29">
                            Post office #29
                          </option>
                        </select>
                        {errors.shipment_method && (
                          <span>{errors.shipment_method.message}</span>
                        )}
                      </div>
                    </div>
                  )}
                  <hr className={styles.checkoutpage__line} />

                  <label>
                    <input
                      type="checkbox"
                      className={styles.checkbox__index}
                      {...register("delivery_type")}
                    />
                    Courier delivery
                  </label>

                  {isCourierSelected && (
                    <div className={styles.checkoutpage__form_wrapper_courier}>
                      <div
                        className={
                          styles.checkoutpage__form_wrapper_courier_forms
                        }
                      >
                        <div
                          className={styles.checkoutpage__form_wrapper_inputs}
                        >
                          <select
                            className={`${styles.form__input} input`}
                            {...register("state")}
                          >
                            <option value="">State</option>
                            <option value="Kharkivska">Kharkivska</option>
                            <option value="Poltavska">Poltavska</option>
                            <option value="Khersonska">Khersonska</option>
                          </select>

                          <select
                            className={`${styles.form__input} input`}
                            {...register("city")}
                          >
                            <option value="">City</option>
                            <option value="Kharkiv">Kharkiv</option>
                            <option value="Poltava">Poltava</option>
                            <option value="Kherson">Kherson</option>
                          </select>
                        </div>
                        <div
                          className={styles.checkoutpage__form_wrapper_inputs}
                        >
                          <input
                            type="text"
                            className={`${styles.form__input} input`}
                            placeholder="Street"
                            {...register("street")}
                          />
                          <input
                            type="text"
                            className={`${styles.form__input} input`}
                            placeholder="Apartment"
                            {...register("apartment")}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {errors.shipment_method && (
                <span className={styles.error_message}>
                  {errors.shipment_method.message}
                </span>
              )}
            </div>
          </div>

          <div className={styles.checkoutpage__block}>
            <div className={styles.checkoutpage__blockTitle}>
              <h3 className={styles.checkoutpage__ttl}>Payment Method</h3>
            </div>
            <div className={styles.checkoutpage__inputs}>
              <input
                type="text"
                className={`${styles.form__input} input`}
                placeholder="Card number*"
                {...register("cardNumber")}
              />
              {errors.cardNumber && <span>{errors.cardNumber.message}</span>}

              <input
                type="date"
                className={`${styles.form__input} input`}
                {...register("expirationDate")}
              />
              {errors.expirationDate && (
                <span>{errors.expirationDate.message}</span>
              )}

              <input
                type="text"
                className={`${styles.form__input} input`}
                placeholder="Security Code*"
                {...register("securityCode")}
              />
              {errors.securityCode && (
                <span>{errors.securityCode.message}</span>
              )}

              <hr className={styles.checkoutpage__line} />

              <label>
                <input
                  type="checkbox"
                  className={styles.checkbox__index}
                  {...register("terms")}
                />
                I agree to the terms
              </label>
              {errors.terms && <span>{errors.terms.message}</span>}
            </div>
          </div>

          <button
            type="submit"
            className={`button button_lg button_default button_full-size ${
              isOrdered ? "active" : ""
            }`}
            // onClick={() => navigate("/thankyou")}
          >
            buy now
            <img className="icon-arrow" src={arrowWhite} alt="" />
          </button>
        </form>

        <div className={styles.checkoutpage__cartItems}>
          <div className={styles.checkoutpage__block}>
            <div className={styles.checkoutpage__blockTitle}>
              <h3 className={styles.checkoutpage__ttl}>Your order</h3>
            </div>

            <hr className={styles.checkoutpage__line} />

            {bucket?.cart_items.map((item) => (
              <div key={item.id} className={styles.checkoutpage__item}>
                <Link
                  key={item.id}
                  className={styles.checkoutpage__itemLeft}
                  to={`/product/${item.product_instance.product.id}`}
                >
                  <img
                    className={styles.checkoutpage__img}
                    src={`https://localhost:9091/api/images/${item.product_instance.product.main_photo_id}`}
                    alt=""
                  />
                </Link>

                <div className={styles.checkoutpage__itemTop}>
                  <div className={styles.checkoutpage__titles}>
                    <span className={styles.checkoutpage__subtitle}>
                      {item.product_instance.product.producer.name}
                    </span>

                    <Link
                      key={item.id}
                      className={styles.checkoutpage__link}
                      to={`/product/${item.product_instance.product.id}`}
                    >
                      <h3 className={styles.checkoutpage__itemTitle}>
                        {item.product_instance.product.name}
                      </h3>
                    </Link>
                  </div>

                  <div className={styles.checkoutpage__bottom}>
                    <div className={styles.checkoutpage__sizes}>
                      <span className={styles.checkoutpage__sizeTitle}>
                        Size:
                      </span>
                      <p className={styles.checkoutpage__size}>
                        {item.product_instance.size.name}
                      </p>
                    </div>

                    <div className={styles.checkoutpage__price}>
                      ${item.product_instance.product.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.checkoutpage__information}>
              <div className={styles.checkoutpage__info}>
                <p className={styles.checkoutpage__infoKey}>
                  {bucket?.cart_items.length} items:
                </p>
                <p className={styles.checkoutpage__infoValue}>${totalPrice}</p>
              </div>

              <div className={styles.checkoutpage__info}>
                <p className={styles.checkoutpage__infoKey}>Delivery:</p>
                <p className={styles.checkoutpage__infoValue}>$100</p>
              </div>
            </div>

            <hr className={styles.checkoutpage__line} />

            <div className={styles.checkoutpage__subtotal}>
              <h3 className={styles.checkoutpage__title}>Total:</h3>
              <h3 className={styles.checkoutpage__priceTotal}>
                ${totalPrice + 100}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
