import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Promotional from './home/promotional';
import About from './home/about';
import Menu from './menu';

function Main() {
  return (
    <>
      <Promotional />
      <About />
      <Menu />
    </>
  );
}

export default Main;
