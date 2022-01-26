import styled from 'styled-components';

import promotionalBackground from '../../assets/header-bg.jpg';
import coffeeImage from '../../assets/header-cropped.png';
import coffeeHour from '../../assets/coffeehour.png';

const Main = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 5fr 5fr;
  grid-template-rows: 30% 60% 10%;
  justify-items: center;
  position: relative;
  height: 92.5vh;
  padding: 2rem 1rem 1rem 1rem;

  /* border: solid 1px black; */
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
  /* border: solid 1px black; */
`;

const TextContainer = styled.div`
  align-self: start;
  align-items: center;
  display: flex;
  font-size: 0.85rem;
  flex-direction: column;
  grid-column: 1/3;
  grid-row: 1;
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: 600px) {
    align-items: start;
    font-size: 1.25rem;
    grid-column: 1;
    grid-row: 1/3;
    text-align: left;
  }
  /* border: solid 1px black; */
`;

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: 700;
`;

const BiggerTitle = styled.h2`
  color: #8c7466;
  font-size: 2.25em;
  font-weight: 800;
`;

const SmallParagraph = styled.p`
  font-size: 1em;
`;

const ViewMenu = styled.button`
  background-color: #95c79d;
  border-radius: 1.5rem;
  color: white;
  font-size: 1em;
  font-weight: 900;
  margin: 0.5rem 0 0 0;
  padding: 0.3rem 0.75rem;
  width: auto;
`;

const CoffeeImage = styled.img`
  aspect-ratio: initial;
  grid-column: 1/3;
  grid-row: 2;
  height: auto;
  max-height: 100%;
  width: auto;

  @media (min-width: 600px) {
    grid-column: 2;
    grid-row: 1/3;
  }

  /* border: solid 1px black; */
`;

const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  height: 100%;
  gap: 0.5rem;
  grid-column: 1/3;
  grid-row: 3;

  & p {
    font-size: 1.5em;
    color: #8c7466;
  }
  /* border: solid 1px black; */
`;

const CoffeeLogo = styled.img`
  height: 50%;
  width: auto;
`;

function Promotional() {
  return (
    <Main>
      <BackgroundImageMask />
      <TextContainer>
        <Title>GOOD DAYS START WITH A</Title>
        <BiggerTitle>GOOD COFFEE</BiggerTitle>
        <SmallParagraph>
          A cup of coffee lasts only a moment, but it is that moment that makes
          your day better.
        </SmallParagraph>
        <ViewMenu>VIEW MENU</ViewMenu>
      </TextContainer>
      <CoffeeImage src={coffeeImage} />
      <LogoContainer>
        <CoffeeLogo src={coffeeHour} />
        <p>COFFEE HOUR</p>
      </LogoContainer>
    </Main>
  );
}

export default Promotional;
