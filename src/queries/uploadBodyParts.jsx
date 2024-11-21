import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Your Firebase setup file
import bodyPartsData from "../../src/assets/bodyParts.json"; // Adjust path to your JSON file

export const uploadBodyParts = async () => {
    try {
        const bodyPartsCollection = collection(db, "bodyparts");

        // Loop through JSON data and add each body part
        for (const bodyPart of bodyPartsData.bodyParts) {
            const docRef = doc(bodyPartsCollection, bodyPart.id); // Use `id` as the document ID
            await setDoc(docRef, {
                id: bodyPart.id,
                name: bodyPart.name,
            });
        }

        console.log("Body parts added/updated in Firestore!");
    } catch (error) {
        console.error("Error adding body parts:", error);
    }
};
