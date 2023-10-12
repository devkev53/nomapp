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
import { AddEmployee } from "../pages/addEmployee/AddEmployee";
import { DetailEmployee } from "../pages/detailEmployee/DetailEmployee";
import { StoreUsers } from "../pages/storeUsers/StoreUsers";
import { Products } from "../pages/products/Products";
import { UserProfile } from "../pages/userProfile/UserProfile";
import { CreateUser } from "../pages/createUser/CreateUser";
import { ResetPassword } from "../pages/resetPassword/ResetPassword";
import { ChangePassword } from "../pages/changePassword/ChangePassword";
import { EditCompany } from '../pages/editCompany/EditCompany'

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
              <Route path="/edit-company/:companyId" element={<EditCompany/>} />
              <Route path="companies-create/" element={<CreateCompany />} />

              <Route path="/employees" element={<Employees />} />
              <Route
                path="/employee/:employeeId"
                element={<DetailEmployee />}
              />
              <Route path="/add-employee" element={<AddEmployee />} />

              <Route path="/store" element={<Store />} />
              <Route
                path="/validate-buy/:employeeId"
                element={<ValidateBuy />}
              />
              <Route path="/products" element={<Products />} />
              <Route path="/my-profile" element={<UserProfile/>} />
            </Route>



            <Route path="*" element={<Error404 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword/>}/>
            <Route path="/change-password/:token" element={<ChangePassword/>}/>
            <Route path="/create-user" element={<CreateUser />} />
          </Routes>
        </Router>
      </StoreContextProvider>
    </AuthContextProvider>
  );
}

export default App;
