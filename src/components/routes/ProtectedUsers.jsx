import {useContext} from "react"
import { AuthContext } from "../context/AuthContext"

export const ProtectedUsers = () => {

    const {isLogged} =useContext(AuthContext)

  return (
    <div>ProtectedUsers</div>
  )
}
