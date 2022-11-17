import { Button, Navbar, Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import { CartContext } from "../../contexts/cartContext";
import CartProduct from "../CartProduct";
import AsaLogo from "../../assets/AsaLogo.png";
import "./navbar.scss";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Avatar from "@mui/material/Avatar";
import { useUserContext } from "../../contexts/userContext";

function openSidebar() {
  document.body.classList += " sideBar-open";
}
export const closeSidebar = () => {
  document.body.classList.remove("sideBar-open");
};

function NavbarComponent() {
  const { user, logoutUser, setAuthCondition } = useUserContext();
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <>
      <Navbar expand="sm">
        <div className="navbar-wrapper">
          <div className="navbar-left">
            <button className="sidebar-btn btn">
              <MenuIcon
                onClick={openSidebar}
                className="logo-burger burger-open"
              />
              <MenuOpenIcon
                onClick={closeSidebar}
                className="logo-burger burger-close"
              />
            </button>
            <Link to="/">
              <figure className="logo">
                <img src={AsaLogo} alt="" />
              </figure>
            </Link>
          </div>
          <div className="navbar-right">
            {user ? (
              <div className="userIsIn">
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Button onClick={handleShow}>
                    Cart ({productsCount} Items)
                  </Button>
                </Navbar.Collapse>
                <Avatar
                  sx={{ width: 40, height: 40 }}
                  className="avator"
                  // onClick={() => setOpen(!open)}
                >
                  {/* {user &&
                    user.displayName &&
                    user?.displayName[0]?.toUpperCase()} */}
                </Avatar>
              </div>
            ) : (
              <div className="userIsNotIn">
                <button
                  className="btn btn_secondary"
                  onClick={() =>
                    setAuthCondition((prevState) => ({
                      ...prevState,
                      signIn: true,
                    }))
                  }
                >
                  Login
                </button>
                <button
                  className="btn btn_primary"
                  onClick={() =>
                    setAuthCondition((prevState) => ({
                      ...prevState,
                      signUp: true,
                    }))
                  }
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((currentProduct, idx) => (
                <CartProduct
                  key={idx}
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                ></CartProduct>
              ))}
              <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
              <Button variant="success" onClick={checkout}>
                Purchase items!
              </Button>
            </>
          ) : (
            <h1>There are no items in your cart!</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarComponent;
