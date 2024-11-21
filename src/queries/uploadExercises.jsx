import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Your Firebase setup file
import exercisesData from "../assets/exercises.json"; // Adjust path to your JSON file

export const uploadExercises = async () => {
    try {
        const exercisesCollection = collection(db, "exercises");

        // Loop through JSON data and add each exercise
        for (const exercise of exercisesData.exercises) {
            const docRef = doc(exercisesCollection, exercise.id); // Use `exercise.id` as the document ID
            await setDoc(docRef, {
                id: exercise.id,
                name: exercise.name,
                equipment: exercise.equipment,
                bodyParts: exercise.bodyParts,
                custom: exercise.custom,
            });
        }

        console.log("Exercises added/updated in Firestore!");
    } catch (error) {
        console.error("Error adding exercises:", error);
    }
};
