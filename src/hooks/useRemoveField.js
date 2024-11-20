import { updateDoc, collection, getDocs, doc, deleteField } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Adjust import based on your project setup

export const useRemoveField = () => {
    const removeField = async (collection_name, newField) => {
        try {

            console.log(collection_name);
            
            const collectionRef = collection(db, collection_name)

            console.log(newField);
            
            const data = await getDocs(collectionRef)
            data.forEach(async (docu) => {
              
                

                
                await updateDoc(doc(db, collection_name, docu.id), {[newField]: deleteField()})
            });
            //await updateDoc(collectionRef,{newField:value} )

            
        } catch (error) {
            console.error("Error removing field:", error);
        }
    };

    return { removeField };
};