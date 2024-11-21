import { React, useEffect, useState } from 'react'
import { db } from '../../../firebase/firebase'
import { collection, arrayUnion, arrayRemove, deleteDoc, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'
import Select from "react-select";

export const Choose_bodypart = ({onSave, onClose}) => {
    const [newName, setNewName] = useState("");
    const [targetInput, setTargetInput] = useState(""); // To hold each individual target muscle input
    const [bodyParts, setBodyParts] = useState([]);

    const exerciseColRef = collection(db, "exercise");
    const bodypartColRef = collection(db, "bodyparts")
    const addTargetMuscle = () => { };
    const createExercise = () => { };

    const getBodyParts = async () => {
        const data = await getDocs(bodypartColRef);
        setBodyParts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBodyParts();



    const [selectedItems, setSelectedItems] = useState([]);
    const toggleSelection = (item) => {
        setSelectedItems((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item) // Deselect item
                : [...prev, item] // Select item
        );
    };

    const saveSelection = async () => {
        onSave(selectedItems); // Pass selected parts to parent
        onClose(); 
    };

    return (
        <>
            <ul className="bodypart-list" style={{ listStyle: "none", padding: 0 }}>
                {bodyParts.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => toggleSelection(item.name)}
                        style={{
                            padding: "10px",
                            margin: "5px 0",
                            cursor: "pointer",
                            backgroundColor: selectedItems.includes(item.name)
                                ? "lightblue"
                                : "lightgray",
                            borderRadius: "5px",
                        }}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
            <button onClick={saveSelection} style={{ marginTop: "10px" }}>
                Save
            </button>
        </>

    );

}