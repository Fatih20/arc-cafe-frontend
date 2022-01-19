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
                <a href="#About">About</a>
                <a href="#Location">Location</a>
                <a href="#Store">Store</a>
                <a href="#Footer">About</a>
            </Navigation>        

            </Main>
    );
}

export default Header;