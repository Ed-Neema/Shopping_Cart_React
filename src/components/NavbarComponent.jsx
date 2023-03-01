import React, { useState, useContext } from "react";
import { Button, Container, Navbar, Modal, Nav } from "react-bootstrap";
import { CartContext } from "../cartContext";
import CartProducts from "./CartProducts";

const NavbarComponent = () => {
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const productsCount =  cart.items.reduce((sum,product)=> sum + product.quantity,0);

  // send request to backend when checkout is clicked
  const checkout = async() => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({items: cart.items})
    }).then((response)=>{ //take response from server and convert to json
      return response.json();

    }).then((response)=>{
      if(response.url){
        //if url exists (remember this is where we are sending the user to the session url in server.js),
        // forward user to stripe
        window.location.assign(response.url);
      }
    });
  }
  return (
    <div>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart: {productsCount} items</Button>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your Cart:</p>
              {cart.items.map((currentProduct, index) => (
                <CartProducts
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                  key={index}
                ></CartProducts>
              ))}
              <h1>Total: {cart.getTotalCost().toFixed(2)} </h1>
              <Button variant="success" onClick={checkout}>Checkout</Button>
            </>
          ) : (
            <h1>There are no items in your Cart 🙂</h1>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NavbarComponent;
