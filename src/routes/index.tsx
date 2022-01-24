import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../components/home';
import SignIn from '../components/signup';
import LogIn from '../components/login';
import Menu from '../components/menu';
import Checked from '../components/checked';
import HeaderFooter from '../components/headerfooter';

export const BASE_URL = '/arc-cafe-frontend';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/arc-cafe-frontend">
          <Route
            index
            element={
              <HeaderFooter>
                <Home />
              </HeaderFooter>
            }
          />
          <Route
            path="menu"
            element={
              <HeaderFooter>
                <Menu />
              </HeaderFooter>
            }
          />
          <Route
            path="signup"
            element={
              <HeaderFooter>
                <SignIn />
              </HeaderFooter>
            }
          />
          <Route
            path="login"
            element={
              <HeaderFooter>
                <LogIn />
              </HeaderFooter>
            }
          />
          <Route
            path="checked"
            element={
              <HeaderFooter>
                <Checked />
              </HeaderFooter>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
