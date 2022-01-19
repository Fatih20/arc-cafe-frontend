import Header from "./home/header";
import Promotional from "./home/promotional";
import About from "./home/about";
import Location from "./home/location";
import Store from "./home/store";
import Footer from "./home/footer";
import useMe from "../customHooks/useMe";
import { useNavigate } from "react-router-dom";

function Main() {
    const {user, error} = useMe();
    const navigate = useNavigate();
    if (error) {
        navigate("/arc-cafe-frontend/login")
    }
    console.log(user)
    return (
        <>
            <Header />
            <Promotional />
            <About />
            <Location />
            <Store />
            <Footer />
        </>
    )    
}

export default Main;