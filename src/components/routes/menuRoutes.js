import { CartContainer } from "../pages/cart/CartContainer";
import { CheckoutContainer } from "../pages/checkout/CheckoutContainer";
import { AdminDashboard } from "../pages/dashboard-auth/admin/AdminDashboard";
import { UserOrders } from "../pages/dashboard-auth/user/UserOrders";
import { ItemDetailContainer } from "../pages/itemDetail/ItemDetailContainer";
import { ItemListContainer } from "../pages/itemListContainer/ItemListContainer";
import { LandingPage } from "../pages/landingPage/LandingPage";


export const menuRoutes = [
    {
        id: "home",
        path: "/",
        Element: LandingPage
    },
    {
        id: "all-products",
        path: "/all-products",
        Element: ItemListContainer,
    },
    {
        id: "category",
        path: "/category/:categoryName",
        Element: ItemListContainer
    },
    {
        id: "userId",
        path: "/userId/:userIdItem",
        Element: ItemListContainer
    },
    {
        id: "color",
        path: "/color/:colorItem",
        Element: ItemListContainer
    },
    {
        id: "detail",
        path: "/item-details/:id",
        Element: ItemDetailContainer
    },
    {
        id: "cart",
        path: "/cart",
        Element: CartContainer
    },
    {
        id: "Checkout",
        path: "/Checkout",
        Element: CheckoutContainer
    },
    {
        id: "userOrders",
        path: "/user-orders",
        Element: UserOrders
    },
    {
        id: "dashboard",
        path: "/dashboard",
        Element: AdminDashboard
    },
]