import { updateDoc, collection, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Adjust import based on your project setup

export const useAddField = () => {
    const addField = async (collection_name, newField, value) => {
        try {


            const collectionRef = collection(db, collection_name)
            const data = await getDocs(collectionRef)
            data.forEach(async (docu) => {
                

                
                await updateDoc(doc(db, collection_name, docu.id), {[newField]:[value]})
            });
            //await updateDoc(collectionRef,{newField:value} )

            
        } catch (error) {
            console.error("Error adding field:", error);
        }
    };

    return { addField };
};