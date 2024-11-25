import React from "react";
import { useGetUserinfo } from "../../hooks/useGetUserinfo";
import { useNavigate } from "react-router-dom";
import { useChangeUserinfo } from "../../hooks/useChangeUserinfo";
import { signOut } from "firebase/auth";
import {auth} from "../../firebase/firebase"
export const User = () => {

    const { userinfo } = useGetUserinfo();
    const { changeUserinfo } = useChangeUserinfo();
    const navigate = useNavigate();
    const handleClick = async (e) => {
        const field = e.target.getAttribute("data-field");
        const value = prompt("Change " + field + " value");
        const updates = { [field]: value };
        const userId = e.target.getAttribute("data-user-id"); 
        console.log(userId);
        
        changeUserinfo(userId, updates);
    }
    const signUserOut = async () => {
        try{
            await signOut(auth);
            localStorage.clear();
            navigate("../auth")
        }
        catch (err){
            console.log(err)
        }
    };
    return (
        <div className="user-info">
            <h1>
                User Info
            </h1>
            <ul>
                {userinfo.map((user) => {
                    const { gender, height, weight } = user

                    return (
                        <li key={user} >
                            <h4 data-field="gender" data-user-id={user.id} onClick={handleClick}>{gender}</h4>
                            <h4 data-field="height" data-user-id={user.id} onClick={handleClick}>{height}</h4>
                            <h4 data-field="weight" data-user-id={user.id} onClick={handleClick}>{weight}</h4>

                        </li>
                    );
                }
                )}
            </ul>
            <div className="sign-out">
            <button className="sign-out-button" onClick={signUserOut}>
                Sign out 
            </button>
        </div>
        </div>
    );
}