import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Import the CSS file for styling
const Home = () => {
  const categories = ['Alphabets', 'Numbers', 'Common Phrases']; // Example categories
  const navigate = useNavigate();
  const handleCategorySelect = (category) => {
    // Redirect to the learn page with the selected category
    navigate(`/learn/${category}`);
    console.log('Selected category:', category);
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Sign Language Education Website</h1>
      <p>Enhance your communication with the power of sign language.</p>
      <p>Choose a category to get started:</p>
      <div className="category-container">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <button onClick={() => handleCategorySelect(category)}>{category}</button>
          </div>
        ))}
      </div>
      <p>Start your journey to learn and communicate through sign language today!</p>
    </div>
  );
};

export default Home;
