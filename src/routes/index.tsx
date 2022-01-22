import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../components/main';
import SignIn from '../components/signup';
import LogIn from '../components/login';
import Store from '../components/store';

import { logout } from '../utils/api';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/arc-cafe-frontend">
          <Route index element={<Home />} />
          <Route path="menu" element={<Store />} />
          <Route path="signup" element={<SignIn />} />
          <Route path="login" element={<LogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
