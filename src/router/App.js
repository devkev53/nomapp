import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContextProvider } from "../context/authContext";
import { StoreContextProvider } from "../context/storeContext";

import { Protected } from "./Protected";
import { Error404 } from "../pages/errors/Error404";
import { Login } from "../pages/login/Login";
import { Store } from "../pages/store/Store";
import { ValidateBuy } from "../pages/validateBuy/ValidateBuy";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Compaies } from "../pages/companies/Companies";
import { CreateCompany } from "../pages/companies/CreateCompany";
import { DetailCompany } from "../pages/detailCompany/DetailCompany";
import { Employees } from "../pages/employees/Employees";

function App() {
  return (
    <AuthContextProvider>
      <StoreContextProvider>
        <Router>
          <Routes>
            <Route element={<Protected />}>
              <Route path="/" element={<Dashboard />} />
              {/* Companies Routes */}
              <Route path="/companies" element={<Compaies />} />
              <Route path="/company/:companyId" element={<DetailCompany />} />
              <Route path="/companies-create" element={<CreateCompany />} />

              <Route path="/employees" element={<Employees />} />
              
              <Route path="/store" element={<Store />} />
              <Route
                path="/validate-buy/:employeeId"
                element={<ValidateBuy />}
              />
            </Route>

            <Route path="*" element={<Error404 />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </StoreContextProvider>
    </AuthContextProvider>
  );
}

export default App;
