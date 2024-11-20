import React from "react";
import { useGetUserinfo } from "../../hooks/useGetUserinfo";
import { useNavigate } from "react-router-dom";
import { useChangeUserinfo } from "../../hooks/useChangeUserinfo";
import { useState } from "react";

export const Workout = () => {
    const { userinfo } = useGetUserinfo();
    const [workoutTitle, setWorkoutTitle] = useState("Click to edit title");
    const { changeUserinfo } = useChangeUserinfo();
    const navigate = useNavigate();
    const onClickTitle = () => {
        const newTitle = prompt("Enter the title for this workout", workoutTitle);
        if (newTitle) {
            setWorkoutTitle(newTitle)
        }
    }
    const onClickAddExercise = () => {
        
    }
    return (

        <div className="workout">
            <div className="workout-title">
                <h2 onClick={onClickTitle}>{workoutTitle}</h2>
            </div>
            <div className="add-exercise">
                <h1 onClick={onClickAddExercise}>+ Add exercise</h1>
            </div>
        </div>
    );
}