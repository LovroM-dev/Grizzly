import React from "react";
import { useEffect, useState } from 'react'
import { db } from "../../firebase/firebase"
import { collection, arrayUnion, arrayRemove, deleteDoc, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'
import { useAddField } from "../../hooks/useAddField";
import { useRemoveField } from "../../hooks/useRemoveField";
import { Create_exercise } from "../create_exercise";
import { Filter } from "./filter";
export const Exercises = () => {
    const [exercises, setExercise] = useState([]);
    const [newExercises, setNewExercise] = useState([]);
    const [visibility, setVisibility] = useState(false)
    const [visibilityF, setVisibilityF] = useState(false)
    const [bodyPartFilter, setBodyPartFilter] = useState([])
    const [equipmentFilter, setEquipmentFilter] = useState([])

    const exerciseColRef = collection(db, "exercises");
    const { addField } = useAddField();
    const { removeField } = useRemoveField();
    useEffect(() => {
        const getExercise = async () => {
            const data = await getDocs(exerciseColRef);
            setExercise(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getExercise();
       
    }, []);
    useEffect(()=>{
        setNewExercise(exercises);
    },[exercises]);
    useEffect(() => {
        applyFilters();
    }, [bodyPartFilter, equipmentFilter]);
    const deleteExercise = async (id) => {
        const exerciseDoc = doc(db, "exercises", id)
        await deleteDoc(exerciseDoc)
    }
    const showCreateExercise = async (vis) => {
        setVisibility(vis)

    }
    const showCreateExerciseF = async (vis) => {
        setVisibilityF(vis)
    }
    const handleSavedFilter = (bp) => {
        setBodyPartFilter(bp[0] ? [bp[0]] : []);
        setEquipmentFilter(bp[1] ? [bp[1]] : []);

        
    }
    const clearFilters = () => {
        
    }
    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    function checkBP(filterBP, BP) {
        // Convert both arrays to uppercase

        
        const filterBPUpper = filterBP.map((val) => val.toUpperCase());
        const BPUpper = BP.map((val) => val.toUpperCase());
    
        // Check if any element in filterBPUpper is in BPUpper
        let isTrue = true;
        filterBPUpper.forEach(element => {
            if(!BPUpper.includes(element)) isTrue=false;
        });
     
        
        return isTrue;
        
    }
    
    const applyFilters = () => {
        const filteredEx = exercises.filter((exercise)=>{
            return (equipmentFilter[0].includes(capitalizeFirstLetter(exercise.equipment)) && checkBP(bodyPartFilter[0], exercise.bodyParts))    
            
            
        })
       
        console.log(filteredEx, bodyPartFilter, equipmentFilter);
        
        setNewExercise(filteredEx)
    };

    return (
        <>
            <div className="exercises">
                <div className="create-exercise">
                    <button onClick={() => showCreateExercise(!visibility)}>+</button>
                    {visibility && <Create_exercise />}


                </div>
                <div className="filter-button">
                    <button onClick={() => showCreateExerciseF(!visibilityF)}>Filter</button>
                    {visibilityF && <Filter
                        onSave={handleSavedFilter}
                        onClose={() => { setVisibilityF(false) }} />}
                </div>
                <div className="exercise-list">
                    {newExercises.map((exercise) => (
                        <div key={exercise.id}>
                            <h1>Name: {exercise.name}
                                {exercise.custom && (<button style={{ fontSize: "16px" }} onClick={() => deleteExercise(exercise.id)}>-</button>)}

                            </h1>
                            <h2>Target muscle:</h2>

                            {exercise.bodyParts.map((muscle, index) => (
                                <h3 key={index}>{muscle}

                                </h3>
                            ))}

                        </div>
                    ))}
                </div>

            </div>
        </>

    );
}