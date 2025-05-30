import { auth, provider, db } from "../../firebase/firebase";
import { signInWithPopup, onAuthStateChanged  } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthState = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const authInfo = {
                        userID: user.uid,
                        name: user.displayName,
                        profilePhoto: user.photoURL,
                        isAuth: true,
                    };
                    localStorage.setItem("auth", JSON.stringify(authInfo));
                    navigate("/user"); 
                }
            });
        };

        checkAuthState();
    }, [navigate]);
    const signInWithGoogle = async () => {
        try {
            const results = await signInWithPopup(auth, provider);
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                profilePhoto: results.user.photoURL,
                isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));

            const userinfoCollection = collection(db, "userinfo");
            const q = query(userinfoCollection, where("userID", "==", authInfo.userID));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
             
                navigate("/user");
            } else {
              
                navigate("/register");
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
            alert("Failed to sign in. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <p>Sign in with Google</p>
            <button className="login-with-google" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    );
};
