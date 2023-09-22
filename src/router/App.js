import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContextProvider } from "../context/authContext";

import { Protected } from "./Protected";
import { Error404 } from "../pages/errors/Error404";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { Empresas } from "../pages/empresas/Empresas";
import { Store } from "../pages/store/Store";
import { ValidateBuy } from "../pages/validateBuy/ValidateBuy";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route element={<Protected />}>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<Empresas />} />
            <Route path="/store" element={<Store/>} />
            <Route path="/validate-buy/:employeeId" element={<ValidateBuy/>} />
          </Route>

          <Route path="*" element={<Error404 />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
