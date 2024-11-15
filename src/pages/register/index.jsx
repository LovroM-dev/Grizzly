import { useState } from "react";
import { Range } from "react-range";

export const Register = () => {
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedHeight, setSelectedHeight] = useState();

    const onChangeGenderValue = (event) => {
          setSelectedGender(event.target.value);
      }
      const onChangeHeighValue = (event) => {
        setSelectedHeight(event.target.value);
    }
    return (
        <div className="register">
            <div className="container">
                <div className="gender">
                    <div onChange={onChangeGenderValue}>
                        <input type="radio" value="MALE" name="gender" /> Male
                        <input type="radio" value="FEMALE" name="gender" /> Female
                    </div>
                </div>
                <div className="height">
                    <div onChange={onChangeHeighValue}>
                        <input type="number" name="height"/>
                    </div>
                    
                 
                </div>
                <div className="weight">

                </div>
            </div>
        </div>
    )
};