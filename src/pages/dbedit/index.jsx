import React from "react";
import { useEffect, useState } from 'react'
import { db } from "../../firebase/firebase"
import { collection, arrayUnion, arrayRemove, deleteDoc, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'
import { useAddField } from "../../hooks/useAddField";
import { useRemoveField } from "../../hooks/useRemoveField";
export const Dbedit = () => {
    const [exercises, setExercise] = useState([]);
    const exerciseColRef = collection(db, "exercise");
    const {addField} = useAddField();
    const {removeField} = useRemoveField();
    useEffect(() => {
        const getExercise = async () => {
          const data = await getDocs(exerciseColRef);
          setExercise(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getExercise();
        addField("exercise", "custom", false);
        //removeField("exercise", "fieldName")
      }, []);
    return (

        <div className="db-edit">
          hi
        </div>
    );
}