import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router";

function AdminLayout() {
    return (<>
        <Header />
        <h2>AdminLayout</h2>
        <Outlet />
        <Footer/>

    </>)
};
export default AdminLayout;