import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Promotional from './home/promotional';
import About from './home/about';
import Store from './home/store';

function Main() {
  return (
    <>
      <Promotional />
      <About />
      <Store />
    </>
  );
}

export default Main;
