import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Your Firebase setup file
import exercisesData from "../assets/exercises.json" // Adjust path to your JSON file

export const uploadExercises = async () => {
    try {
        const exercisesCollection = collection(db, "exercises");
        
        // Loop through JSON data and add each body part
        exercisesData.exercises.forEach(async (exercise) => {
            
            
            await addDoc(exercisesCollection, {
                id: exercise.id,
                name: exercise.name,
                equipment: exercise.equipment,
                bodyParts: exercise.bodyParts,
                custom: exercise.custom   
            });
        });

        console.log("Body parts added to Firestore!");
    } catch (error) {
        console.error("Error adding body parts:", error);
    }
};

