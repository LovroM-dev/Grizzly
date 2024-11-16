import { useState } from "react";
import { useAddUserinfo } from "../../hooks/useAdduserinfo";
import { useGetUserinfo } from "../../hooks/useGetUserinfo";
export const Register = () => {
    const {addUserinfo} = useAddUserinfo();
    const {userinfo} = useGetUserinfo();
    const onSubmit = (e) => {
        e.preventDefault()
        addUserinfo({gender:selectedGender, height:selectedHeight, weight:selectedWeight})
    }
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedHeight, setSelectedHeight] = useState(0);
    const [selectedWeight, setSelecteWeight] = useState(0);
    const onChangeGenderValue = (event) => { 
          setSelectedGender(event.target.value);
           
    }
    const onChangeHeightValue = (event) => {
        setSelectedHeight(event.target.value);
        
    }
    const onChangeWeightValue = (event) => {
        setSelecteWeight(event.target.value);
        
    }
    //1:18:46
    return (
        <>
        <div className="register">
            <div className="container">
            <form onSubmit={onSubmit} className="user-form">
                <div className="gender">
                    <label>Gender</label>
                    <div onChange={onChangeGenderValue}>
                        <input type="radio" value="MALE" name="gender" required/> Male
                        <input type="radio" value="FEMALE" name="gender" /> Female
                    </div>
                </div>
                <div className="height">
                    <label>Height</label>
                    <div onChange={onChangeHeightValue}>
                        <input type="number" id="height" name="height" required/>
                    </div>
                </div>
                <div className="weight">
                    <label>Weight</label>
                    <div onChange={onChangeWeightValue}>
                        <input type="number" id="weight"name="weight" required/>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
            </div>
        </div>
        <div className="user-info">
            <h1>
                User Info
            </h1>
            <ul>
                {userinfo.map((user) => {
                    const {gender, height, weight} = user
                
                    return (
                    <li>
                        <h4>{gender}</h4>
                        <h4>{height}</h4>
                        <h4>{weight}</h4>
                    
                    </li>
                    );
                }
                )}
            </ul>
        </div>
        </>
    )
};