import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "../components/CategoryCard";
import CategoryCard from "../components/CategoryCard";
import LoadingScreen from "./Loading"; // Import the LoadingScreen component

const api = "http://localhost:3000";

const Learn = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    fetch(`${api}/types`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategories(data);
        setIsLoading(false); // Mark loading as complete
      });
  }, []);

  const categoryList = categories.map((category) => {
    return (
      <div key={uuid()} style={{ display: 'flex', flexDirection: 'row' }}>
        <CategoryCard category={category} />
      </div>
    );
  });

  return (
    <div>
      <h1>Learn</h1>
      <h2>Select a category</h2>
      {isLoading ? ( // Display loading screen while categories are being fetched
        <LoadingScreen />
      ) : (
        <div style={{ display: 'flex' }}>
          {categoryList}
        </div>
      )}
    </div>
  );
};

export default Learn;
