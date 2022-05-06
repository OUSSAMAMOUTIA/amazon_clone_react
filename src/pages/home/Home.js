import Product from "../../component/product/Product.js";
import "./Home.css";
function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
        <div className="home_row">
          <Product
            id="2654788"
            image="https://m.media-amazon.com/images/I/51CTIr1bJxL.jpg"
            title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses"
            price={29.99}
            rating={3}
          />
          <Product
            id="5269850"
            image="https://m.media-amazon.com/images/I/7194JkRlfZL._AC_SL1500_.jpg"
            title="KICHOT Robot Pâtissier 1800W, 10L Boîtier Métallique Robot avec Kit Pâtisserie, Batteur De Cuisine avec Crochet À Pâte, Batteur Blat, Fouet en Fil Et Protection Contre Les Éclaboussures (Gris)"
            price={179.99}
            rating={4}
          />
        </div>
        <div className="home_row">
          <Product
            id="4903850"
            image="https://m.media-amazon.com/images/I/81rus0UFhsL._AC_SL1500_.jpg"
            title="Samsung C49RG90, Ecran PC Gaming incurvé, Format Ultra-Large, Dalle VA 49"
            price={602}
            rating={5}
          />
          <Product
            id="8545681"
            image="https://m.media-amazon.com/images/I/61ab8NxB1JS._AC_SL1000_.jpg"
            title="Echo Dot (3ème génération), Enceinte connectée avec Alexa, Tissu anthracite"
            price={420.36}
            rating={5}
          />
          <Product
            id="5623850"
            image="https://m.media-amazon.com/images/I/81ilcUQUC-L._AC_SL1500_.jpg"
            title="Apple iPad Pro (11 Pouces, Wi-FI, 512 Go) - Gris sidéral (2e génération) (Reconditionné)"
            price={756.25}
            rating={4}
          />
        </div>
        <div className="home_row">
          <Product
            id="4521850"
            image="https://m.media-amazon.com/images/I/81OQLYp-seL._AC_SL1500_.jpg"
            title="SAMSUNG UE32T4305 TV LED HD Ready 32 pouces Smart TV [Classe énergétique F]"
            price={2738}
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}
export default Home;
