import { BrowserRouter  as Router, Route, Routes} from "react-router-dom";
import Test from "./pages/Test";
import {Auth} from "./pages/auth/index"
import {Register} from "./pages/register/index"
import { User } from "./pages/user";
import { Workout } from "./pages/workout";
import {Exercises} from "./pages/exercises";
import { Dbedit } from "./pages/dbedit";
import {Create_exercise} from "./pages/create_exercise";
import { Choose_bodypart } from "./pages/create_exercise/choose_bodypart";
import { Choose_equipment } from "./pages/create_exercise/choose_equipment";
import { Filter } from "./pages/exercises/filter";
import { Workout_exercises } from "./pages/workout/workout-exercises";
import { WorkoutPreview } from "./pages/workout/workout-preview";
import { Premade_workout } from "./pages/workout/Premade-workout";
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
          <Route path="/create-exercise" exact element={<Create_exercise/>} />
          <Route path="/choose-bodypart" exact element={<Choose_bodypart/>} />
          <Route path="/choose-equipment" exact element={<Choose_equipment/>} />
          <Route path="/filter" exact element={<Filter/>} />
          <Route path="/workout-exercises" exact element={<Workout_exercises/>} />
          
          <Route path="/workout-preview" element={<WorkoutPreview />} />
          <Route path="/pre-workout" element={<Premade_workout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;