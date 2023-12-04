import { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "../config";
import { collection, onSnapshot } from "firebase/firestore";

const categoryContext = createContext([]);
const userId = auth.currentUser.uid

const useCategory = () => {
  return useContext(categoryContext);
};

export { useCategory, categoryContext };

const CategoryProvider = ({ children }) => {
  const [DataCategory, setDataCategory] = useState([]);
  useEffect(() => {
  
      const unsub = onSnapshot(
        collection(db, "categories", userId, "category"),
        (snapShot) => {
          let list = [];
          snapShot.forEach((doc) => {
            list.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setDataCategory(list);
        },
        (error) => {
          console.log("ini error", error);
        }
      );
      return () => {
        unsub();
      };     
    
 
  }, []);

  return (
    <categoryContext.Provider value={[DataCategory, setDataCategory]}>
      {children}
    </categoryContext.Provider>
  );
};

export default CategoryProvider;
