import React from 'react'
import {Row,Col} from 'react-bootstrap';
import { productsArray } from '../productStore';
import ProductCard from '../components/ProductCard';

const Store = () => {
  return (
    <div>
      <h1 align="center" className='p-3'>Welcome to the store</h1>
      <Row xs={1} md={3} className="g-4">
        
        {productsArray.map((product, index) => {
            return (
              <Col key={index} align="center">
               <ProductCard product={product}/>
              </Col>
            );
        })}
      </Row>
    </div>
  )
}

export default Store
