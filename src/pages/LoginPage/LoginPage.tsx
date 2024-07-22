import { GoogleAuthProvider } from "firebase/auth";
import { signInWithGooglePopup } from "../../utils/firebase";

import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const handleSignInWithGoogle = async () => {
    try {
      const response = await signInWithGooglePopup();
      const credential = GoogleAuthProvider.credentialFromResult(response);
      const token = credential?.accessToken;
      localStorage.setItem("access_token", token || "");
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.login__container}>
      <span>Для входа в приложение залогиньтесь пожалуйста!</span>
      <button className={styles.login__btn} onClick={handleSignInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
};
