import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logout } from '../../utils/api';
import { useQueryClient, useMutation } from 'react-query';
import { useIsLoggedIn } from '../../context/isLoggedIn';

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

function Header() {
  const queryClient = useQueryClient();
  const isLoggedIn = useIsLoggedIn();

  const { mutateAsync: logoutAndRefetch } = useMutation(logout, {
    onSuccess: () => queryClient.invalidateQueries('me'),
  });

  async function handleLogout() {
    logoutAndRefetch();
  }

  return (
    <Main>
      <Title>Coffee Hour</Title>
      <Navigation>
        <a href="#About">About</a>
        <a href="#Location">Location</a>
        <a href="#Store">Store</a>
        <LogSignWrapper show={!isLoggedIn}>
          <Link to="/arc-cafe/login">Login</Link>
        </LogSignWrapper>
        <LogSignWrapper show={!isLoggedIn}>
          <Link to="/arc-cafe/signup">Signup</Link>
        </LogSignWrapper>
        <LogSignWrapper show={isLoggedIn}>
          <button onClick={handleLogout}>Log Out</button>
        </LogSignWrapper>
      </Navigation>
    </Main>
  );
}

export default Header;
