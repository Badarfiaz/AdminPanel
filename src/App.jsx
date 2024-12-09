import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Adminpage from "./Pages/Adminpage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Adminpage />} />
      </Routes>
    </Router>
  );
};

export default App;
