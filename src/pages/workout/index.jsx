import React, { useEffect } from "react";
import { useGetUserinfo } from "../../hooks/useGetUserinfo";
import { useNavigate } from "react-router-dom";
import { useChangeUserinfo } from "../../hooks/useChangeUserinfo";
import { useState } from "react";
import { Workout_exercises } from "./workout-exercises";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
export const Workout = () => {
    const [exerciseVis, setExerciseVis] = useState(false);
    const [selectedExercises, setSelectedExercises] = useState([])
    const [allSelectedExercises, setAllSelectedExercises] = useState([])
    const [selectedExercisesData, setSelectedExercisesData] = useState([])
    const { userinfo } = useGetUserinfo();
    const [workoutTitle, setWorkoutTitle] = useState("Click to edit title");
    const { changeUserinfo } = useChangeUserinfo();
    const navigate = useNavigate();

    const exerciseColRef = collection(db, "exercises");
    useEffect(() => {
       
        getSelectedExercisesData();
       
    }, );
    useEffect(() => {
        console.log(selectedExercises);
        const newAll = allSelectedExercises.concat(selectedExercises)
        setAllSelectedExercises(newAll)
        console.log("All selected ", allSelectedExercises);
        
    }, [selectedExercises])
    useEffect(()=>{
        getSelectedExercisesData();
    },[allSelectedExercises])
    const getSelectedExercisesData = async () => {
        const data = await getDocs(exerciseColRef); // Fetch all exercises
        const allExercises = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
        // Filter exercises to only include those in selectedExercises
        const filteredExercises = allExercises.filter((exercise) =>
            allSelectedExercises.includes(exercise.id)
        );
    
        setSelectedExercisesData(filteredExercises); // Set state with filtered data
    };


    const onClickTitle = () => {
        const newTitle = prompt("Enter the title for this workout", workoutTitle);
        if (newTitle) {
            setWorkoutTitle(newTitle)
        }
    }
    const onClickAddExercise = () => {
        setExerciseVis(true)
    }
    const handleSelectedExercises = (parts) =>{
        setSelectedExercises(parts)
        
    }
    const selectedExercise = () =>{

    }
    return (

        <div className="workout">
            <div className="workout-title">
                <h2 onClick={onClickTitle}>{workoutTitle}</h2>
            </div>
            <div className="current-exercises">
            {selectedExercisesData.map((exercise) => (
                        <div key={exercise.id} style={{borderStyle:" solid"}}>
                            <input value={exercise.id}type="checkbox" key={"checkbox"+exercise.id} onClick={selectedExercise} />
                            <h1>Name: {exercise.name}
                                {exercise.custom && (<button style={{ fontSize: "16px" }} onClick={() => deleteExercise(exercise.id)}>-</button>)}

                            </h1>
                            <h2>Target muscle:</h2>

                            {exercise.bodyParts.map((muscle, index) => (
                                <h3 key={index}>{muscle}

                                </h3>
                            ))}

                        </div>
                    ))}
            </div>
            <div className="add-exercise">
                <h1 onClick={onClickAddExercise}>+ Add exercise</h1>
            </div>
            {exerciseVis && <Workout_exercises
                onSave={handleSelectedExercises}
                onClose={() => setExerciseVis(false)} />}
        </div>
    );
}