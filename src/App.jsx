import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { menuRoutes } from "./components/routes/menuRoutes";
import CartContextProvider from "./components/context/CartContext";
import GlobalToolsProvider from "./components/context/GlobalToolsContext";
import AuthContextProvider from "./components/context/AuthContext";
import { AppRounter } from "./components/routes/AppRounter";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartContextProvider>
          <AuthContextProvider>
            <GlobalToolsProvider>
              <AppRounter />
            </GlobalToolsProvider>
          </AuthContextProvider>
        </CartContextProvider>
      </BrowserRouter>
      <GlobalStyles />
    </>
  );
}

export default App;
