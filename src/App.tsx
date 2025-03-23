import Banner from './components/Banner';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Product from './components/Product';
import { handlePurchase } from './components/Whatsapp';
import { useCartReducer } from './hooks/useCartReducer';

function App() {
  const { state, dispatch } = useCartReducer();
  // const init = (): CartState => {
  //   const storedCart = localStorage.getItem('cart');
  //   return {
  //     data: db,
  //     cart: storedCart ? JSON.parse(storedCart) : [],
  //   };
  // };

  // const [state, dispatch] = useReducer(cartReducer, initialState, init);

  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(state.cart));
  // }, [state.cart]);

  return (
    <>
      <Cart
        cart={state.cart}
        dispatch={dispatch}
        handlePurchase={handlePurchase}
      />

      <Banner />

      <main>
        <section className="products" id="listProducts">
          <h2>Products</h2>
          <div className="products-grid container">
            {state.data.map(cart => (
              <Product key={cart.id} cart={cart} dispatch={dispatch} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
