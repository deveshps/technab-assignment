
import { useLocation, useNavigate } from "react-router";
import styles from "../styles/header.module.css";
import { useEffect } from "react";
import {toastMessage} from "../common/store"

const Header =() => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSelected = location?.pathname || "";

    useEffect(() => {
        if(location?.pathname === "/details" && !location?.state?.favourite_fruit){
            navigate("/")
            toastMessage.next("Please choose favourite fruit first!")
        }
    },[location?.pathname,location?.state?.favourite_fruit,navigate])

    return <div className={styles.topWrapper}>
        <div onClick={() => navigate("/")} style={{cursor:"pointer",fontWeight:isSelected === "/" ? 600 : 400}}>Home</div>
        <div onClick={() => navigate("/details")} style={{cursor:"pointer",fontWeight:isSelected !== "/" ? 600 : 400}}>Details</div>
    </div>
}

export default Header;