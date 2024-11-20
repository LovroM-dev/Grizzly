import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Your Firebase setup file
import bodyPartsData from "../../src/assets/bodyParts.json" // Adjust path to your JSON file

export const uploadBodyParts = async () => {
    try {
        const bodyPartsCollection = collection(db, "bodyparts");
        
        // Loop through JSON data and add each body part
        bodyPartsData.bodyParts.forEach(async (bodyPart) => {
            
            
            await addDoc(bodyPartsCollection, {
                id: bodyPart.id,
                name: bodyPart.name,
            });
        });

        console.log("Body parts added to Firestore!");
    } catch (error) {
        console.error("Error adding body parts:", error);
    }
};


