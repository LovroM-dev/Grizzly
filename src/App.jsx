import { useEffect, useState } from 'react'
import './App.css'
import {db} from './firebase/firebase'
import {collection, getDocs} from 'firebase/firestore'
function App() {
  const [exercises, setExercise] = useState([])
  const exerciseColRef = collection(db, "exercise")
  useEffect(()=> {
     const getExcercise = async () => {
        const data = await getDocs(exerciseColRef);
        console.log(data)
        setExercise(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
     }
     getExcercise()
  }, [])
  return(
    <div className='App'>
    {exercises.map((exercise) => {
      return (
    <div key={exercise.name}>
      {" "}
      <h1>Name: {exercise.name}</h1>
      <h1>Target muscle:</h1>
        {exercise.target_muscle.map((muscle) => {
              return (
                <h2 key={muscle}>
                {muscle}
                </h2>
              );
            }
          )
            
              
             
            
        }
      
    </div>)})}
    </div>
      )
 
}

export default App
