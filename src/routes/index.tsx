import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../components/home';
import SignIn from '../components/signup';
import LogIn from '../components/login';
import Menu from '../components/menu';
import HeaderFooter from '../components/headerfooter';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
