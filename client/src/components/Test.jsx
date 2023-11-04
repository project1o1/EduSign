import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const api = "http://localhost:3000"
function Test(props) {
    const [testData, setTestData] = useState([])

    useEffect(() => {
        fetch(api+"/signs/"+props.type)
            .then((res) => res.json())
            .then((data) => {
                setTestData(data)
                // console.log(data)
            });
    }
    , []);
    return (
    <div>
        
    </div>
  );
}
Test.propTypes = {
    type: PropTypes.string.isRequired,
    };


export default Test;