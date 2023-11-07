import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "../components/CategoryCard";
import CategoryCard from "../components/CategoryCard";

const api = "http://localhost:3000";
const Learn = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${api}/types`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategories(data);
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
      <div style={{display:'flex'}}>
      {categoryList}
      </div>
    </div>
  );
};

export default Learn;
