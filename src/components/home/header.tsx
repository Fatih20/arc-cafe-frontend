import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/api';
import { useQueryClient, useMutation } from 'react-query';
import { useIsLoggedIn } from '../../context/isLoggedIn';

import { getItemsInCart } from '../../utils/api';

import blackLogo from '../../assets/coffeehour_black.png';
import cartLogo from '../../assets/shopping-bag-cropped.png';

import { BASE_URL } from '../../routes';

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
    navigate(`${BASE_URL}/`);
  }

  function navigateToMenu() {
    navigate(`${BASE_URL}/menu`);
  }

  async function handleAccessingCart() {
    try {
      console.log(isLoggedIn);
      const userCart = await getItemsInCart();
      console.log(userCart);
    } catch (error) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
        if (message === 'Request failed with status code 401') {
          navigate(`${BASE_URL}/signup/`);
        }
      }
    }
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
      <LogoButton onClick={() => navigate(`${BASE_URL}/basket/`)}>
        <HeaderLogo src={cartLogo} />
      </LogoButton>
    </Main>
  );
}

export default Header;
