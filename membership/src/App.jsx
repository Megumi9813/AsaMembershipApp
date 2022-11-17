import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cancel from "./pages/Cancel";
import Store from "./pages/Store";
import Success from "./pages/Success";
import CartProvider from "./contexts/cartContext";
import { UserContectProvider } from "./contexts/userContext";
import './App.scss';

function App() {
  return (
    <UserContectProvider>
      <CartProvider>
        <BrowserRouter>
          <NavbarComponent />
          <Routes>
            <Route index element={<Store />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserContectProvider>
  );
}

export default App;
