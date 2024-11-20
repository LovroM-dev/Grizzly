import React from "react";
import { useEffect, useState } from 'react'
import { db } from "../../firebase/firebase"
import { collection, arrayUnion, arrayRemove, deleteDoc, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'
import { useAddField } from "../../hooks/useAddField";
import { useRemoveField } from "../../hooks/useRemoveField";
export const Exercises = () => {
    const [exercises, setExercise] = useState([]);
    const exerciseColRef = collection(db, "exercise");
    const { addField } = useAddField();
    const { removeField } = useRemoveField();
    useEffect(() => {
        const getExercise = async () => {
            const data = await getDocs(exerciseColRef);
            setExercise(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getExercise();

    }, []);
    return (

        <div className="exercises">
            <div className="exercise-list">
                {exercises.map((exercise) => (
                    <div key={exercise.id}>
                        <h1>Name: {exercise.name}
                            <button style={{ fontSize: "16px" }} onClick={() => deleteExercise(exercise.id)}>-</button>
                        </h1>
                        <h2>Target muscle:</h2>

                        {exercise.target_muscle.map((muscle, index) => (
                            <h3 key={index}>{muscle}

                            </h3>
                        ))}

                    </div>
                ))}
            </div>
            <div className="create-exercise">
                
            </div>
        </div>
    );
}