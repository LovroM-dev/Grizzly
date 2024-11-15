import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import { collection, arrayUnion, arrayRemove, deleteDoc, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'

function Test() {
  const [newName, setNewName] = useState("");
  const [newTarget, setNewTarget] = useState([]);
  const [targetInput, setTargetInput] = useState(""); // To hold each individual target muscle input
  const [exercises, setExercise] = useState([]);
  
  const exerciseColRef = collection(db, "exercise");
  const deleteExercise = async(id) => {
    const exerciseDoc = doc(db, "exercise", id)
    await deleteDoc(exerciseDoc)
  }
  const addTargetMuscle = () => {
    if (targetInput.trim() !== "") {
      setNewTarget([...newTarget, targetInput.trim()]);
      setTargetInput(""); // Clear input after adding to the array
    }
  };
  const addNewTargetMuscle = async(id) => {
    const exerciseDoc = doc(db, "exercise", id)
    const addedMuscle = prompt("Add another targeted muscle", "");
    if (addedMuscle != null && addedMuscle != ""){
      const newField = {target_muscle: arrayUnion(addedMuscle)}
      await updateDoc(exerciseDoc, newField)
    }
  };
  const removeTargetMuscle = async(id, muscle) => {
    const exerciseDoc = doc(db, "exercise", id)
    const newField = {target_muscle: arrayRemove(muscle) }
    await updateDoc(exerciseDoc, newField)
  }
  const createExercise = async () => {
    if (newName.trim() !== "") {
      await addDoc(exerciseColRef, { name: newName, target_muscle: newTarget });
      setNewName("");  // Clear name input after creating exercise
      setNewTarget([]); // Clear target muscles array after creating exercise
    }
  };

  useEffect(() => {
    const getExercise = async () => {
      const data = await getDocs(exerciseColRef);
      setExercise(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getExercise();
  }, []);

  return (
    <div className='App'>
      <input 
        placeholder='Name' 
        value={newName}
        onChange={(event) => setNewName(event.target.value)} 
      />
      <input 
        placeholder='Target muscle' 
        value={targetInput}
        onChange={(event) => setTargetInput(event.target.value)} 
      />
      <button onClick={addTargetMuscle}>Add Target Muscle</button>
      <button onClick={createExercise}>Create exercise</button>

      {exercises.map((exercise) => (
        <div key={exercise.id}>
          <h1>Name: {exercise.name}
          <button style={{ fontSize: "16px"}} onClick={() => deleteExercise(exercise.id)}>-</button>
          </h1>
          <h2>Target muscle:</h2>
          
          {exercise.target_muscle.map((muscle, index) => (
            <h3 key={index}>{muscle}
            <button onClick={()=> {removeTargetMuscle(exercise.id, muscle)}}>-</button>
            </h3>
          ))}
          <button onClick={()=>  {addNewTargetMuscle(exercise.id)}}>Add another muscle</button>
        </div>
      ))}
    </div>
  );
}

export default Test;
