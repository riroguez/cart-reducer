import { FaStar } from 'react-icons/fa6';
import { CartType } from '../types';
import { Dispatch } from 'react';
import { CartActions } from '../reducers/cart-reducer';

type ProductProps = {
  cart: CartType;
  dispatch: Dispatch<CartActions>;
};

const Product = ({ cart, dispatch }: ProductProps) => {
  return (
    <div className="product">
      <img src={`/img/products/${cart.image}.jpg`} alt="image product" />
      <div className="product-info">
        <h4>{cart.name}</h4>
        <p className="product-text">{cart.description}</p>

        <FaStar className="icon-star" />
        <FaStar className="icon-star" />
        <FaStar className="icon-star" />
        <FaStar className="icon-star" />
        <FaStar className="icon-star" />

        <div className="price">
          <span>$35.00</span>
          <p id="currentPrice">${cart.price}</p>
        </div>
        <button
          className="btn-add"
          type="button"
          onClick={() =>
            dispatch({ type: 'add-to-cart', payload: { item: cart } })
          }
        >
          Add Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
