import { useLocation, useNavigate } from "react-router";
import styles from "../styles/details.module.css";
import { useEffect, useState } from "react";
const ResponseJson = require('../response.json');

type FruitType = {nutritionsArray:{}[]};

const Details = () => {
  const [data, setData] = useState<FruitType>({nutritionsArray:[]});

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
      if (location?.state?.favourite_fruit && ResponseJson && ResponseJson.length> 0){
        const result:any = ResponseJson.reduce((total:{},one:{name:String}) => {
            if(one?.name === location?.state?.favourite_fruit){
                total = {...one}
            }
            return total;
        },{});
        const nutritionsArray = []
        if(result && result.nutritions){
            for(let one in result.nutritions){
                nutritionsArray.push({[one]:result.nutritions[one],key:one})
            }
        }
        setData({...result,nutritionsArray})
      }
  }, [location?.state?.favourite_fruit]);
  return (
    <div className={styles.topWrapper}>
      <div className={styles.topSubWrapper}>
        <h2>Hello {location?.state?.name}</h2>
        <div className={styles.title}>{location?.state?.email}</div>
        <div className={styles.title}>
          Nutrition details of your favourite Fruit:
        </div>
        {
            data && data.nutritionsArray && data.nutritionsArray.length > 0 &&data.nutritionsArray.map((el:any) => <div className={styles.fruitsTableWrapper} key={el?.key}>
                <div className={styles.fruitsRow}>{el?.key.slice(0,1).toUpperCase() + el?.key.slice(1)}</div>
                <div className={styles.fruitsRow}>{el[el?.key]}</div>
            </div>)
        }
        <div className={styles.backButtonWrapper}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            &lt; Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
