import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../components/home';
import SignIn from '../components/signup';
import LogIn from '../components/login';
import Store from '../components/store';
import HeaderFooter from '../components/headerfooter';

import IsLoggedInProvider from '../context/isLoggedIn';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/arc-cafe">
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
                <Store />
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
