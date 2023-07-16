import { useNavigate } from "react-router";
import styles from "../styles/pageNotFound.module.css";

const NotFoundPage =() => {
    const navigate = useNavigate();
    return <div onClick={() => navigate("/")} className={styles.topWrapper}>NotFoundPage</div>
}

export default NotFoundPage;