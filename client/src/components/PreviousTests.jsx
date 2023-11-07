import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import PreviousTestCard from "./PreviousTestCard";
import "../styles/Test.css";
import variables from "../config";
const api = variables.API_URL;
const previous_test_number = 3;
function PreviousTests() {
  const [previousTests, setPreviousTests] = useState(null);
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
      .slice(0, previous_test_number).reverse()
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
