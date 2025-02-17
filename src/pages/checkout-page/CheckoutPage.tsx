import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
import { CheckoutBlockSkeleton } from "../../components/checkout-skeleton";

export const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { isAuth } = useAuthContext();

  const [selectedShipping, setSelectedShipping] = useState("");
  const [isCourierSelected, setIsCourierSelected] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const { bucket, loading } = useAppSelector(
    (state: RootState) => state.bucket
  );

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
      .then(() => navigate("/thankyou"))
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

  const calculateTotalAmount = useCallback((cartItems: CartItem[]) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, []);

  const totalPrice = calculateTotalPrice(bucket?.cart_items || []);
  const totalAmount = calculateTotalAmount(bucket?.cart_items || []);

  return (
    <section className="checkout">
      <div className="checkout__container">
        <div className="checkout__body">
          <div className="checkout__header">
            <h1 className="checkout__title title-3">
              {t("pages.checkout.title")}
            </h1>
            <span className="checkout__subtitle title-5">
              {t("pages.checkout.steps")}
            </span>
          </div>

          <div className="checkout__box">
            <form className="checkout__form" onSubmit={handleSubmit(onSubmit)}>
              <div className="checkout__block">
                <div className="checkout__blockTitle">
                  <h2 className="checkout__ttl title-3">
                    {t("pages.checkout.contact")}
                  </h2>
                </div>
                <div className="checkout__inputs">
                  <input
                    type="text"
                    className="form__input input"
                    placeholder={t("pages.checkout.name")}
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="checkout__error">
                      {errors.name.message}
                    </span>
                  )}

                  <input
                    type="text"
                    className="form__input input"
                    placeholder={t("pages.checkout.lastname")}
                    {...register("surname")}
                  />
                  {errors.surname && (
                    <span className="checkout__error">
                      {errors.surname.message}
                    </span>
                  )}

                  <input
                    type="tel"
                    className="form__input input"
                    placeholder="+380 (97) 123‒45‒67"
                    {...register("phone_number")}
                  />
                  {errors.phone_number && (
                    <span className="checkout__error">
                      {errors.phone_number.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="checkout__block">
                <div className="checkout__blockTitle">
                  <h2 className="checkout__ttl title-3">
                    {t("pages.checkout.delivery")}
                  </h2>
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
                      <h3 className="checkout__post_information_title">
                        Ukrposhta
                      </h3>
                      <p className="checkout__post_information_date text-muted">
                        Expected delivery, Monday 19
                      </p>
                      <p className="checkout__post_information_cost title-5">
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
                              <option value="">
                                {t("pages.checkout.select")}
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
                              <span className="checkout__error">
                                {errors.shipment_method.message}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <hr className="checkout__line" />

                      <div className="form__checkbox checkbox">
                        <input
                          type="checkbox"
                          className="checkbox__index"
                          id="agree"
                          {...register("delivery_type")}
                        />
                        <label className="checkbox__label" htmlFor="agree">
                          {t("pages.checkout.courier")}
                        </label>
                      </div>

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
                                <option value="">
                                  {t("pages.checkout.city")}
                                </option>
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
                      <h3 className="checkout__post_information_title">
                        New Post
                      </h3>
                      <p className="checkout__post_information_date text-muted">
                        Expected delivery, Monday 17
                      </p>
                      <p className="checkout__post_information_cost title-5">
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
                              <span className="checkout__error">
                                {errors.shipment_method.message}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <hr className="checkout__line" />

                      <div className="form__checkbox checkbox">
                        <input
                          type="checkbox"
                          className="checkbox__index"
                          id="agree"
                          {...register("delivery_type")}
                        />
                        <label className="checkbox__label" htmlFor="agree">
                          {t("pages.checkout.courier")}
                        </label>
                      </div>

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
                                <option value="">
                                  {t("pages.checkout.city")}
                                </option>
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
                      <h3 className="checkout__post_information_title">
                        Meest
                      </h3>
                      <p className="checkout__post_information_date text-muted">
                        Expected delivery, Monday 18
                      </p>
                      <p className="checkout__post_information_cost title-5">
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
                              <span className="checkout__error">
                                {errors.shipment_method.message}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <hr className="checkout__line" />

                      <div className="form__checkbox checkbox">
                        <input
                          type="checkbox"
                          className="checkbox__index"
                          id="agree"
                          {...register("delivery_type")}
                        />
                        <label className="checkbox__label" htmlFor="agree">
                          {t("pages.checkout.courier")}
                        </label>
                      </div>

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
                                <option value="">
                                  {t("pages.checkout.city")}
                                </option>
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
                    <span className="checkout__error">
                      {errors.shipment_method.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="checkout__block">
                <div className="checkout__blockTitle">
                  <h2 className="checkout__ttl title-3">
                    {t("pages.checkout.payment")}
                  </h2>
                </div>
                <div className="checkout__inputs">
                  <input
                    type="text"
                    className="form__input input"
                    placeholder={t("pages.checkout.card")}
                    {...register("cardNumber")}
                  />
                  {errors.cardNumber && (
                    <span className="checkout__error">
                      {errors.cardNumber.message}
                    </span>
                  )}

                  <input
                    type="date"
                    className="form__input input"
                    {...register("expirationDate")}
                  />
                  {errors.expirationDate && (
                    <span className="checkout__error">
                      {errors.expirationDate.message}
                    </span>
                  )}

                  <input
                    type="text"
                    className="form__input input"
                    placeholder={t("pages.checkout.security")}
                    {...register("securityCode")}
                  />
                  {errors.securityCode && (
                    <span className="checkout__error">
                      {errors.securityCode.message}
                    </span>
                  )}

                  <hr className="checkout__line" />

                  <div className="form__checkbox checkbox">
                    <input
                      type="checkbox"
                      className="checkbox__index"
                      id="agree"
                      {...register("terms")}
                    />
                    <label className="checkbox__label" htmlFor="agree">
                      {t("pages.checkout.agree")}
                    </label>
                  </div>

                  {errors.terms && (
                    <span className="checkout__error">
                      {errors.terms.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="button-wrapper">
                <button
                  type="submit"
                  className={`button button_lg button_default button_full-size ${
                    isOrdered ? "active" : ""
                  }`}
                >
                  <span>{t("pages.checkout.button")}</span>
                  <img className="icon-arrow" src={arrowWhite} alt="" />
                </button>
              </div>
            </form>

            <div className="checkout__cartItems">
              {loading ? (
                <CheckoutBlockSkeleton />
              ) : (
                <div className="checkout__block">
                  <div className="checkout__blockTitle">
                    <h2 className="checkout__ttl title-3">
                      {t("pages.checkout.order")}
                    </h2>
                  </div>

                  <hr className="checkout__line" />

                  <div className="checkout__final-item">
                    {bucket?.cart_items.map((item) => (
                      <div key={item.id} className="checkout__item">
                        <Link
                          key={item.id}
                          className="checkout__itemLeft"
                          to={`/product/${item.product_instance.product.id}`}
                        >
                          <img
                            className="checkout__img"
                            src={`https://52.207.220.16:9091/api/images/${item.product_instance.product.main_photo_id}`}
                            alt=""
                          />
                        </Link>

                        <div className="checkout__itemTop">
                          <div className="checkout__titles">
                            <span className="checkout__subtitle title-5">
                              {item.product_instance.product.producer.name}
                            </span>

                            <Link
                              key={item.id}
                              className="checkout__link"
                              to={`/product/${item.product_instance.product.id}`}
                            >
                              <h3 className="checkout__itemTitle title-4">
                                {item.product_instance.product.name}
                              </h3>
                            </Link>
                          </div>

                          <div className="checkout__bottom">
                            <div className="checkout__sizes">
                              <span className="checkout__sizeTitle title-5">
                                {t("pages.checkout.size")}
                              </span>
                              <p className="checkout__size title-5">
                                {item.product_instance.size.name}
                              </p>
                            </div>

                            <p className="checkout__price title-4">
                              ${item.product_instance.product.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="checkout__information">
                    <div className="checkout__info">
                      <p className="checkout__infoKey text-muted">
                        {totalAmount} {t("pages.checkout.items")}
                      </p>
                      <p className="checkout__infoValue">${totalPrice}</p>
                    </div>

                    <div className="checkout__info">
                      <p className="checkout__infoKey text-muted">
                        {t("pages.checkout.delivery")}:
                      </p>
                      <p className="checkout__infoValue">$100</p>
                    </div>
                  </div>

                  <hr className="checkout__line" />

                  <div className="checkout__subtotal">
                    <p className="checkout__title title-3">
                      {t("pages.checkout.total")}
                    </p>
                    <p className="checkout__priceTotal title-3">
                      ${totalPrice + 100}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
