import { CartContainer } from "../pages/cart/CartContainer";
import { ItemDetailContainer } from "../pages/itemDetail/ItemDetailContainer";
import { ItemListContainer } from "../pages/itemListContainer/ItemListContainer";

export const menuRoutes = [
    {
        id:"home",
        path:"/",
        Element: ItemListContainer
    },
    {
        id:"category",
        path: "/category/:categoryName",
        Element: ItemListContainer
    },
    {
        id:"category",
        path:"/item-details/:id",
        Element: ItemDetailContainer
    },
    {
        id:"cart",
        path:"/cart",
        Element: CartContainer
    }
]