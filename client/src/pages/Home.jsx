import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import CircularProgressBar from '../components/CircularProgressBar';
import CommitGraph from '../components/CommitGraph';

const api = 'http://localhost:3000';

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
  
  // totalSigns = [{"type":"Letter","image_url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1c6t_VgoGJaOLGnHQNGTfArk7-86u9tNnOA","count":26},{"type":"Word","image_url":"https://img.freepik.com/premium-vector/hello-bye-lettering_12196-1135.jpg","count":10}]

  const getTotalCount = (type) => {
    if (!totalSigns) return 0;
    return totalSigns.find((sign) => sign.type === type).count;
  }

  const LearnStats = () => {
    if (!learnStats) return <div></div>;
    return (
      <div>
        <h2>Learn Stats</h2>
        <div>
          {Object.keys(learnStats.typeCount).map((type) => (
            <div>
            <CircularProgressBar
              key={type}
              label={type}
              percentage={Math.round((learnStats.typeCount[type] / getTotalCount(type) ) * 100)}
            />
            </div>
          ))}
        </div>
      </div>    
    );
  }

  return (
    <div>
      <h1>Your Stats</h1>
      <div>
        {LearnStats()}
        <div>
          <h2>Test Stats</h2>
          <CommitGraph commitDates={testStats?.dates} />
        </div>
      </div>
    </div>
  );
};

export default Home;

