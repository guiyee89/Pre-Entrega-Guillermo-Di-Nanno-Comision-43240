import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { menuRoutes } from "./components/routes/menuRoutes";
import CartContextProvider from "./components/context/CartContext";
import CarouselProvider from "./components/context/CarouselContext";
import GlobalToolsProvider from "./components/context/GlobalToolsContext";


function App() {
  return (
    <>
      <BrowserRouter>
        <CartContextProvider>
          <CarouselProvider>
            <GlobalToolsProvider>
              <Routes>
                <Route element={<Layout />}>
                  {menuRoutes.map(({ id, path, Element }) => (
                    <Route key={id} path={path} element={<Element />} />
                  ))}
                </Route>
                <Route path="*" element={<h1>404 not found</h1>} />
              </Routes>
            </GlobalToolsProvider>
          </CarouselProvider>
        </CartContextProvider>
      </BrowserRouter>

      <GlobalStyles />
    </>
  );
}

export default App;
