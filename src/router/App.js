import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContextProvider } from '../context/authContext'

import { Protected } from './Protected'
import { Error404 } from "../pages/errors/Error404";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";

function App() {
  return (
  <AuthContextProvider>
    <Router>
      <Routes>

        <Route element={<Protected/>}>
          <Route path="/" element={<Home />} />
        </Route>
        
        <Route path="*" element={<Error404 />} />
        <Route path="/login" element={<Login />} />
      
      </Routes>
    </Router>
  </AuthContextProvider>
  );
}

export default App;
