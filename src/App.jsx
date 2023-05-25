
import './App.css'
import NavBar from './components/layout/navbar/NavBar'
import { ItemListContainer } from './components/pages/itemListContainer/ItemListContainer'

function App() {
  

  return (
    <>
      <NavBar />
      <ItemListContainer greeting={"BienveniDos"}/>
    </>
  )
}

export default App
