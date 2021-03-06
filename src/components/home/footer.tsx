import styled from 'styled-components';
import { logout } from '../../utils/api';
import { useQueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../routes';

import useMe from '../../customHooks/useMe';

import instagramLogo from '../../assets/instagram.png';
import twitterLogo from '../../assets/twitter.png';
import coffeeHour from '../../assets/coffeehour.png';

interface ISignOutButton {
  show: boolean;
}

const Main = styled.div`
  align-items: center;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const MostWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 1rem;

  @media (min-width: 450px) {
    flex-direction: row;
  }
`;

const SectionContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-width: 8.5rem;

  & > p {
    font-size: 0.75rem;
  }

  /* border: solid 1px black; */
`;

const SocmedContainer = styled(SectionContainer)`
  flex-direction: row;
  width: 100%;
  flex-grow: 1;
  max-width: 15rem;
  /* border: solid 1px black; */
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const SocialMediaLink = styled.a`
  & img {
    height: 2rem;
  }
`;

const BottomCopyright = styled.p`
  font-size: 0.7rem;
`;

const LogoutButton = styled.button<ISignOutButton>`
  display: ${({ show }) => (show ? 'initial' : 'none')};
`;

function Footer() {
  const queryClient = useQueryClient();
  const { user, isLoading, error } = useMe();
  const navigate = useNavigate();
  const { mutateAsync: logoutAndRefetch } = useMutation(logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });

  return (
    <Main>
      <MostWrapper>
        <SectionContainer>
          <p>40111</p>
          <p>coffeehour@cafe.co.id</p>
          <p>022 88885478</p>
        </SectionContainer>
        <SocmedContainer>
          <SocialMediaLink href="#">
            <img src={instagramLogo} />
          </SocialMediaLink>
          <Spacer />
          <SocialMediaLink href="#">
            <img src={coffeeHour} />
          </SocialMediaLink>
          <Spacer />
          <SocialMediaLink href="#">
            <img src={twitterLogo} />
          </SocialMediaLink>
        </SocmedContainer>
        <SectionContainer>
          <p>Braga</p>
          <p>Jl. Braga No. 21</p>
          <p>Bandung</p>
        </SectionContainer>
      </MostWrapper>
      <BottomCopyright>&copy; 2022 | COFFEEHOUR</BottomCopyright>
      <LogoutButton
        show={error === null ? true : false}
        onClick={async () => {
          await logoutAndRefetch();
          window.scrollTo(0, 0);
          navigate(`${BASE_URL}`);
          // console.log("Should've been invalidated");
        }}
      >
        Sign Out
      </LogoutButton>
    </Main>
  );
}

export default Footer;
