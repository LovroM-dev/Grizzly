import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export const WorkoutPreview = () => {
    const [workouts, setWorkouts] = useState([]);
    const navigate = useNavigate();

    // Fetch workouts from Firestore
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const workoutColRef = collection(db, "workouts");
                const data = await getDocs(workoutColRef);
                const workoutsData = data.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setWorkouts(workoutsData);
            } catch (error) {
                console.error("Error fetching workouts: ", error);
            }
        };

        fetchWorkouts();
    }, []);

    const openWorkout = (workout) => {
        navigate("/pre-workout", { state: { workout } });
    };

    return (
        <div className="workout-preview">
            <h1>Workout Summaries</h1>
            {workouts.length === 0 ? (
                <p>No workouts available.</p>
            ) : (
                workouts.map((workout) => (
                    <div
                        key={workout.id}
                        style={{
                            border: "1px solid black",
                            margin: "10px",
                            padding: "10px",
                            cursor: "pointer",
                        }}
                        onClick={() => openWorkout(workout)}
                    >
                        <h2>{workout.title}</h2>
                        <ul>
                            {workout.exercises.map((exercise, index) => (
                                <li key={index}>
                                    <strong>{exercise.name}</strong>: {exercise.sets.length} sets
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
            <button
                onClick={() => navigate("/workout")}
                style={{
                    marginBottom: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                }}
            >
                Create new Workout
            </button>
        </div>
    );
};
