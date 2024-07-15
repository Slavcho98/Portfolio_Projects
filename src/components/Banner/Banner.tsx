import React from "react";
import styles from "./Banner.module.scss";

const Banner: React.FC = () => {
  return (
    <div className={styles.banner}> 
      <div className={styles.banner_text}>
        <p>summer vacation</p>
        <h1>Nomad nation</h1>
        <button>read more</button>
      </div>
    </div>
  );
};

export default Banner;
