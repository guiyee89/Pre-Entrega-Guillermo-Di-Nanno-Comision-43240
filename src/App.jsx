import GlobalStyles from "./GlobalStyles";
import { ItemListContainer } from "./components/pages/itemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/pages/itemDetail/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { CartContainer } from "./components/pages/cart/cartContainer";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={"/"} element={<ItemListContainer />} />
            <Route path={"/category/:categoryName"} element={<ItemListContainer />} />
            <Route path="/item-details/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<CartContainer/>} />
            <Route path="*" element={<h1>404 not found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter> 
      <GlobalStyles />
    </>
  );
}

export default App;
