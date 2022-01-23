import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/api';
import { useQueryClient, useMutation } from 'react-query';
import { useIsLoggedIn } from '../../context/isLoggedIn';

import blackLogo from '../../assets/coffeehour_black.png';
import cartLogo from '../../assets/shopping-bag-cropped.png';

const Main = styled.div`
  align-items: center;
  background-color: #8c7466;
  color: white;
  display: flex;
  height: 7.5vh;
  padding: 0.95rem 1rem;
  position: relative;
`;

const Title = styled.h1``;

const LogoButton = styled.button``;

const HeaderLogo = styled.img`
  color: white;
  display: inline-block;
  filter: invert();
  height: 1rem;
`;

const Navigation = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  gap: 1rem;
`;

const NavigationButton = styled.a`
  font-size: 0.8rem;
`;

function Header() {
  const queryClient = useQueryClient();
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();

  const { mutateAsync: logoutAndRefetch } = useMutation(logout, {
    onSuccess: () => queryClient.invalidateQueries('me'),
  });

  async function handleLogout() {
    logoutAndRefetch();
  }

  function navigateToHome() {
    navigate('/');
  }

  function navigateToMenu() {
    navigate('/menu');
  }

  return (
    <Main>
      <LogoButton onClick={navigateToHome}>
        <HeaderLogo src={blackLogo} />
      </LogoButton>
      <Navigation>
        <NavigationButton onClick={navigateToHome} href="#About">
          ABOUT
        </NavigationButton>
        <NavigationButton onClick={navigateToHome} href="#Store">
          STORE
        </NavigationButton>
        <NavigationButton onClick={navigateToMenu} href="">
          MENU
        </NavigationButton>
      </Navigation>
      <LogoButton
        onClick={isLoggedIn ? navigateToMenu : () => navigate('/signup')}
      >
        <HeaderLogo src={cartLogo} />
      </LogoButton>
    </Main>
  );
}

export default Header;
