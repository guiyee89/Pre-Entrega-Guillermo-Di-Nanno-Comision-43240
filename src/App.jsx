import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { menuRoutes } from "./components/routes/menuRoutes";
import CartContextProvider from "./components/context/CartContext";
import SideMenuProvider from "./components/context/SideMenuContext";
import CarouselProvider from "./components/context/CarouselContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartContextProvider>
          {/* <CarouselProvider> */}
            <SideMenuProvider>
              <Routes>
                <Route element={<Layout />}>
                  {menuRoutes.map(({ id, path, Element }) => (
                    <Route key={id} path={path} element={<Element />} />
                  ))}
                </Route>
                <Route path="*" element={<h1>404 not found</h1>} />
              </Routes>
            </SideMenuProvider>
          {/* </CarouselProvider> */}
        </CartContextProvider>
      </BrowserRouter>

      <GlobalStyles />
    </>
  );
}

export default App;
