import { BrowserRouter  as Router, Route, Routes} from "react-router-dom";
import Test from "./pages/Test";
import {Auth} from "./pages/auth/index"
import {Register} from "./pages/register/index"
function App(){
  
  return(
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Test/>} />
          <Route path="/auth" exact element={<Auth/>} />
          <Route path="/register" exact element={<Register/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;