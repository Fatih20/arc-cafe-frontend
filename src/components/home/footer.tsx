import styled from 'styled-components';

import instagramLogo from '../../assets/instagram.png';
import twitterLogo from '../../assets/twitter.png';
import coffeeHour from '../../assets/coffeehour.png';

const Main = styled.div`
  align-items: center;
  background-color: white;
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

function Footer() {
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
    </Main>
  );
}

export default Footer;
