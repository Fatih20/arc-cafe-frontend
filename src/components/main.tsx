import { useState } from 'react';

import Header from './home/header';
import Promotional from './home/promotional';
import About from './home/about';
import Location from './home/location';
import Footer from './home/footer';
import useMe from '../customHooks/useMe';
import { useNavigate } from 'react-router-dom';
import { stateOfPage, noParamReturnVoid } from '../types';

function Main() {
  const [stateOfPage, setStateOfPage] = useState('main' as stateOfPage);
  const { user, error, isLoading } = useMe();
  const navigate = useNavigate();

  function onlyRunIfLoggedIn(runIfLoggedIn: noParamReturnVoid) {
    if (error) {
      navigate('/arc-cafe-frontend/login');
    } else {
      runIfLoggedIn();
    }
  }

  function determineIfLoggedIn() {
    if (isLoading) {
      return false;
    } else {
      if (error !== null) {
        return false;
      } else {
        return true;
      }
    }
  }

  return (
    <>
      <Header isLoggedIn={determineIfLoggedIn()} />
      <Promotional />
      <About />
      <Location />
      <Footer />
    </>
  );
}

export default Main;
