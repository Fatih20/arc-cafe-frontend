import styled from 'styled-components';

import promotionalBackground from '../../assets/header-bg.jpg';
import coffeeImage from '../../assets/header-cropped.png';
import coffeeHour from '../../assets/coffeehour.png';

const Main = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  height: 92.5vh;
  padding: 1rem;
`;

const MainWrapper = styled.div`
  flex-wrap: wrap;
  flex-direction: row;
  height: calc(92.5vh - 10vh);
  @media (min-width: 425px) {
    flex-direction: row;
  }
`;

const BackgroundImageMask = styled.div`
  -webkit-filter: blur(2px);
  -webkit-mask-image: linear-gradient(black, transparent);
  background-image: url(${process.env.PUBLIC_URL + '/header-bg.jpg'});
  background-position: center;
  background-size: cover;
  filter: blur(2px);
  mask-image: linear-gradient(
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.6),
    transparent 90%
  );
  height: 100%;
  left: 0;
  opacity: 0.4;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
  border: solid 1px black;
`;

const BackgroundImage = styled.img`
  -webkit-filter: blur(2px);
  filter: blur(2px);
  /* filter: grayscale(100%); */
  filter: saturate(0%);
  height: 100%;
  opacity: 0.4;
  z-index: -1;
  width: max-content;
`;

const TextContainer = styled.div`
  align-self: center;
  align-items: center;
  display: flex;
  font-size: 0.8rem;
  flex-direction: column;
  margin-bottom: 2rem;
  width: 50%;

  @media (min-width: 425px) {
    align-items: flex-start;
    text-align: left;
    width: 50%;
  }

  border: solid 1px black;
`;

const Title = styled.h2`
  font-size: 1.25em;
  font-weight: 700;
`;

const BiggerTitle = styled.h2`
  color: #8c7466;
  font-size: 2em;
  font-weight: 800;
`;

const SmallParagraph = styled.p`
  font-size: 0.8em;
`;

const ViewMenu = styled.button`
  background-color: #95c79d;
  border-radius: 1.5rem;
  color: white;
  font-size: 1rem;
  font-weight: 900;
  margin: 1rem 0 0 0;
  padding: 0.3rem 0.75rem;
  width: auto;
`;

const CoffeeImage = styled.img`
  align-self: flex-start;
  aspect-ratio: initial;

  @media (min-width: 425px) {
    max-width: 50%;
    height: auto;
    max-height: 40rem;
  }
`;

const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 10vh;
  gap: 0.5rem;

  & p {
    color: #8c7466;
  }

  /* border: solid 1px black; */
`;

const CoffeeLogo = styled.img`
  height: 50%;
  width: fit-content;
`;

function Promotional() {
  return (
    <Main>
      <BackgroundImageMask />
      <MainWrapper>
        <TextContainer>
          <Title>GOOD DAYS START WITH A</Title>
          <BiggerTitle>GOOD COFFEE</BiggerTitle>
          <SmallParagraph>
            A cup of coffee lasts only a moment, but it is that moment that
            makes your day better.
          </SmallParagraph>
          <ViewMenu>VIEW MENU</ViewMenu>
        </TextContainer>
      </MainWrapper>
      <LogoContainer>
        <CoffeeLogo src={coffeeHour} />
        <p>COFFEE HOUR</p>
      </LogoContainer>
    </Main>
  );
}

export default Promotional;
