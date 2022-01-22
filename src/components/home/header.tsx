import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logout } from '../../utils/api';

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

const Title = styled.h1``;

const LogSignWrapper = styled.div`
  display: ${({ show }: { show: boolean }) => (show ? 'initial' : 'none')};
`;

function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  function handleLogout() {
    console.log('Is Logging Out');
    logout();
  }
  return (
    <Main>
      <Title>Coffee Hour</Title>
      <Navigation>
        <a href="#About">About</a>
        <a href="#Location">Location</a>
        <a href="#Store">Store</a>
        <LogSignWrapper show={!isLoggedIn}>
          <Link to="/arc-cafe-frontend/login">Login</Link>
        </LogSignWrapper>
        <LogSignWrapper show={!isLoggedIn}>
          <Link to="/arc-cafe-frontend/signup">Signup</Link>
        </LogSignWrapper>
        <LogSignWrapper show={isLoggedIn}>
          <button onClick={handleLogout}>Log Out</button>
        </LogSignWrapper>
      </Navigation>
    </Main>
  );
}

export default Header;
