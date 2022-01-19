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
            </Navigation>        

            </Main>
    );
}

export default Header;