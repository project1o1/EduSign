import React from "react";

const CommitGraph = ({ commitDates }) => {
  if (!commitDates) return <div></div>;

  const renderGraph = () => {
    const currentDate = new Date();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
  
    const commitData = {};
    commitDates.forEach((date) => {
      const commitDate = new Date(date);
      if (
        commitDate.getMonth() === startDate.getMonth() &&
        commitDate.getFullYear() === startDate.getFullYear()
      ) {
        const day = commitDate.getDate();
        commitData[day] = (commitData[day] || 0) + 1;
      }
    });
  
    const rows = [];
    let row = [];
    let currentDay = 1;
  
    while (currentDay <= daysInMonth) {
      for (let i = 0; i < 7; i++) {
        if (currentDay <= daysInMonth) {
          const commitCount = commitData[currentDay] || 0;
          const cell = (
            <div
              key={currentDay}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: commitCount > 0 ? "#000000" : "#f5f5f5",
                boxShadow: commitCount > 0 ? "0 0 8px #000000" : "none",
                color: commitCount > 0 ? "#f5f5f5" : "#212529",
                fontSize: "0.8rem",
                margin: "4px",
              }}
            >
              {currentDay}
            </div>
          );
          row.push(cell);
          currentDay++;
        } else {
          break; // Break the loop once daysInMonth is reached
        }
      }
      rows.push(
        <div
          key={currentDay}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {row}
        </div>
      );
      row = [];
    }
  
    return rows;
  };
  

  const styles = {
    commitGraphContainer: {
      maxWidth: "500px",
      margin: "auto",
      marginBottom: "20px",
    },
    monthText: {
      textAlign: "center",
      fontSize: "1.8rem",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#212529",
    },
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = months[new Date().getMonth()];

  return (
    <div>
      <div style={styles.monthText}>{currentMonth}'s Activity</div>
      <div style={styles.commitGraphContainer}>{renderGraph()}</div>
    </div>
  );
};

export default CommitGraph;
