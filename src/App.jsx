import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { menuRoutes } from "./components/routes/menuRoutes";
import CartContextProvider from "./components/context/CartContext";
import SideCartProvider from "./components/context/SideCartContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartContextProvider>
          <SideCartProvider>
            <Routes>
              <Route element={<Layout />}>
                {menuRoutes.map(({ id, path, Element }) => (
                  <Route key={id} path={path} element={<Element />} />
                ))}
              </Route>
              <Route path="*" element={<h1>404 not found</h1>} />
            </Routes>
          </SideCartProvider>
        </CartContextProvider>
      </BrowserRouter>

      <GlobalStyles />
    </>
  );
}

export default App;
