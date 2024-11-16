import { useEffect, useState } from "react";
import { query, collection, orderBy, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useGetAccountInfo } from "./useGetAccountInfo";

export const useGetUserinfo = () => {
    const [userinfo, setUserinfo] = useState([]); 
    const { userID } = useGetAccountInfo();

    useEffect(() => {
        if (!userID) return; 

        const userInfoCollectionRef = collection(db, "userinfo");
        const queryUserinfo = query(
            userInfoCollectionRef,
            where("userID", "==", userID),
            orderBy("createdAt")
        );

        
        const unsubscribe = onSnapshot(queryUserinfo, (snapshot) => {
            const docs = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUserinfo(docs);
        });

       
        return () => unsubscribe();
    }, [userID]); 

    return { userinfo };
};
