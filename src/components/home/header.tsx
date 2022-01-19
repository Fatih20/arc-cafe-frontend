import styled from "styled-components";
import { Link } from "react-router-dom";

const Main = styled.div`
    align-items: center;
    background-color: green;
    color: white;
    display: flex;
    flex-direction: column;
`;

const Navigation = styled.div`
    display: flex;
    gap: 1rem;
`;

const Title = styled.h1`
    
`;

function Header() {
    return (
        <Main>
            <Title>Coffee Hour</Title>
            <Navigation>
                <a href="#About">About</a>
                <a href="#Location">Location</a>
                <a href="#Store">Store</a>
                <Link to="/arc-cafe-frontend/login">Login</Link>
                <Link to="/arc-cafe-frontend/signin">Signin</Link>
            </Navigation>        

            </Main>
    );
}

export default Header;