import GlobalStyles from "./GlobalStyles";
import { ItemListContainer } from "./components/pages/itemListContainer/ItemListContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductDetailContainer } from "./components/pages/productDetail/ProductDetailContainer";
import { CartWidget } from "./components/common/cartWidget/CartWidget";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={"/"} element={<ItemListContainer />} />
            <Route path={"/category/:categoryName"} element={<ItemListContainer />} />
            <Route path="/productDetail/:id" element={<ProductDetailContainer />} />
            <Route path="/cart" element={<CartWidget />} />
            <Route path="*" element={<h1>404 not found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
  
      <GlobalStyles />
    </>
  );
}

export default App;
