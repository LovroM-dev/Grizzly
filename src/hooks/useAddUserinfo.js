import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useGetAccountInfo } from "./useGetAccountInfo";
useGetAccountInfo
export const useAddUserinfo = () => {
    const userInfoCollectionRef = collection(db, "userinfo")
    const {userID} = useGetAccountInfo()
    const addUserinfo = async({ gender,
        height,
        weight
    }) => {
        await addDoc(userInfoCollectionRef, {
            userID,
            gender,
            height,
            weight,
            createdAt: serverTimestamp()
        });
    }
    return {addUserinfo};
}