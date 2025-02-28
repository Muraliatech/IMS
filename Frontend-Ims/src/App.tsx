  
  import {Home} from "./Components/Home/Home"
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import { Signin } from './Components/Signin';
  import { Signup } from './Components/Signup';
  import {CustomerDashboard}  from "./Components/Customer/CustomerDashboard"
  import { ProductsCard } from './Components/Customer/ProductCard';
  import { Cart } from './Components/Customer/Cart';
  import { CartProvider } from "./Components/Customer/CardContext";
  import  CashierDashboard  from "./Components/Cashier/CashierDashboard";
  import { ProcessPayment } from "./Components/Cashier/ProcessPayment";
import OrderDetails from "./Components/Cashier/OrderDetails";
  
  function App() {
    
    return (
      <>
        <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/customerDashboard" element={<CustomerDashboard />} />
            <Route path="/cashierDashboard" element={<CashierDashboard />} />
              <Route path="/productCard/:id" element={<ProductsCard />} />
              <Route path="/cashier" element={<CashierDashboard />} />
              <Route path="/order/:orderId" element={<OrderDetails />} />
              <Route path="/payment" element={<ProcessPayment/>}/> 
              
          </Routes>
        </BrowserRouter>
        </CartProvider>

      </>
    )
  }

  export default App
