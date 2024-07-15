import React from "react";
import styles from "../PlacesContainer/_places.module.scss"
interface PlaceProps {
  id: number;
  place: string;
  desc: string;
  img: string;
}

const Place: React.FC<PlaceProps> = ({ place, desc, img }) => {
  return (

    <>
    <div className={styles.overlay}></div>
      <img src={img} className="card-img-top" alt={place} />
      <div className={styles.card_body}>
        <h2 className="card-title">{place}</h2>
        <p className="card-text">{desc}</p>
      </div>
    </>
  );
};

export default Place;
