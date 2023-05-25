
import './App.css'
import GlobalStyles from './GlobalStyles'
import NavBar from './components/layout/navbar/NavBar'
import { ItemListContainer } from './components/pages/itemListContainer/ItemListContainer'

function App() {
  

  return (
    <>
      <NavBar />
      <ItemListContainer greeting={"BienveniDos"}/>
      <GlobalStyles />
    </>
  )
}

export default App
