import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import CircularProgressBar from "../components/CircularProgressBar";
import CommitGraph from "../components/CommitGraph";
import DifficultyAccuracyBarChart from "../components/DifficultyAccuracyBarChart";
import LoadingScreen from "./Loading";
import variables from "../config";
const api = variables.API_URL;

const Home = () => {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState(null);
  const [testStats, setTestStats] = useState(null);
  const [totalSigns, setTotalSigns] = useState(null);
  const [learnStats, setLearnStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    async function fetchStats() {
      // Fetch user stats
      const testStatsResponse = fetch(`${api}/stats/test/${user.username}`);
      const learnStatsResponse = fetch(`${api}/stats/learn/${user.username}`);
      const totalSignsResponse = fetch(`${api}/types`);

      // Wait for all responses
      const [testStatsData, learnStatsData, totalSignsData] = await Promise.all([
        testStatsResponse.then((res) => res.json()),
        learnStatsResponse.then((res) => res.json()),
        totalSignsResponse.then((res) => res.json()),
      ]);

      // Set the fetched data and mark loading as complete
      setTestStats(testStatsData);
      setLearnStats(learnStatsData);
      setTotalSigns(totalSignsData);
      setIsLoading(false);
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
    if (!learnStats) return null;
    return (
      <div>
        <div style={{ display: "flex",flexDirection:"column", justifyContent: "flex-start",alignItems:"flex-start" }}>
        <h2 style={{ color: "#212529",marginBottom:0 }}>Learning Stats</h2>
        <p style={{padding:0,margin:"10px",cursor:"pointer",borderBottom:"1px solid",paddingLeft:"3px"}}
          onMouseDown={() => {
            window.location.href = "/learn";
          }
          }
        >Start Learning↗</p>
        </div>
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
    if (isLoading) return null;
    if (!testStats) return null;

    return (
      <div>
        <div style={{ display: "flex",flexDirection:"column", justifyContent: "flex-start",alignItems:"flex-start" }}>
          <h2 style={{ color: "#212529",marginBottom:"0px" }}>Test Results</h2>
          <p style={{padding:0,margin:"10px",cursor:"pointer",borderBottom:"1px solid",paddingLeft:"3px"}}
            onMouseDown={() => {
              window.location.href = "/test";
            }
            }
          >Take a Test↗</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <CommitGraph commitDates={testStats?.dates} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <DifficultyAccuracyBarChart data={testStats} />
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <LoadingScreen />; // Show loading screen while fetching data
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
