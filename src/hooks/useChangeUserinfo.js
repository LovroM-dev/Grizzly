import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useGetAccountInfo } from "./useGetAccountInfo";
import { updateDoc } from "firebase/firestore";
export const useChangeUserinfo = () => {

    const userInfoCollectionRef = collection(db, "userinfo")
    
    const changeUserinfo = async (id,{ gender, weight, height }) => {
        try {
            const updates = {};
            const userinfoRef = doc(db, "userinfo", id)
            if (gender) updates.gender = gender;
            if (weight) updates.weight = weight;
            if (height) updates.height = height;
            if (Object.keys(updates).length === 0) {
                throw new Error("No valid fields to update.");
            }
            
            await updateDoc(userinfoRef, updates)
        } catch (error) {
            console.log(error);
            
        }
    }
    return ( {changeUserinfo})
}