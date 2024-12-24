import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Adminpage from "./Pages/Adminpage";
import Prodcutspage from "./Pages/Prodcutspage";
import Nav from "./Components/Nav";
import DeleteProducts from "./Components/DeleteProducts";
import ScrollToTop from "./Components/ScrollToTop";
import OrderRecived from "./Pages/OrderRecived";
const App = () => {
  return (
    <Router>
<ScrollToTop/>
       <div className="mt-16">

      <Nav/>
      <Routes>
        <Route path="/" element={<Adminpage />} />
        <Route path="/Productpage" element={<Prodcutspage />} />
        <Route path="/delete-product" element={<DeleteProducts/>} />  
        <Route path="/order" element={< OrderRecived/>} />  
        

      </Routes>
      </div>

    </Router>
  );
};

export default App;
