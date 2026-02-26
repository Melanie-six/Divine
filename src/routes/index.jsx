import FrontendLayout from "../layout/FrontendLayout";
import Home from "../views/frontend/Home";
import About from "../views/frontend/About";
import Products from "../views/frontend/Products";
import Cart from "../views/frontend/Cart";
import Login from "../views/frontend/Login";
import NotFound from "../views/frontend/NotFound";
import AdminOrder from "../views/admin/AdminOrder";
import AdminProduct from "../views/admin/AdminProduct";
import AdminLayout from "../layout/AdminLayout";
import SingleProduct from "../views/frontend/SingleProduct";





const routes = [
    {
        path: "/",
        element: <FrontendLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "products",
                element: <Products />,
            },
            {
                path: "product/:id",
                element: <SingleProduct />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "login",
                element: <Login />,
            },
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "products",
                element: <AdminProduct />,
            },
            {
                path: "orders",
                element: <AdminOrder />,
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
];

export default routes;