import styled from "styled-components";

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

function Header() {
    return (
        <Main>
            <h1>Coffee Hour</h1>
            <Navigation>
                <a href="#Footer">About</a>
                <a href="">Store</a>
                <a href="">Menu</a>
            </Navigation>        

            </Main>
    );
}

export default Header;