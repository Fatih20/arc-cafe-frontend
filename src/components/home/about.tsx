import styled from 'styled-components';

import background from '../../assets/about-bg.jpg';

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  gap: 1rem;
  overflow: hidden;
  padding: 1rem 1rem 2rem 1rem;
  position: relative;
  @media (min-width: 600px) {
    /* width: 80%; */
    padding-bottom: 20rem;
  }
`;

const BackgroundContainer = styled.div`
  height: 100%;
  overflow: hidden;
  position: absolute;
  width: 100%;
  z-index: -1;

  /* border: solid 1px black; */
`;

const Background = styled.img`
  aspect-ratio: initial;
  filter: blur(1px);
  height: auto;
  opacity: 50%;
  position: absolute;
  right: 0;
  width: 100%;

  @media (min-width: 600px) {
    max-width: 25rem;
    right: 10%;
    width: 50%;
  }
`;

const Title = styled.h2`
  color: #8c7466;
  font-size: 1.5em;
  margin-top: 1.25rem;
`;

const Paragraph = styled.p`
  text-align: center;
  line-height: 2;
`;

function About() {
  return (
    <Main id="About">
      <BackgroundContainer>
        <Background src={background} />
      </BackgroundContainer>
      <Title>About Us</Title>
      <Paragraph>
        A celebration of Java's cultural cuisine and natural environment, Coffee
        Hour cafe showcases the diversity of coffees and contemporary cuisine
        that demonstrates the highly skilled technique and relentless drive for
        perfection that has become Coffee Hour trademark.
      </Paragraph>
      <Paragraph>
        Open for breakfast, brunch, lunch, and dinner, with in bar dining menus
        and its own private rooms. Coffee Hour can deliver an array of relaxing
        experiences from power coffee to afterwork coffee right in front of your
        doorstep.
      </Paragraph>
    </Main>
  );
}

export default About;
