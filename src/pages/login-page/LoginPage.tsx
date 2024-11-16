import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../api/auth";

import { useAuthContext } from "../../context/AuthContext";

import { AuthData } from "../../types/Auth";

import MySwal from "../../shared/utils/myswal";

import logo from "../../assets/img/logo.svg";

import styles from "./LoginPage.module.scss";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth, signin } = useAuthContext();

  const [formData, setFormData] = useState<AuthData>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(formData);
      signin();
      await MySwal.fire({
        title: "Success!",
        text: "Login successful. Redirecting to the homepage...",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error during registration:", error);
      await MySwal.fire({
        title: "Error",
        text: "An error occurred during login.",
        icon: "error",
        confirmButtonText: "Try Again",
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
              <h1 className={`${styles.form__title} title-2`}>Login</h1>
              <p className="text-muted">
                Don't have an account?{" "}
                <Link to="/register" className={styles.form__link}>
                  Register here
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
                type="password"
                className={`${styles.form__input} input`}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.form__button}>
              <div className={`${styles.form__button} button-wrapper`}>
                <button className="button button_lg button_default button_full-size" type="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
