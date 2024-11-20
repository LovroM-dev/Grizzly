import { React, useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import { collection, arrayUnion, arrayRemove, deleteDoc, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'
import Select from "react-select";

export const Create_exercise = () => {
    const [newName, setNewName] = useState("");
    const [targetInput, setTargetInput] = useState(""); // To hold each individual target muscle input
    const [bodyParts, setBodyParts] = useState([]);

    const exerciseColRef = collection(db, "exercise");
    const bodypartColRef = collection(db, "bodyparts")
    const addTargetMuscle = () => {};
    const createExercise = () => {};
   
    const getBodyParts = async () => {
        const data = await getDocs(bodypartColRef);
        setBodyParts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBodyParts();

    
    const bodyPartOptions = bodyParts.map((bodyPart) => ({
        value: bodyPart.id,
        label: bodyPart.name,
    }));
    const [selectedBodyParts, setSelectedBodyParts] = useState([]);

    const handleChange = (selectedOptions) => {
        setSelectedBodyParts(selectedOptions || []);
        console.log("Selected Body Parts:", selectedOptions);
    };

    return (
        <>
            <label htmlFor="exercise-name">Name</label>
            <input
                placeholder='Create a name'
                id="exercise-name"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
            />
            <br />
            <label htmlFor="Equipment">Equipment</label>
            <input
                placeholder='Select'
                id="Equipment"
                value={targetInput}
                onChange={(event) => setTargetInput(event.target.value)}
            />
            <br />
            <label htmlFor="bodypart">Bodypart</label>
            <Select
                placeholder='Select'
                id="bodypart"
                options={bodyPartOptions}
                isMulti
                value={selectedBodyParts}
                onChange={handleChange}
                
            >
                <option value="Select a bodypart"></option>
                {bodyParts.map((bodypart) => <option key={bodypart.id}  value={bodypart.name}>{bodypart.name}</option>)}
            </Select>
            <br />
            <button onClick={addTargetMuscle}>Add Target Muscle</button>
            <br />
            <button onClick={createExercise}>Create exercise</button>
        </>
    );

}