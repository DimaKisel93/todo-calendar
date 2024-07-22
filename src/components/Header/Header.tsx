import { useNavigate } from "react-router-dom";
import { ProfileSelector } from "../ProfileSelect/ProfileSelect";
import styles from "./Header.module.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className={styles.header}>
      <h1>To-Do лист календарь</h1>
      <ProfileSelector />
      <button onClick={handleLogout}>Выйти из аккаунта</button>
    </header>
  );
};
