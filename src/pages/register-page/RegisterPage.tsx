import { ChangeEvent, FormEvent, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../../api/auth";

import { useAuthContext } from "../../context/AuthContext";

import MySwal from "../../shared/utils/myswal";

import logo from "../../assets/img/logo.svg";

import styles from "./RegisterPage.module.scss";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth, signin } = useAuthContext();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (ref.current?.checked) {
      try {
        await register(formData);
        signin();
        await MySwal.fire({
          title: "Success!",
          text: "Registration successful. Redirecting to the homepage...",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error during registration:", error);
        await MySwal.fire({
          title: "Error",
          text: "An error occurred during registration.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } else {
      await MySwal.fire({
        title: "Warning",
        text: "You must agree to the terms and conditions.",
        icon: "warning",
        confirmButtonText: "Got it",
      });
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <section className={styles.authorization}>
      <div className={styles.authorization__container}>
        <div className={styles.authorization__body}>
          <form className={`${styles.authorization__form} ${styles.form}`} onSubmit={handleSubmit}>
          <div className={styles.form__title}>
            <img className={styles.form__logo} src={logo} alt="logo" />
            <h1 className={`${styles.form__title} title-2`}>Registration</h1>
            <p className="text-muted">
              Already have an account?{" "}
              <Link to="/login" className={styles.form__link}>
                Log in
              </Link>
            </p>
          </div>
            <div className={`${styles.form__group} group`}>
              <input
                type="text"
                className={`${styles.form__input} input`}
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                className={`${styles.form__input} input`}
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                className={`${styles.form__input} input`}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={`${styles.form__checkbox} checkbox`}>
              <input type="checkbox" className="checkbox__index" id="agree" ref={ref} />
              <label className="checkbox__label" htmlFor="agree">
                I have read and agree to the terms & conditions and privacy policy
              </label>
            </div>
            <div className={styles.form__button}>
              <button className="button button_lg button_default button_full-size" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
