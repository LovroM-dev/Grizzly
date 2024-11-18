import { useState } from "react";
import { useAddUserinfo } from "../../hooks/useAdduserinfo";
import { useGetUserinfo } from "../../hooks/useGetUserinfo";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {auth} from "../../firebase/firebase"
export const Register = () => {
    const {addUserinfo} = useAddUserinfo();
    const {userinfo} = useGetUserinfo();
    const navigate = useNavigate();

    const signUserOut = async () => {
        try{
            await signOut(auth);
            localStorage.clear();
            navigate("auth")
        }
        catch (err){
            console.log(err)
        }
    };
    const goUser = () => {
        try {
            navigate("../user")
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        addUserinfo({gender:selectedGender, height:selectedHeight, weight:selectedWeight})
        goUser();
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
        
        <div className="sign-out">
            <button className="sign-out-button" onClick={signUserOut}>
                Sign out 
            </button>
        </div>
        <div className="user-button">
            <button className="user-button" onClick={goUser}>
                User
            </button>
        </div>
        </>
    )
};