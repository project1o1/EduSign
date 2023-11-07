import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import LoadingScreen from "./Loading"; // Import the LoadingScreen component
const api = "http://localhost:3000";

const LearnHome = () => {
  const { type } = useParams();
  const [words, setWords] = useState([]);
  const [completedStatus, setCompletedStatus] = useState({});
  const { user } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    fetch(`${api}/signs/${type}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWords(data);
        setIsLoading(false); // Mark loading as complete
      });
  }, [type]);

  useEffect(() => {
    const updateCompletedStatus = async () => {
      const statusMap = {};
      for (const word of words) {
        try {
          const response = await axios.get(`${api}/completed`, {
            params: {
              username: user.username,
              type: type,
              name: word.name,
            },
          });
          statusMap[word.name] = response.data.completed;
        } catch (error) {
          console.log(error);
          statusMap[word.name] = false;
        }
      }
      setCompletedStatus(statusMap);
    };
    updateCompletedStatus();
  }, [words, type, user]);

  const handleWordClick = (word) => {
    console.log("Selected word:", word);
    navigate(`/learn/${type}/${word.name}`);
  };

  const renderWordCards = () => {
    const cardStyle = {
      border: "1px solid #ced4da",
      borderRadius: "8px",
      padding: "10px",
      margin: "10px 0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      transition: "transform 0.3s",
    };

    const completedCardStyle = {
      ...cardStyle,
      backgroundColor: "#c3e6cb",
    };

    const cardHoverStyle = {
      transform: "scale(1.05)",
      cursor: "pointer",
    };

    return words.map((word) => (
      <div
        key={word.id}
        onClick={() => handleWordClick(word)}
        style={
          completedStatus[word.name]
            ? completedCardStyle
            : cardStyle
        }
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <p style={{ fontSize: "1.2rem" }}>{word.name}</p>
        {completedStatus[word.name] ? (
          <span style={{ fontSize: "1.2rem", color: "#155724" }}>
            &#10003;
          </span>
        ) : null}
      </div>
    ));
  };

  const calculateProgress = () => {
    const completedCount = Object.values(completedStatus).filter(
      (status) => status
    ).length;
    const totalCount = Object.values(completedStatus).length;
    return {
      completedCount,
      totalCount,
      percentage: (completedCount / totalCount) * 100,
    };
  };

  const renderProgressBar = () => {
    const { completedCount, totalCount, percentage } = calculateProgress();

    const progressContainerStyle = {
      marginTop: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    };

    const progressBarStyle = {
      width: "100%",
      height: "30px",
      backgroundColor: "#f5f5f5",
      borderRadius: "5px",
      overflow: "hidden",
    };

    const progressStyle = {
      height: "100%",
      width: `${percentage}%`,
      backgroundColor: "#4caf50",
      borderRadius: "5px",
    };

    const completionMessageStyle = {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: "10px",
      color: completedCount === totalCount ? "#155724" : "#495057",
    };

    return (
      <div style={progressContainerStyle}>
        <h2 style={{ color: "#212529", marginBottom: "10px" }}>Progress</h2>
        <div style={progressBarStyle}>
          <div style={progressStyle} />
        </div>
        <p style={{ marginTop: "10px", color: "#495057" }}>
          {completedCount} / {totalCount}
        </p>
        {completedCount === totalCount && (
          <div style={completionMessageStyle}>
            <span style={{ marginRight: "10px" }}>🎉</span>
            <span>
              Congratulations! You have mastered all the lessons in this
              category.
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ color: "#212529" }}>Learn</h1>
      <h2 style={{ color: "#212529" }}>{type}</h2>
      {isLoading ? ( // Display loading screen while words and completion statuses are being fetched
        <LoadingScreen />
      ) : (
        <>
          {renderProgressBar()}
          {renderWordCards()}
        </>
      )}
    </div>
  );
};

export default LearnHome;
