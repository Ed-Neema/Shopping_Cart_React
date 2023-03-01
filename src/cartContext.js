import { createContext, useState } from "react";
import { productsArray, getProductData } from "./productStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  removeOneFromCart: () => {},
});

export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);


    // [{id:1, quantity:2}]
    function getProductQuantity(id){
        const quantity = cartProducts.find(product => product.id === id)?.quantity
        if(quantity === undefined){
            return 0;
        }
        console.log(quantity);
        return quantity;
    }
    function addOneToCart(id){
        // get previous quantity of the product
        const quantity = getProductQuantity(id);
        if(quantity ===  0){
            setCartProducts([...cartProducts, { id: id, quantity: 1 }]);    
        } else{
            setCartProducts(
                cartProducts.map(product => product.id === id ? { ...product, quantity: product.quantity + 1} : product)
            )
        }
           
    }

    function deleteFromCart(id){
        const newCart = cartProducts.filter(item=> item.id !== id);
        setCartProducts(newCart);
    }

    function removeOneFromCart(id){
        const quantity = getProductQuantity(id);
        if(quantity === 1){
            deleteFromCart(id);
        } else{
             setCartProducts(
               cartProducts.map((product) =>
                 product.id === id
                   ? { ...product, quantity: product.quantity - 1 }
                   : product
               )
             );
        }
    }

    function getTotalCost(){

        let TotalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id);
            TotalCost += (productData.price * cartItem.quantity);
        })
        return TotalCost
        
    }


    const contextValue = {
      items: cartProducts,
      getProductQuantity,
      addOneToCart,
      deleteFromCart,
      getTotalCost,
      removeOneFromCart,
    };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
