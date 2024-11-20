import { BrowserRouter  as Router, Route, Routes} from "react-router-dom";
import Test from "./pages/Test";
import {Auth} from "./pages/auth/index"
import {Register} from "./pages/register/index"
import { User } from "./pages/user";
import { Workout } from "./pages/workout";
import {Exercises} from "./pages/exercises";
import { Dbedit } from "./pages/dbedit";
function App(){
  
  return(
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Test/>} />
          <Route path="/auth" exact element={<Auth/>} />
          <Route path="/register" exact element={<Register/>} />
          <Route path="/user" exact element={<User/>} />
          <Route path="/workout" exact element={<Workout/>} />
          <Route path="/exercises" exact element={<Exercises/>} />
          <Route path="/dbedit" exact element={<Dbedit/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;