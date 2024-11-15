import { Profiler } from "react";
import {auth, provider} from "../../firebase/firebase"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom";
export const Auth = () => {
    const navigate = useNavigate()
    
    const signInWithGoogle = async() => {
        const results = await signInWithPopup(auth, provider)
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true
        }
        localStorage.setItem("auth", JSON.stringify(authInfo))
        navigate("/register")
    }
    return (
        <div className="login-page">
            <p>
                Sign in with google
            </p>
            <button className="login-with-google" onClick={signInWithGoogle}>
                {""}
                Sign in with Google 
            </button>

        </div>


    );
};