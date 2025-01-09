import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Adminpage from './Pages/Adminpage';
import Prodcutspage from './Pages/Prodcutspage';
import Nav from './Components/Nav';
import DeleteProducts from './Components/DeleteProducts';
import ScrollToTop from './Components/ScrollToTop';
import OrderRecived from './Pages/OrderRecived';
import OrderComplaints from './Pages/OrderComplaints';
import LoginCombined from './Components/LoginCombined'; // Import the Login page
import PrivateRoute from './Components/PrivateRoute'; // Import the PrivateRoute component

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="mt-16">
        <Nav />
        <Routes>
          <Route path="/login" element={<LoginCombined />} /> {/* Login Route */}
          
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Adminpage />
              </PrivateRoute>
            }
          />
          <Route
            path="/Productpage"
            element={
              <PrivateRoute>
                <Prodcutspage />
              </PrivateRoute>
            }
          />
          <Route
            path="/delete-product"
            element={
              <PrivateRoute>
                <DeleteProducts />
              </PrivateRoute>
            }
          />
          <Route
            path="/order"
            element={
              <PrivateRoute>
                <OrderRecived />
              </PrivateRoute>
            }
          />
          <Route
            path="/Complaints"
            element={
              <PrivateRoute>
                <OrderComplaints />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
