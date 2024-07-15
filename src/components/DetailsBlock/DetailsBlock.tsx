import React from "react";
import styles from "./DetailsBlock.module.scss";

interface DetailsBlockProps {
  imageUrl: string;
  heading: string;
}

const DetailsBlock: React.FC<DetailsBlockProps> = ({ imageUrl, heading }) => {
  return (
    <div className={styles.details_container}>
      <div className={styles.text_box}>
        <p className={styles.about}>About</p>
        <h2>{heading}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aut
          ab vitae, amet est dignissimos laboriosam doloribus ducimus. Natus
          eligendi amet delectus facere pariatur assumenda iusto. Nostrum
          quisquam neque ipsa?
        </p>
        <p className={styles.m_top}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          atque nam consequuntur esse? Fugit, voluptas ipsum?
        </p>
      </div>
      <div className={styles.img_box}>
        <img src={imageUrl} alt="road" />
      </div>
    </div>
  );
};

export default DetailsBlock;