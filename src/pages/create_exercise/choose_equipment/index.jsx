import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const Choose_equipment = ({ onSave, onClose }) => {
  const [equipment, setEquipment] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 

  const equipmentRef = collection(db, 'equipment');

 
  useEffect(() => {
    const getEquipment = async () => {
      const data = await getDocs(equipmentRef);
      setEquipment(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getEquipment();
  }, []);

  const handleSelection = (item) => {
    setSelectedItem(item); 
  };

  const saveSelection = () => {
    if (selectedItem) {
      onSave(selectedItem); 
    } else {
      alert('Please select an equipment before saving!');
    }
    onClose(); 
  };

  return (
    <div >
      <h2>Select Equipment</h2>
      <ul className="equipment-list" style={{ listStyle: 'none', padding: 0 }}>
        {equipment.map((item) => (
          <li
            key={item.id}
            onClick={() => handleSelection(item.name)}
            style={{
              padding: '10px',
              margin: '5px 0',
              cursor: 'pointer',
              backgroundColor: selectedItem === item.name ? 'lightblue' : 'lightgray',
              borderRadius: '5px',
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <button onClick={saveSelection} style={{ marginTop: '10px' }}>
        Save
      </button>
    
    </div>
  );
};
