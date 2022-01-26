import Header from './home/header';
import Footer from './home/footer';

import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  & > *:nth-child(2) {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    /* border: solid 1px black; */
  }
`;

export default function HeaderFooter({ children }: { children: JSX.Element }) {
  return (
    <Main>
      <Header />
      <div>{children}</div>
      <Footer />
    </Main>
  );
}
