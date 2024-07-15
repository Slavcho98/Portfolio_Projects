import React from "react";
import Place from "../Places/Place";
import styles from "./_places.module.scss";

export interface PlaceType {
  id: number;
  place: string;
  desc: string;
  img: string;
}

interface State {
  places: PlaceType[];
}

class PlacesContainer extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidMount(): void {
    fetch("http://localhost:5001/places")
      .then((res) => res.json())
      .then((data: PlaceType[]) => {
        this.setState({ places: data });
      });
  }

  render() {
    return (
      <>
        <div className={styles.container}>
          {this.state.places.map((place) => (
            <div className={styles.col} key={place.id}>
              <Place
                id={place.id}
                place={place.place}
                desc={place.desc}
                img={place.img}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default PlacesContainer;
