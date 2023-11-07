import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import CircularProgressBar from "../components/CircularProgressBar";
import CommitGraph from "../components/CommitGraph";
import DifficultyAccuracyBarChart from "../components/DifficultyAccuracyBarChart";
const api = "http://localhost:3000";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState(null);
  const [testStats, setTestStats] = useState(null);
  const [totalSigns, setTotalSigns] = useState(null);
  const [learnStats, setLearnStats] = useState(null);
  useEffect(() => {
    async function fetchStats() {
      fetch(`${api}/stats/test/${user.username}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTestStats(data);
        });

      fetch(`${api}/stats/learn/${user.username}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLearnStats(data);
        });

      fetch(`${api}/types`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTotalSigns(data);
        });
    }

    if (user) {
      setUserDetails(user);
      fetchStats();
    }
  }, [user]);

  const getTotalCount = (type) => {
    if (!totalSigns) return 0;
    return totalSigns.find((sign) => sign.type === type).count;
  };

  const LearnStats = () => {
    if (!learnStats) return <div></div>;
    return (
      <div>
        <h2 style={{ color: "#212529" }}>Learning Stats</h2>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          {Object.keys(learnStats.typeCount).map((type) => (
            <CircularProgressBar
              key={type}
              label={type}
              percentage={Math.round(
                (learnStats.typeCount[type] / getTotalCount(type)) * 100
              )}
            />
          ))}
        </div>
      </div>
    );
  };

  const TestStats = () => {
    return (
      <div>
          <h2 style={{ color: "#212529" }}>Test Results</h2>
          <div style={{display:"flex",justifyContent:"space-evenly"}}>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <CommitGraph commitDates={testStats?.dates} />
            </div>
            {testStats &&  <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <DifficultyAccuracyBarChart data={testStats} />
            </div>}
          </div>
        </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "#212529" }}>Hello, {user.username}!</h1>
      <div>
        {LearnStats()}
        {TestStats()}
      </div>
    </div>
  );
};

export default Home;
