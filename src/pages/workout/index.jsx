import React, { useEffect } from "react";
import { useGetUserinfo } from "../../hooks/useGetUserinfo";
import { useNavigate } from "react-router-dom";
import { useChangeUserinfo } from "../../hooks/useChangeUserinfo";
import { useState } from "react";
import { Workout_exercises } from "./workout-exercises";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
export const Workout = () => {
    const [exerciseVis, setExerciseVis] = useState(false);
    const [selectedExercises, setSelectedExercises] = useState([])
    const [allSelectedExercises, setAllSelectedExercises] = useState([])
    const [selectedExercisesData, setSelectedExercisesData] = useState([])
    const [exerciseSets, setExerciseSets] = useState({});


    const { userinfo } = useGetUserinfo();
    const [workoutTitle, setWorkoutTitle] = useState("Click to edit title");
    const { changeUserinfo } = useChangeUserinfo();
    const navigate = useNavigate();

    const exerciseColRef = collection(db, "exercises");
    useEffect(() => {

        getSelectedExercisesData();

    },);
    useEffect(() => {

        const newAll = allSelectedExercises.concat(selectedExercises)
        setAllSelectedExercises(newAll)

    }, [selectedExercises])
    useEffect(() => {
        getSelectedExercisesData();
    }, [allSelectedExercises])
    const getSelectedExercisesData = async () => {
        const data = await getDocs(exerciseColRef); // Fetch all exercises
        const allExercises = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        // Filter exercises to only include those in selectedExercises
        const filteredExercisesx = allExercises.filter((exercise) =>
            allSelectedExercises.includes(exercise.id)
        );
        const filteredExercises = allSelectedExercises.map((el) =>
            allExercises.find((exercise) => exercise.id == el)
        );

        setSelectedExercisesData(filteredExercises); // Set state with filtered data
        //console.log(filteredExercises);

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
    const handleSelectedExercises = (parts) => {
        setSelectedExercises(parts)

    }
    const selectedExercise = () => {

    }
    const removeExercise = (e) => {
        const exId = e.target.value;

        // Update selected and allSelected arrays
        const updatedAllSelectedExercises = allSelectedExercises.filter(
            (exercise) => exercise !== exId
        );

        setAllSelectedExercises(updatedAllSelectedExercises);

        // Directly refetch data to avoid stale state
        const filteredExercises = selectedExercisesData.filter(
            (exercise) => exercise.id !== exId
        );
        setSelectedExercisesData(filteredExercises);

    };
    const addASet = (exerciseId) => {
        setExerciseSets((prevSets) => {
            const currentSets = prevSets[exerciseId] || [];
            const newSet = { reps: 0, weight: 0 }; // Default set values
            return {
                ...prevSets,
                [exerciseId]: [...currentSets, newSet]
            };
        });
    };
    const updateSet = (exerciseId, setIndex, field, value) => {
        setExerciseSets((prevSets) => {
            const updatedSets = [...(prevSets[exerciseId] || [])];
            updatedSets[setIndex] = {
                ...updatedSets[setIndex],
                [field]: value,
            };
            return {
                ...prevSets,
                [exerciseId]: updatedSets,
            };
        });
        console.log(exerciseSets);

    };
    const removeSet = (exerciseId, setIndex) => {
        setExerciseSets((prevSets) => {
            const updatedSets = [...(prevSets[exerciseId] || [])];
            updatedSets.splice(setIndex, 1); // Remove the set at setIndex
            return {
                ...prevSets,
                [exerciseId]: updatedSets,
            };
        });
    };


    const saveWorkout = async () => {
        try {
            const authInfo = JSON.parse(localStorage.getItem("auth")); // Retrieve user info
            const workoutData = {
                userID: authInfo.userID, // Associate workout with user
                title: workoutTitle,
                exercises: selectedExercisesData.map((exercise) => ({
                    id: exercise.id,
                    name: exercise.name,
                    sets: exerciseSets[exercise.id] || [], // Include sets for each exercise
                })),
                timestamp: new Date(), // Add a timestamp for sorting or tracking
            };
            const workoutColRef = collection(db, "workouts");
            await addDoc(workoutColRef, workoutData);

            alert("Workout saved successfully!");
            navigate("/workout-preview")
        } catch (error) {
            console.error("Error saving workout: ", error);
            alert("Failed to save workout. Please try again.");
        }
    };

    return (

        <div className="workout">
            <div className="workout-title">
                <h2 onClick={onClickTitle}>{workoutTitle}</h2>
            </div>
            <div className="current-exercises">
                {selectedExercisesData.map((exercise) => (
                    <div key={exercise.id} style={{ borderStyle: "solid" }}>
                        <button value={exercise.id} onClick={removeExercise}>Remove</button>
                        
                        <h1>
                            Name: {exercise.name}
                            {exercise.custom && (
                                <button
                                    style={{ fontSize: "16px" }}
                                    onClick={() => deleteExercise(exercise.id)}
                                >
                                    -
                                </button>
                            )}
                        </h1>
                        <button onClick={() => addASet(exercise.id)}>+ Add a set</button>

                        {/* Render Sets */}
                        <div>
                            {exerciseSets[exercise.id]?.map((set, index) => (
                                <div key={index} style={{ marginBottom: "10px", border: "1px solid black", padding: "5px" }}>
                                    <h3>Set {index + 1}</h3>
                                    <label>
                                        Reps:{" "}
                                        <input
                                            type="number"
                                            value={set.reps}
                                            onChange={(e) =>
                                                updateSet(exercise.id, index, "reps", e.target.value)
                                            }
                                        />
                                    </label>
                                    <label style={{ marginLeft: "10px" }}>
                                        Weight:{" "}
                                        <input
                                            type="number"
                                            value={set.weight}
                                            onChange={(e) =>
                                                updateSet(exercise.id, index, "weight", e.target.value)
                                            }
                                        />
                                    </label>
                                    <button
                                        style={{ marginLeft: "10px", color: "red" }}
                                        onClick={() => removeSet(exercise.id, index)}
                                    >
                                        Remove Set
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}


            </div>
            <div className="add-exercise">
                <h1 onClick={onClickAddExercise}>+ Add exercise</h1>
            </div>
            <div className="save-workout">
                <button onClick={saveWorkout}>Save Workout</button>
            </div>

            {exerciseVis && <Workout_exercises
                onSave={handleSelectedExercises}
                onClose={() => setExerciseVis(false)} />}
        </div>
    );
}