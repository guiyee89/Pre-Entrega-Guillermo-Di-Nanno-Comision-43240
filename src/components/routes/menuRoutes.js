import { LoginContainer } from "../dashboard/authentication/login/LoginContainer";
import { SignUpContainer } from "../dashboard/authentication/signup/SignUpContainer";
import { CartContainer } from "../pages/cart/CartContainer";
import { CheckoutContainer } from "../pages/checkout/CheckoutContainer";
import { ItemDetailContainer } from "../pages/itemDetail/ItemDetailContainer";
import { ItemListContainer } from "../pages/itemListContainer/ItemListContainer";

export const menuRoutes = [
    {
        id: "home",
        path: "/",
        Element: ItemListContainer
    },
    {
        id: "category",
        path: "/category/:categoryName",
        Element: ItemListContainer
    },
    {
        id: "category",
        path: "/item-details/:id",
        Element: ItemDetailContainer
    },
    {
        id: "cart",
        path: "/cart",
        Element: CartContainer
    },
    {
        id: "checkout",
        path: "/checkout",
        Element: CheckoutContainer
    },
    {
        id: "firebase-auth",
        path: "/login",
        Element: LoginContainer
    },
    {
        id: "firebase-auth",
        path: "/signup",
        Element: SignUpContainer
    }
]