import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './layouts/dashboard/Dashboard.jsx';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
