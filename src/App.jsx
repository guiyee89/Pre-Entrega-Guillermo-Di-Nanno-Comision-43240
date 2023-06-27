import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { menuRoutes } from "./components/routes/menuRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {
              //Mapeamos la rutas desde menuRoutes.js
              menuRoutes.map(({ id, path, Element}) => (
                <Route key={id} path={path} element={<Element />}/>
              ))
            }
          </Route>
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </BrowserRouter> 
      <GlobalStyles />
    </>
  );
}

export default App;
