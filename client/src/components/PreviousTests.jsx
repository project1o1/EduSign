// import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import PreviousTestCard from "./PreviousTestCard";

function PreviousTests() {
  const [previousTests, setPreviousTests] = useState(null);
  const api = "http://localhost:3000";
  const { user } = useUser();

  useEffect(() => {
    axios
      .get(api + "/stats/test/" + user.username)
      .then((response) => {
        // console.log(response.data);
        setPreviousTests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // previousTests.dateStats => data : tests, accuracy, type
  const renderPreviousTests = () => {
    let ptc = [];
    Object.keys(previousTests.dateStats)
      .slice(0, 5)
      .map((date) => {
        ptc.push(
          <PreviousTestCard date={date} previousTest={previousTests.dateStats[date]} key={uuidv4()} />
        );
      });
    return ptc;
  };

  return (
    <div className="previous-tests">
      <h2>Previous Tests</h2>
      {previousTests && (
        <div className="previous-tests-list">{renderPreviousTests()}</div>
      )}
    </div>
  );
}

export default PreviousTests;
