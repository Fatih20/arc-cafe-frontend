import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from './home/header';
import Promotional from './home/promotional';
import About from './home/about';
import Location from './home/location';
import Footer from './home/footer';

const Bruh = styled.div`
  background-color: black;
`;

function Main() {
  return (
    <>
      <Promotional />
      <About />
      <Location />
    </>
  );
}

export default Main;
