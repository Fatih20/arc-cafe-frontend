import styled from 'styled-components';

import promotionalBackground from '../../assets/header-bg.jpg';
import coffeeImage from '../../assets/header-cropped.png';

const Main = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  height: 92.5vh;
  padding: 1rem;
`;

const BackgroundImageMask = styled.div`
  -webkit-mask-image: linear-gradient(black, transparent);
  mask-image: linear-gradient(
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.6),
    transparent 90%
  );
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  z-index: -1;
`;

const BackgroundImage = styled.img`
  -webkit-filter: blur(2px);
  filter: blur(2px);
  /* filter: grayscale(100%); */
  filter: saturate(0%);
  height: 100%;
  opacity: 0.4;
  /* width: auto; */
  z-index: -1;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
`;

const BiggerTitle = styled.h2`
  color: #8c7466;
  font-size: 2rem;
  font-weight: 800;
`;

const SmallParagraph = styled.p`
  font-size: 0.8rem;
`;

const ViewMenu = styled.button`
  align-self: center;
  background-color: #95c79d;
  border-radius: 1.5rem;
  color: white;
  font-size: 1rem;
  font-weight: 900;
  margin: 1rem 0 0 0;
  padding: 0.3rem 0.75rem;
`;

const CoffeeImage = styled.img`
  aspect-ratio: initial;
  max-height: 60vh;
  /* width: auto; */
`;

function Promotional() {
  return (
    <Main>
      <BackgroundImageMask>
        <BackgroundImage src={promotionalBackground} />
      </BackgroundImageMask>
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
    </Main>
  );
}

export default Promotional;
