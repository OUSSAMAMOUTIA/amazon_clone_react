import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { ShoppingBasket } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider.js";
import { auth } from "../../helpers/firebase.js";
function Header() {
  const [{ basket, user }] = useStateValue();
  const handleAuthentification = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          className="header_logo"
          alt="amazon_logo"
        />
      </Link>

      <div className="header_search">
        <input type="text" className="header_search_input" />
      </div>
      <SearchIcon className="header_search_icon" />
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link to={!user && "/login"}>
          <Options
            title1={!user ? "Hello Guest" : "Hello " + user.email}
            title2={user ? "Sign Out" : "Sign In"}
            onClick={handleAuthentification}
          />
        </Link>
        <Link to="/orders">
          <Options title1="Returns" title2="& Orders" />
        </Link>
        <Options title1="Your" title2="Prime" />
        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasket />
            <span style={{ fontSize: 12 }} className="header_basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
const Options = ({ title1, title2, onClick }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: "white",
          marginLeft: 10,
          marginRight: 10,
        }}
        onClick={onClick}
      >
        <span style={{ fontSize: 10 }}>{title1}</span>

        <span style={{ fontSize: 13, fontWeight: 800 }}>{title2}</span>
      </div>
    </>
  );
};
export default Header;
