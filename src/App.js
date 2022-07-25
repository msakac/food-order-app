import React, { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const setShown = () =>
    setCartIsShown((isShown) => {
      return !isShown;
    });

  return (
    <CartProvider>
      {cartIsShown && <Cart onSetShown={setShown} />}
      <Header onSetShown={setShown} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
