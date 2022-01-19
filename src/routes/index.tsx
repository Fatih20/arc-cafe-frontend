import { BrowserRouter, Route, Routes } from 'react-router-dom';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/arc-cafe-frontend">
          <Route index element={<h1>Hallo</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
