import React, { useEffect } from "react";
import { useGetUserinfo } from "../../../hooks/useGetUserinfo";
import { useChangeUserinfo } from "../../../hooks/useChangeUserinfo";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Workout_exercises } from "./../workout-exercises";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export const Premade_workout = () => {
    const location = useLocation();
    const passedWorkout = location.state?.workout;
    const [exerciseVis, setExerciseVis] = useState(false);
    const [selectedExercises, setSelectedExercises] = useState([])
    const [allSelectedExercises, setAllSelectedExercises] = useState([])
    const [workoutTitle, setWorkoutTitle] = useState(passedWorkout?.title || "Click to edit title");
    const [selectedExercisesData, setSelectedExercisesData] = useState(passedWorkout?.exercises || []);
    const [exerciseSets, setExerciseSets] = useState(() => {
        const sets = {};
        passedWorkout?.exercises.forEach((exercise) => {
            sets[exercise.id] = exercise.sets || [];
        });
        return sets;
    });



    const { userinfo } = useGetUserinfo();
    const { changeUserinfo } = useChangeUserinfo();
    const navigate = useNavigate();

    const exerciseColRef = collection(db, "exercises");




    useEffect(() => {
        if (passedWorkout?.exercises) {
            const ids = passedWorkout.exercises.map((ex) => ex.id);
            setAllSelectedExercises((prev) => [...new Set([...prev, ...ids])]);
            setSelectedExercisesData(passedWorkout.exercises);
        }
        console.log(passedWorkout.id);

    }, [passedWorkout]);

    useEffect(() => {
        if (selectedExercises.length > 0) {
            setAllSelectedExercises((prev) => [
                ...new Set([...prev, ...selectedExercises]),
            ]);
        }
    }, [selectedExercises]);

    useEffect(() => {
        const getSelectedExercisesData = async () => {
            const data = await getDocs(exerciseColRef);
            const allExercises = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            const newExercises = allSelectedExercises
                .map((id) => allExercises.find((exercise) => exercise.id === id))
                .filter(Boolean);

            setSelectedExercisesData((prevData) => {
                const existingIds = new Set(prevData.map((exercise) => exercise.id));
                return [
                    ...prevData,
                    ...newExercises.filter((exercise) => !existingIds.has(exercise.id)),
                ];
            });
        };

        if (allSelectedExercises.length > 0) {
            getSelectedExercisesData();
        }
    }, [allSelectedExercises]);





    const getSelectedExercisesData = async () => {
        const data = await getDocs(exerciseColRef);
        const allExercises = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        // Map selected IDs to exercise data
        const newExercises = allSelectedExercises
            .map((id) => allExercises.find((exercise) => exercise.id === id))
            .filter(Boolean); // Remove any null values (not found)

        // Add only unique exercises
        setSelectedExercisesData((prevData) => {
            const existingIds = new Set(prevData.map((exercise) => exercise.id));
            return [
                ...prevData,
                ...newExercises.filter((exercise) => !existingIds.has(exercise.id)),
            ];
        });
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
        } catch (error) {
            console.error("Error saving workout: ", error);
            alert("Failed to save workout. Please try again.");
        }
    };
    

    return (

        <div className="workout">

            <button
                onClick={() => navigate("/workout-preview")}
                style={{
                    marginBottom: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                }}
            >
                Back
            </button>

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