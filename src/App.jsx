import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Adminpage from "./Pages/Adminpage";
import Prodcutspage from "./Pages/Prodcutspage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Adminpage />} />
        <Route path="/products" element={<Prodcutspage />} />
      </Routes>
    </Router>
  );
};

export default App;
