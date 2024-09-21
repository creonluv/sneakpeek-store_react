import { Aside } from "../../components/catalog/aside";
import styles from "./CatalogPage.module.scss";

export const CatalogPage = () => {
  return (
    <section className={styles.catalogpage}>
      <div className={styles.catalogpage__body}>
        <div className={styles.catalogpage__aside}>
          <Aside />
        </div>
        <div className={styles.catalogpage__products}></div>
      </div>
    </section>
  );
};
