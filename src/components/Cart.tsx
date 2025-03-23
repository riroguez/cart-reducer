import { FaCartShopping, FaMagnifyingGlass } from 'react-icons/fa6';
import { CartItem } from '../types';
import { Dispatch, useMemo } from 'react';
import { CartActions } from '../reducers/cart-reducer';

type CartProps = {
  cart: CartItem[];
  dispatch: Dispatch<CartActions>;
  handlePurchase: (cart: CartItem[], dispatch: Dispatch<CartActions>) => void;
};

const Cart = ({ cart, dispatch, handlePurchase }: CartProps) => {
  const isEmpty = cart.length === 0;
  const countCart = cart.length;

  const totals = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return (
    <header className="header">
      <div className="header-content container">
        <nav className="navigation">
          <a href="/">
            <p className="logotipo">
              Shopping<span>Cart</span>
            </p>
          </a>

          <div className="btn-cart">
            <button type="button">
              <FaCartShopping className="icon-cart" />
              <i className="fa-solid fa-cart-shopping icon-cart"></i>
            </button>
            <span id="cartCount">{countCart}</span>

            <div className="cart">
              <div className="cart-responsive">
                {isEmpty ? (
                  <p className="empty-cart">The cart is empty</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody id="contentProducts">
                      {cart.map(item => (
                        <tr key={item.id}>
                          <td>
                            <img
                              src={`/img/products/${item.image}.jpg`}
                              alt=""
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td className="quantity">
                            <button
                              type="button"
                              onClick={() =>
                                dispatch({
                                  type: 'decrease-quantity',
                                  payload: { id: item.id },
                                })
                              }
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() =>
                                dispatch({
                                  type: 'increase-quantity',
                                  payload: { id: item.id },
                                })
                              }
                            >
                              +
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                dispatch({
                                  type: 'destroy-item',
                                  payload: { id: item.id },
                                })
                              }
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    <tfoot>
                      <tr>
                        <td colSpan={5} className="total">
                          <h4 className="heading-total">
                            Total: <span id="total">${totals.toFixed(2)}</span>
                          </h4>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={5}>
                          <button
                            type="button"
                            id="emptyCart"
                            onClick={() => dispatch({ type: 'empty-cart' })}
                          >
                            Empty Cart
                          </button>
                          <button
                            type="button"
                            className="buy"
                            onClick={() => handlePurchase(cart, dispatch)}
                          >
                            Buy Now
                          </button>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      <form className="form-header">
        <input type="search" name="search" placeholder="Search..." />
        <button type="submit">
          <FaMagnifyingGlass className="icon-glass" />
        </button>
      </form>
    </header>
  );
};

export default Cart;
