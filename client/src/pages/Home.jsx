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
    }

    if (user) {
      setUserDetails(user);
      fetchStats(); 
    }
  }, [user]);
  
  return (
    <div>
      <h1>Your Stats</h1>
      <div>
        {/* <CommitGraph commitDates={stats?.dates} /> */}
      </div>
    </div>
  );
};

export default Home;

