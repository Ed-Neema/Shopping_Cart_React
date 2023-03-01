import React, {useContext} from 'react'
import {Card, Button, Form, Row, Col} from 'react-bootstrap';
import { CartContext } from '../cartContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = (props) => {//props.product
    const product = props.product;
    const cart =  useContext(CartContext);
    const productQuantity = cart.getProductQuantity(product.id)
    const notifyAdd = () => {
      toast.success("Product added!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    const notifyRemove = () => {
      toast.warn("Product Removed!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
 
  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        {productQuantity > 0 ? (
          <>
            <Form as={Row}>
              <Form.Label column="true" sm="6">
                In Cart: {productQuantity}
              </Form.Label>
              <Col sm="6">
                <Button
                  sm="6"
                  className="mx-2"
                  onClick={() => {
                    cart.addOneToCart(product.id);
                    notifyAdd();
                  }}
                >
                  +
                </Button>
                <Button
                  sm="6"
                  className="mx-2"
                  onClick={() => {
                    cart.removeOneFromCart(product.id);
                    notifyRemove();
                  }}
                >
                  -
                </Button>
              </Col>
            </Form>
            <Button variant="danger" className='my-2' onClick={()=>{
              cart.deleteFromCart(product.id);
              notifyRemove();
            }}>Remove from Cart</Button>
          </>
        ) : (
          <Button
            variant="primary"
            onClick={() => {
              cart.addOneToCart(product.id);
              notifyAdd();
            }}
          >
            Add to Cart
          </Button>
        )}
      </Card.Body>
      <ToastContainer/>
    </Card>
  );
}

export default ProductCard
