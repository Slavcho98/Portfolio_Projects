import Banner from "./components/Banner/Banner";
import Places from "./components/PlacesContainer/PlacesContainer"
import DetailsBlock from "./components/DetailsBlock/DetailsBlock";
import Footer from "./components/Footer/Footer"
import "./css/main.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <Banner />
      <DetailsBlock imageUrl="https://picsum.photos/id/1018/750/750" heading="stories of adventure"/>
      <Places />
      <DetailsBlock imageUrl="https://picsum.photos/id/1051/750/750" heading="popular adventures"/>
      <Footer/>
    </div>
  );
};

export default App;