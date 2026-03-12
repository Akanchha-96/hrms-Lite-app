
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Employees from './pages/Employees';
import Attendance from './pages/attendance';

function App() {
  return (
    <Router>
      <div className="navbar">
        <Link to="/">Employees</Link>
        <Link to="/attendance">Attendance</Link>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Employees/>}/>
          <Route path="/attendance" element={<Attendance/>}/>
        </Routes>
      </div>
    
    </Router>
   
  );
}

export default App;
