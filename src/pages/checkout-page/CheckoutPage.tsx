import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { zodResolver } from "@hookform/resolvers/zod";

import { createOrder } from "../../api/orders";
import { getMyProfile } from "../../api/profile";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchBucket } from "../../features/bucket";

import { useAuthContext } from "../../context/AuthContext";
import { useModalContext } from "../../context/ModalContext";

import { CheckoutFormData } from "../../types/CheckoutFormData";

import { checkoutSchema } from "../../helpers/checkoutSchema";
import { defaultValues } from "../../helpers/defaultValuesForCheckoutForm";

import {
  CheckoutPageMessages,
  ProfilePageMessages,
} from "../../shared/utils/modalMessages";

import { CartItem } from "../../types/Bucket";

import novaIcon from "../../assets/img/checkout/nova.svg";
import ukrIcon from "../../assets/img/checkout/ukr.svg";
import meestIcon from "../../assets/img/checkout/meest.svg";
import arrowWhite from "../../assets/img/icons/arrow-white.svg";

import "./CheckoutPage.scss";

export const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const { t } = useTranslation();
  const { isAuth } = useAuthContext();

  const [selectedShipping, setSelectedShipping] = useState("");
  const [isCourierSelected, setIsCourierSelected] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const { bucket } = useAppSelector((state: RootState) => state.bucket);

  const { showModal } = useModalContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
  });

  const cart_id = bucket?.id;

  const shipment_method = watch("shipment_method");
  const deliveryType = watch("delivery_type");

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchBucket());
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();

        reset({
          ...defaultValues,
          name: data?.name || "",
          surname: data?.surname || "",
          phone_number: data?.phone_number || "",
          city: data?.city,
          state: data?.state,
          street: data?.street,
          apartment: data?.apartment,
        });
      } catch (error) {
        showModal(ProfilePageMessages.PROFILE_LOAD_ERROR);
      }
    };

    fetchProfile();
  }, []);

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

    createOrder(formDataWithcart)
      .then((data) => {
        setIsOrdered(true);
        console.log("Order created:", data);
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.error("Failed to create order:", error.message);
          showModal(CheckoutPageMessages.CREATE_ORDER_ERROR);
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
    <section className="checkout">
      <div className="checkout__container">
        <div className="checkout__body">
          <div className="checkout__header">
            <h3 className="checkout__title">{t("pages.checkout.title")}</h3>
            <span className="checkout__subtitle">{t("pages.checkout.steps")}</span>
          </div>

          <div className="checkout__box">
            <form className="checkout__form" onSubmit={handleSubmit(onSubmit)}>
              <div className="checkout__block">
                <div className="checkout__blockTitle">
                  <h3 className="checkout__ttl">{t("pages.checkout.contact")}</h3>
                </div>
                <div className="checkout__inputs">
                  <input
                    type="text"
                    className="form__input input"
                    placeholder={t("pages.checkout.name")}
                    {...register("name")}
                  />
                  {errors.name && <span>{errors.name.message}</span>}

                  <input
                    type="text"
                    className="form__input input"
                    placeholder={t("pages.checkout.lastname")}
                    {...register("surname")}
                  />
                  {errors.surname && <span>{errors.surname.message}</span>}

                  <input
                    type="tel"
                    className="form__input input"
                    placeholder="+380 (97) 123‒45‒67"
                    {...register("phone_number")}
                  />
                  {errors.phone_number && (
                    <span>{errors.phone_number.message}</span>
                  )}
                </div>
              </div>

              <div className="checkout__block">
                <div className="checkout__blockTitle">
                  <h3 className="checkout__ttl">Delivery</h3>
                </div>

                <div className="checkout__posts">
                  <label htmlFor="ukr" className="checkout__post">
                    <input
                      id="ukr"
                      type="radio"
                      value="UKRPOSHTA"
                      {...register("shipment_method")}
                      checked={selectedShipping === "UKRPOSHTA"}
                    />
                    <img
                      className="checkout__post_img"
                      src={ukrIcon}
                      alt="Ukr Icon"
                    />
                    <div className="checkout__post_information_wrapper">
                      <h5 className="checkout__post_information_title">
                        Ukrposhta
                      </h5>
                      <p className="checkout__post_information_date">
                        Expected delivery, Monday 19
                      </p>
                      <p className="checkout__post_information_cost">
                        Free shipping on orders over $50
                      </p>
                    </div>
                    <div></div>
                  </label>

                  {selectedShipping === "UKRPOSHTA" && (
                    <div className="checkout__form_wrapper">
                      {!isCourierSelected && (
                        <div
                          className="checkout__form_wrapper_top"
                          style={{
                            opacity: isCourierSelected ? 0.5 : 1,
                            pointerEvents: isCourierSelected ? "none" : "auto",
                          }}
                        >
                          <input
                            type="text"
                            className="form__input input"
                            placeholder={t("pages.checkout.branch")}
                            {...register("branch_address")}
                          />

                          <div className="checkout__dropdown">
                            <select
                              className="form__input input"
                              {...register("branch_id")}
                            >
                              <option value="">{t("pages.checkout.select")}</option>
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
                      <hr className="checkout__line" />

                      <label>
                        <input
                          type="checkbox"
                          className="checkbox__index"
                          {...register("delivery_type")}
                        />
                        {t("pages.checkout.courier")}
                      </label>

                      {isCourierSelected && (
                        <div className="checkout__form_wrapper_courier">
                          <div className="checkoutpage__form_wrapper_courier_forms">
                            <div className="checkout__form_wrapper_inputs">
                              <select
                                className="form__input input"
                                {...register("state")}
                              >
                                <option value="">
                                  {t("pages.checkout.state")}
                                </option>
                                <option value="Kharkivska">Kharkivska</option>
                                <option value="Poltavska">Poltavska</option>
                                <option value="Khersonska">Khersonska</option>
                              </select>

                              <select
                                className="form__input input"
                                {...register("city")}
                              >
                                <option value="">{t("pages.checkout.city")}</option>
                                <option value="Kharkiv">Kharkiv</option>
                                <option value="Poltava">Poltava</option>
                                <option value="Kherson">Kherson</option>
                              </select>
                            </div>
                            <div className="checkout__form_wrapper_inputs">
                              <input
                                type="text"
                                className="form__input input"
                                placeholder={t("pages.checkout.street")}
                                {...register("street")}
                              />
                              <input
                                type="text"
                                className="form__input input"
                                placeholder={t("pages.checkout.apartment")}
                                {...register("apartment")}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <label htmlFor="nova" className="checkout__post">
                    <input
                      id="nova"
                      type="radio"
                      value="NOVA_POSHTA"
                      {...register("shipment_method")}
                      checked={selectedShipping === "NOVA_POSHTA"}
                    />
                    <img
                      className="checkout__post_img"
                      src={novaIcon}
                      alt="Nova Poshta Icon"
                    />
                    <div className="checkout__post_information_wrapper">
                      <h5 className="checkout__post_information_title">New Post</h5>
                      <p className="checkout__post_information_date">
                        Expected delivery, Monday 17
                      </p>
                      <p className="checkout__post_information_cost">
                        Free shipping on orders over $300
                      </p>
                    </div>
                    <div></div>
                  </label>

                  {selectedShipping === "NOVA_POSHTA" && (
                    <div className="checkout__form_wrapper">
                      {!isCourierSelected && (
                        <div
                          className="checkout__form_wrapper_top"
                          style={{
                            opacity: isCourierSelected ? 0.5 : 1,
                            pointerEvents: isCourierSelected ? "none" : "auto",
                          }}
                        >
                          <input
                            type="text"
                            className="form__input input"
                            placeholder={t("pages.checkout.branch")}
                            {...register("branch_address")}
                          />

                          <div className="checkout__dropdown">
                            <select
                              className="form__input input"
                              {...register("branch_id")}
                            >
                              <option value="">
                                {t("pages.checkout.selectOffice")}
                              </option>
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
                      <hr className="checkout__line" />

                      <label>
                        <input
                          type="checkbox"
                          className="checkbox__index"
                          {...register("delivery_type")}
                        />
                        {t("pages.checkout.courier")}
                      </label>

                      {isCourierSelected && (
                        <div className="checkout__form_wrapper_courier">
                          <div className="checkoutpage__form_wrapper_courier_forms">
                            <div className="checkout__form_wrapper_inputs">
                              <select
                                className="form__input input"
                                {...register("state")}
                              >
                                <option value="">
                                  {t("pages.checkout.state")}
                                </option>
                                <option value="Kharkivska">Kharkivska</option>
                                <option value="Poltavska">Poltavska</option>
                                <option value="Khersonska">Khersonska</option>
                              </select>

                              <select
                                className="form__input input"
                                {...register("city")}
                              >
                                <option value="">{t("pages.checkout.city")}</option>
                                <option value="Kharkiv">Kharkiv</option>
                                <option value="Poltava">Poltava</option>
                                <option value="Kherson">Kherson</option>
                              </select>
                            </div>
                            <div className="checkout__form_wrapper_inputs">
                              <input
                                type="text"
                                className="form__input input"
                                placeholder={t("pages.checkout.street")}
                                {...register("street")}
                              />
                              <input
                                type="text"
                                className="form__input input"
                                placeholder={t("pages.checkout.apartment")}
                                {...register("apartment")}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <label htmlFor="meest" className="checkout__post">
                    <input
                      id="meest"
                      type="radio"
                      value="MEEST_EXPRESS"
                      {...register("shipment_method")}
                      checked={selectedShipping === "MEEST_EXPRESS"}
                    />
                    <img
                      className="checkout__post_img"
                      src={meestIcon}
                      alt="Meest Icon"
                    />
                    <div className="checkout__post_information_wrapper">
                      <h5 className="checkout__post_information_title">Meest</h5>
                      <p className="checkout__post_information_date">
                        Expected delivery, Monday 18
                      </p>
                      <p className="checkout__post_information_cost">
                        Free shipping on orders over $100
                      </p>
                    </div>
                    <div></div>
                  </label>

                  {selectedShipping === "MEEST_EXPRESS" && (
                    <div className="checkout__form_wrapper">
                      {!isCourierSelected && (
                        <div
                          className="checkout__form_wrapper_top"
                          style={{
                            opacity: isCourierSelected ? 0.5 : 1,
                            pointerEvents: isCourierSelected ? "none" : "auto",
                          }}
                        >
                          <input
                            type="text"
                            className="form__input input"
                            placeholder={t("pages.checkout.branch")}
                            {...register("branch_address")}
                          />

                          <div className="checkout__dropdown">
                            <select
                              className="form__input input"
                              {...register("branch_id")}
                            >
                              <option value="">
                                {t("pages.checkout.selectOffice")}
                              </option>
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
                      <hr className="checkout__line" />

                      <label>
                        <input
                          type="checkbox"
                          className="checkbox__index"
                          {...register("delivery_type")}
                        />
                        {t("pages.checkout.courier")}
                      </label>

                      {isCourierSelected && (
                        <div className="checkout__form_wrapper_courier">
                          <div className="checkoutpage__form_wrapper_courier_forms">
                            <div className="checkout__form_wrapper_inputs">
                              <select
                                className="form__input input"
                                {...register("state")}
                              >
                                <option value="">
                                  {t("pages.checkout.state")}
                                </option>
                                <option value="Kharkivska">Kharkivska</option>
                                <option value="Poltavska">Poltavska</option>
                                <option value="Khersonska">Khersonska</option>
                              </select>

                              <select
                                className="form__input input"
                                {...register("city")}
                              >
                                <option value="">{t("pages.checkout.city")}</option>
                                <option value="Kharkiv">Kharkiv</option>
                                <option value="Poltava">Poltava</option>
                                <option value="Kherson">Kherson</option>
                              </select>
                            </div>
                            <div className="checkout__form_wrapper_inputs">
                              <input
                                type="text"
                                className="form__input input"
                                placeholder={t("pages.checkout.street")}
                                {...register("street")}
                              />
                              <input
                                type="text"
                                className="form__input input"
                                placeholder={t("pages.checkout.apartment")}
                                {...register("apartment")}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {errors.shipment_method && (
                    <span className="error_message">
                      {errors.shipment_method.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="checkout__block">
                <div className="checkout__blockTitle">
                  <h3 className="checkout__ttl">{t("pages.checkout.payment")}</h3>
                </div>
                <div className="checkout__inputs">
                  <input
                    type="text"
                    className="form__input input"
                    placeholder={t("pages.checkout.card")}
                    {...register("cardNumber")}
                  />
                  {errors.cardNumber && <span>{errors.cardNumber.message}</span>}

                  <input
                    type="date"
                    className="form__input input"
                    {...register("expirationDate")}
                  />
                  {errors.expirationDate && (
                    <span>{errors.expirationDate.message}</span>
                  )}

                  <input
                    type="text"
                    className="form__input input"
                    placeholder={t("pages.checkout.security")}
                    {...register("securityCode")}
                  />
                  {errors.securityCode && (
                    <span>{errors.securityCode.message}</span>
                  )}

                  <hr className="checkout__line" />

                  <label>
                    <input
                      type="checkbox"
                      className="checkbox__index"
                      {...register("terms")}
                    />
                    {t("pages.checkout.agree")}
                  </label>
                  {errors.terms && <span>{errors.terms.message}</span>}
                </div>
              </div>

              <button
                type="submit"
                className={`button button_lg button_default button_full-size ${isOrdered ? "active" : ""
                  }`}
              >
                {t("pages.checkout.button")}
                <img className="icon-arrow" src={arrowWhite} alt="" />
              </button>
            </form>

            <div className="checkout__cartItems">
              <div className="checkout__block">
                <div className="checkout__blockTitle">
                  <h3 className="checkout__ttl">{t("pages.checkout.order")}</h3>
                </div>

                <hr className="checkout__line" />

                {bucket?.cart_items.map((item) => (
                  <div key={item.id} className="checkout__item">
                    <Link
                      key={item.id}
                      className="checkout__itemLeft"
                      to={`/product/${item.product_instance.product.id}`}
                    >
                      <img
                        className="checkout__img"
                        src={`https://localhost:9091/api/images/${item.product_instance.product.main_photo_id}`}
                        alt=""
                      />
                    </Link>

                    <div className="checkout__itemTop">
                      <div className="checkout__titles">
                        <span className="checkout__subtitle">
                          {item.product_instance.product.producer.name}
                        </span>

                        <Link
                          key={item.id}
                          className="checkout__link"
                          to={`/product/${item.product_instance.product.id}`}
                        >
                          <h3 className="checkout__itemTitle">
                            {item.product_instance.product.name}
                          </h3>
                        </Link>
                      </div>

                      <div className="checkout__bottom">
                        <div className="checkout__sizes">
                          <span className="checkout__sizeTitle">
                            {t("pages.checkout.size")}
                          </span>
                          <p className="checkout__size">
                            {item.product_instance.size.name}
                          </p>
                        </div>

                        <div className="checkout__price">
                          ${item.product_instance.product.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="checkout__information">
                  <div className="checkout__info">
                    <p className="checkout__infoKey">
                      {bucket?.cart_items.length} {t("pages.checkout.items")}
                    </p>
                    <p className="checkout__infoValue">${totalPrice}</p>
                  </div>

                  <div className="checkout__info">
                    <p className="checkout__infoKey">
                      {t("pages.checkout.delivery")}
                    </p>
                    <p className="checkout__infoValue">$100</p>
                  </div>
                </div>

                <hr className="checkout__line" />

                <div className="checkout__subtotal">
                  <h3 className="checkout__title">{t("pages.checkout.total")}</h3>
                  <h3 className="checkout__priceTotal">${totalPrice + 100}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
