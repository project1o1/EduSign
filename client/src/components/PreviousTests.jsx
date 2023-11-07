import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import PreviousTestCard from "./PreviousTestCard";
import "../styles/Test.css";

function PreviousTests() {
  const [previousTests, setPreviousTests] = useState(null);
  const api = "http://localhost:3000";
  const { user } = useUser();

  useEffect(() => {
    axios
      .get(api + "/stats/test/" + user.username)
      .then((response) => {
        setPreviousTests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderPreviousTests = () => {
    return Object.keys(previousTests.dateStats)
      .slice(0, 5)
      .map((date) => (
        <PreviousTestCard
          date={date}
          previousTest={previousTests.dateStats[date]}
          key={uuidv4()}
        />
      ));
  };

  return (
    <div className="previous-tests-container">
      {previousTests && (
        <div className="previous-tests-list">{renderPreviousTests()}</div>
      )}
    </div>
  );
}

export default PreviousTests;
