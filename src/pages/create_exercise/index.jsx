import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Select from 'react-select';
import { Choose_bodypart } from './choose_bodypart';
import { Choose_equipment } from './choose_equipment';
export const Create_exercise = () => {
    const [newName, setNewName] = useState('');
    const [targetInput, setTargetInput] = useState(''); // Equipment or other inputs
    const [bodyParts, setBodyParts] = useState([]);
    const [showSelector, setShowSelector] = useState(false);
    const [showSelectorEQ, setShowSelectorEQ] = useState(false);
    const [selectedBodyParts, setSelectedBodyParts] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState("")
    const exerciseColRef = collection(db, 'exercise');
    const bodypartColRef = collection(db, 'bodyparts');

    // Fetch body parts on component mount
    useEffect(() => {
        const fetchBodyParts = async () => {
            const data = await getDocs(bodypartColRef);
            setBodyParts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchBodyParts();
    }, []);

    // Map body parts into options for the Select component
    const bodyPartOptions = bodyParts.map((bodyPart) => ({
        value: bodyPart.id,
        label: bodyPart.name,
    }));

    const handleSaveBodyParts = (parts) => {
        setSelectedBodyParts(parts); // Update the selected body parts in the parent
        console.log('Saved Body Parts:', parts);
    };
    const handleSaveEquipment = (parts) => {
        setSelectedEquipment(parts); // Update the selected body parts in the parent
        console.log('Saved Equipment:', parts);
    };

    const createExercise = async () => {
        if (!newName || selectedBodyParts.length === 0) {
            alert('Please provide a name and select at least one body part!');
            return;
        }

        try {
            const newExercise = {
                name: newName,
                equipment: targetInput,
                bodyParts: selectedBodyParts.map((part) => part.label), // Save body part labels
            };

            await addDoc(exerciseColRef, newExercise);
            alert('Exercise created successfully!');
            setNewName('');
            setTargetInput('');
            setSelectedBodyParts([]);
        } catch (error) {
            console.error('Error creating exercise:', error);
            alert('Failed to create exercise.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Create Exercise</h1>

            <label htmlFor="exercise-name">Name</label>
            <input
                placeholder="Create a name"
                id="exercise-name"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
            />
            <br />

            <label htmlFor="equipment">Equipment</label>
            <input
                placeholder="Select"
                id="equipment"
                value={targetInput}
                onChange={(event) => setTargetInput(event.target.value)}
            />
             <br />
            <label htmlFor="equipment-selector">Equipment</label>
            <button onClick={() => setShowSelectorEQ(!showSelectorEQ)}>Select</button>
            {showSelectorEQ && (
                <Choose_equipment
                    onSave={handleSaveEquipment}
                    onClose={() => setShowSelectorEQ(false)}
                />
            )}
           
            <br />

            <label htmlFor="bodypart-selector">Body Part</label>
            <button onClick={() => setShowSelector(!showSelector)}>Select</button>
            {showSelector && (
                <Choose_bodypart
                    onSave={handleSaveBodyParts}
                    onClose={() => setShowSelector(false)}
                />
            )}
            <br />




            <button onClick={createExercise}>Create Exercise</button>
        </div>
    );
};
