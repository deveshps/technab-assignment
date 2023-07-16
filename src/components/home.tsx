import { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import { useNavigate } from "react-router";
const ResponseJson = require('../response.json');

type NameTypes = "name" | "email" | "favourite_fruit" | "";

type DataTypes = {
  email: string;
  name: NameTypes;
  favourite_fruit: string;
};

const Home = () => {
  const navigate = useNavigate();
  const [data, setData]: any = useState<DataTypes>({
    name: "",
    email: "",
    favourite_fruit: "",
  });
  const [favouriteFruitOptions,setFavouriteFruitOptions] = useState<String[]>([])
  const [isError, setError] = useState<any>(null);

  const handleChange = (e: any) => {
    if (isError && e.target?.name === "favourite_fruit" && e.target?.value) {
      setError(null);
    }
    setData((prevData: DataTypes) => {
      return {
        ...prevData,
        [e.target?.name]: e.target?.value,
      };
    });
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (!data.favourite_fruit) {
      setError("Please select favourite fruit");
    } else if (!isError) {
      navigate(`/details?fruit="${data?.favourite_fruit}"`, {
      state: { ...data }
      });
    }
  };

  useEffect(() => {
    if(ResponseJson && ResponseJson.length > 0){
        const data:String[] = ResponseJson.reduce((total:String[],one:{name:string}) => {
            if(one?.name){
                total.push(one?.name)
            }
            return total;
        },[])
        setFavouriteFruitOptions(data)
    }
  }, []);

  return (
    <div className={styles.topWrapper}>
      <div className={styles.topSubWrapper}>
        <h2>Fruit Details</h2>
        <div className={styles.title}>
          Get the details of your favourite fruit
        </div>
        <form onSubmit={submitHandler}>
          <div className={styles.inputFieldWrapper}>
            {[
              { title: "Name", name: "name", type: "text" },
              { title: "Email", name: "email", type: "email" },
              {
                title: "Favourite Fruit",
                name: "favourite_fruit",
                type: "options",
                options: [...favouriteFruitOptions],
              },
            ].map(
              (el: {
                title: string;
                name: string;
                type: string;
                options?: String[];
              }) => (
                <div key={el?.name} className={styles.inputFieldSubWrapper}>
                  <div>{el?.title}</div>
                  {el?.type === "options" ? (
                    <div className={styles.optionFieldWrapper}>
                      <select
                        name="favourite_fruit"
                        onChange={handleChange}
                        className={styles.optionField}
                        required
                      >
                        <option style={{ display: "none" }}>
                          Dropdown button
                        </option>
                        {
                            el?.options && el.options.map((oneOption:any) => <option key={oneOption} value={oneOption}>
                                {oneOption}
                            </option>)
                        }
                      </select>
                      {isError && el?.name === "favourite_fruit" ? (
                        <div
                          style={{ fontSize: 11, marginTop: 2, color: "red" }}
                        >
                          {isError}
                        </div>
                      ) : (
                        <div style={{ height: 14 }}> </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type={el?.type}
                      name={el?.name}
                      value={data[el?.name]}
                      onChange={handleChange}
                      className={styles.inputField}
                      required
                    />
                  )}
                </div>
              )
            )}
          </div>
          <div className={styles.submitButtonWrapper}>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
