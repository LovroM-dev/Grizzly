import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const Filter = ({onSave, onClose}) => {
    const [bodyParts, setBodyParts] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [selectedBodyParts, setselectedBodyParts] = useState([]);
    const [selectedEquipment, setselectedEquipment] = useState([])
    const equipmentRef = collection(db, 'equipment');
    const bodypartColRef = collection(db, "bodyparts")
    useEffect(() => {
        const fetchBodyParts = async () => {
            const data = await getDocs(bodypartColRef);
            setBodyParts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        const getEquipment = async () => {
            const data = await getDocs(equipmentRef);
            setEquipment(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchBodyParts();
        getEquipment();

    }, []);

    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemsEQ, setSelectedItemsEQ] = useState([]);
    const toggleSelection = (item) => {
        setSelectedItems((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item) // Deselect item
                : [...prev, item] // Select item
        );
    };
    const toggleSelectionEQ = (item) => {
        setSelectedItemsEQ((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item) // Deselect item
                : [...prev, item] // Select item
        );
    };
    const handleSelection = (item) => {
        setSelectedItem(item);
    };
   
    const saveSelection = () => {
        if (selectedItems || selectedItemsEQ) {
            onSave([selectedItems, selectedItemsEQ])
            
        }
        
        else {
            alert('Please select an equipment before saving!');
        }
        onClose();
    };
    
    return (
        <>


            <div className="filter" style={{ display: "inline-grid" }}>
                <ul className="filter-bodypart-list" style={{ listStyle: "none", padding: 0 }}>
                    {bodyParts.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => toggleSelection(item.name)}
                            style={{
                                display: 'inline-block',
                                padding: "10px",
                                margin: "5px ",
                                cursor: "pointer",
                                float: "right",

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
                <ul className="filter-equipment-list" style={{ listStyle: 'none', padding: 0, textAlign:"left" }}>
                    {equipment.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => toggleSelectionEQ(item.name)}
                            style={{
                                
                                padding: '10px',
                                margin: '5px',
                                cursor: 'pointer',
                                backgroundColor: selectedItemsEQ.includes(item.name)
                                ? "lightblue"
                                : "lightgray",
                            borderRadius: "5px",
                            }}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
                <button onClick={saveSelection}>Save</button>
            </div>
        </>
    );
}