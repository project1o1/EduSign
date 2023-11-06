import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import CircularProgressBar from '../components/CircularProgressBar';

const api = 'http://localhost:3000';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState(null);
  const [stats, setStats] = useState(null);
  useEffect(() => {
    if (user) {
      setUserDetails(user);
      fetch(`${api}/stats/test/${user.username}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setStats(data);
        });
    }
  }, [user]);
  return (
    <div>
      <h1>Your Stats</h1>
      <div>
        
      </div>
    </div>
  );
};

export default Home;

