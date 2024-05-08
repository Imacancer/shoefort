import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Products from "./pages/Products";
import SignIn from "./pages/sign-in";
import Dashboard from "./pages/admin";
import RepairRequest from "./pages/RepairRequest";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path="/Services" element={<RepairRequest/>} />
        <Route path="/Checkout" element={<Checkout/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
